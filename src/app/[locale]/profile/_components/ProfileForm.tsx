'use client';

import { useEffect, useMemo } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import CustomImageUploader from '@/components/shared/customs/CustomImageUploader';
import CustomInput from '@/components/shared/customs/CustomInput';
import CustomSelect from '@/components/shared/customs/CustomSelect';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import NewPasswordSetting from './NewPasswordSetting';

import { useAuth } from '@/contexts/AuthContext';

import {
  useAreasByCity,
  useChurchesByArea,
  useCitiesByCountry,
  useCountries,
} from '@/hooks/addresses/useAddresses';

import type { Church } from '@/types';

import { useRouter } from '@/i18n/routing';
import { egyptPhonePattern } from '@/lib/regex';
import { getProfileApi, updateProfileApi } from '@/services/auth-api';
import { zodResolver } from '@hookform/resolvers/zod';

const ProfileForm = () => {
  const t = useTranslations('');
  const locale = useLocale();
  const { user, token } = useAuth();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(
      z.object({
        firstName: z
          .string({ required_error: t('forms.errors.firstName.required') })
          .min(2, { message: t('forms.errors.firstName.minLength') }),
        lastName: z
          .string({ required_error: t('forms.errors.lastName.required') })
          .min(2, { message: t('forms.errors.lastName.minLength') }),
        email: z
          .string({ required_error: t('forms.errors.email.required') })
          .email(t('forms.errors.email.format')),
        phone: z
          .string()
          .optional()
          .refine(
            (value) => {
              if (!value) return true; // Allow empty
              return egyptPhonePattern.test(value);
            },
            {
              message: t('forms.errors.phone.format'),
            },
          ),
        countryId: z.string().optional(),
        cityId: z.string().optional(),
        areaId: z.string().optional(),
        churchId: z.string().optional(),
        password: z.string().optional(),
        profilePicture: z.any().optional(),
      }),
    ),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      countryId: '',
      cityId: '',
      areaId: '',
      churchId: '',
      password: '',
      profilePicture: undefined,
    },
  });

  const { isSubmitting, errors } = form.formState;
  console.log('🚀 ~ ProfileForm ~ errors:', errors);

  // Fetch address data
  const { data: allCountriesData } = useCountries();
  const selectedCountryId = form.watch('countryId');
  const { data: citiesData } = useCitiesByCountry(selectedCountryId || null);
  const selectedCityId = form.watch('cityId');
  const { data: areasData } = useAreasByCity(selectedCityId || null);
  const selectedAreaId = form.watch('areaId');
  const { data: churchesByAreaData } = useChurchesByArea(
    selectedAreaId || null,
  );

  // Prepare options for selects
  const countryOptions = useMemo(
    () =>
      allCountriesData?.result?.map((country) => ({
        value: country.id,
        label: country.name,
      })) || [],
    [allCountriesData],
  );

  const cityOptions = useMemo(
    () =>
      citiesData?.result?.map((city) => ({
        value: city.id,
        label: city.name,
      })) || [],
    [citiesData],
  );

  const areaOptions = useMemo(
    () =>
      areasData?.result?.map((area) => ({
        value: area.id,
        label: area.name,
      })) || [],
    [areasData],
  );

  // Prepare options for church select - filter by selected area
  const churchOptions = useMemo(
    () =>
      churchesByAreaData?.result?.map((church: Church) => ({
        value: church.id,
        label: church.name,
      })) || [],
    [churchesByAreaData],
  );

  // Reset city, area, and church when country changes
  useEffect(() => {
    if (!selectedCountryId) {
      form.setValue('cityId', '');
      form.setValue('areaId', '');
      form.setValue('churchId', '');
    }
  }, [selectedCountryId, form]);

  // Reset area and church when city changes
  useEffect(() => {
    if (!selectedCityId) {
      form.setValue('areaId', '');
      form.setValue('churchId', '');
    }
  }, [selectedCityId, form]);

  // Reset church when area changes
  useEffect(() => {
    if (!selectedAreaId) {
      form.setValue('churchId', '');
    }
  }, [selectedAreaId, form]);

  // Load user data into form
  useEffect(() => {
    if (user) {
      // If user has full name, split it into first and last name
      let firstName = '';
      let lastName = '';

      if (user.fullName) {
        const nameParts = user.fullName.trim().split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts.slice(1).join(' ') || '';
      }

      form.reset({
        firstName,
        lastName,
        email: user.email || '',
        phone: user.phoneNumber || '',
        countryId: '',
        cityId: '',
        areaId: '',
        churchId: '',
        password: '',
      });

      // Load detailed profile data if available
      const loadProfileData = async () => {
        if (token) {
          try {
            const profileData = await getProfileApi(token);
            form.reset({
              firstName: profileData.firstName || firstName,
              lastName: profileData.lastName || lastName,
              email: profileData.email || user.email || '',
              phone: profileData.phoneNumber || user.phoneNumber || '',
              countryId: profileData.countryId || '',
              cityId: profileData.cityId || '',
              areaId: profileData.areaId || '',
              churchId: profileData.churchId || '',
              password: '',
            });
          } catch (error) {
            console.error('Failed to load profile data:', error);
            // Use basic user data if profile fetch fails
          }
        }
      };

      loadProfileData();
    }
  }, [user, token, form]);

  async function onSubmit(values: any) {
    try {
      // Format phone number - remove all non-digit characters
      const phoneNumber = values.phone ? values.phone.replace(/\D/g, '') : '';

      const updateData: any = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: phoneNumber,
      };

      // Add optional fields
      if (values.countryId) {
        updateData.countryId = values.countryId;
      }
      if (values.cityId) {
        updateData.cityId = values.cityId;
      }
      if (values.areaId) {
        updateData.areaId = values.areaId;
      }
      if (values.churchId) {
        updateData.churchId = values.churchId;
      }

      // Add profile picture if a new file was selected
      if (values.profilePicture instanceof File) {
        updateData.profilePictureUrl = values.profilePicture;
      }

      if (!token) {
        toast.error(
          t('forms.errors.auth.required') || 'Authentication token not found',
        );
        return;
      }

      const res = await updateProfileApi(updateData, token, locale);
      if (res.isError) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(
        error instanceof Error
          ? error.message
          : t('forms.errors.general') ||
              'An error occurred while updating profile',
      );
    }
  }

  const handleCancel = () => {
    router.push('/');
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((name) => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className='flex flex-col gap-8 lg:flex-row'>
      {/* Profile Picture Section */}
      {/* Form Section */}
      <div className='flex-1'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6'
          >
            <div className='grid gap-6 md:grid-cols-3'>
              {/* Form fields - 2 columns */}
              <div className='col-span-2 space-y-6'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <CustomInput
                    fieldName='firstName'
                    placeholder={t('forms.placeholders.firstName')}
                    type='text'
                    label={t('forms.labels.firstName')}
                  />

                  <CustomInput
                    fieldName='lastName'
                    placeholder={t('forms.placeholders.lastName')}
                    type='text'
                    label={t('forms.labels.lastName')}
                  />
                </div>

                <CustomInput
                  fieldName='email'
                  placeholder={t('forms.placeholders.email')}
                  type='email'
                  label={t('forms.labels.email')}
                  disabled
                />

                <CustomInput
                  fieldName='phone'
                  placeholder={t('forms.placeholders.phone')}
                  type='tel'
                  label={t('forms.labels.phone')}
                />

                <div className='grid gap-4 md:grid-cols-3'>
                  <CustomSelect
                    fieldName='countryId'
                    placeholder={
                      t('forms.placeholders.country') || 'Country (Optional)'
                    }
                    options={countryOptions}
                    label={t('forms.labels.country')}
                  />

                  <CustomSelect
                    fieldName='cityId'
                    placeholder={
                      t('forms.placeholders.city') || 'City (Optional)'
                    }
                    options={cityOptions}
                    label={t('forms.labels.city')}
                    disabled={!selectedCountryId}
                  />

                  <CustomSelect
                    fieldName='areaId'
                    placeholder={
                      t('forms.placeholders.area') || 'Area (Optional)'
                    }
                    options={areaOptions}
                    label={t('forms.labels.area')}
                    disabled={!selectedCityId}
                  />
                </div>

                <CustomSelect
                  fieldName='churchId'
                  placeholder={
                    t('forms.placeholders.church') || 'Church (Optional)'
                  }
                  options={churchOptions}
                  label={t('forms.labels.church')}
                  disabled={!selectedAreaId}
                />

                <CustomInput
                  fieldName=''
                  label={t('forms.labels.password')}
                  placeholder='**********'
                  disabled
                  className='border-secondary-200 text-primary-500 rtl:pr-4'
                  trailing={
                    <NewPasswordSetting
                      trigger={
                        <Button
                          variant='link'
                          className='text-sm'
                          type='button'
                        >
                          {t('buttonsLabels.updatePassword')}
                        </Button>
                      }
                    />
                  }
                />
              </div>
              {/* Image column - 1 column */}
              <div className='col-span-1 flex items-start justify-end'>
                <CustomImageUploader
                  fieldName='profilePicture'
                  label={t('forms.labels.profilePicture') || 'Profile Picture'}
                  defaultImageUrl={user?.profilePictureUrl || undefined}
                  getInitials={getInitials}
                />
              </div>
            </div>
            {/* Action Buttons */}
            <div className='flex gap-4 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={handleCancel}
                className='flex-1'
              >
                {t('forms.buttonsLabels.homePage') || 'Home Page'}
              </Button>
              <Button
                type='submit'
                variant='default'
                disabled={isSubmitting}
                className='flex-1 bg-primary-600 hover:bg-primary-700'
              >
                {isSubmitting ? (
                  <Spinner />
                ) : (
                  t('forms.buttonsLabels.save') || 'Save'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>{' '}
    </div>
  );
};

export default ProfileForm;
