'use client';

import { useEffect, useMemo } from 'react';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { toast } from 'sonner';
import { z } from 'zod';

import CustomInput from '@/components/shared/customs/CustomInput';
import CustomPhoneInput from '@/components/shared/customs/CustomPhoneInput';
import CustomSelect from '@/components/shared/customs/CustomSelect';
import Icon from '@/components/shared/Icon';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import {
  useAreasByCity,
  useChurchesByArea,
  useCitiesByCountry,
  useCountries,
} from '@/hooks/addresses/useAddresses';

import { Link } from '@/i18n/routing';
import { passwordPattern } from '@/lib/regex';
import { cn } from '@/lib/utils';
import { registerApi } from '@/services/auth-api';
import { zodResolver } from '@hookform/resolvers/zod';

const SignUpForm = () => {
  const t = useTranslations('');
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const router = useRouter();

  // Fetch countries, cities, areas, and churches
  const { data: countriesData } = useCountries();

  const form = useForm({
    resolver: zodResolver(
      z
        .object({
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
            .string({ required_error: t('forms.errors.phone.required') })
            .refine(isValidPhoneNumber, {
              message: t('forms.errors.phone.format'),
            }),
          password: z
            .string({ required_error: t('forms.errors.password.required') })
            .min(8, { message: t('forms.errors.password.required') })
            .regex(passwordPattern, t('forms.errors.password.format')),
          confirmPassword: z
            .string({
              required_error: t('forms.errors.confirmPassword.required'),
            })
            .min(1, { message: t('forms.errors.confirmPassword.required') }),
          countryId: z.string().optional(),
          cityId: z.string().optional(),
          areaId: z.string().optional(),
          churchId: z.string().optional(),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: t('forms.errors.confirmPassword.match'),
          path: ['confirmPassword'],
        }),
    ),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      countryId: '',
      cityId: '',
      areaId: '',
      churchId: '',
    },
  });

  const { isSubmitting } = form.formState;
  const selectedCountryId = form.watch('countryId');
  const selectedCityId = form.watch('cityId');
  const selectedAreaId = form.watch('areaId');
  const { data: citiesData } = useCitiesByCountry(selectedCountryId || null);
  const { data: areasData } = useAreasByCity(selectedCityId || null);
  const { data: churchesData } = useChurchesByArea(selectedAreaId || null);

  // Reset city, area, and church when country changes
  useEffect(() => {
    if (!selectedCountryId) {
      form.setValue('cityId', '');
      form.setValue('areaId', '');
      form.setValue('churchId', '');
    } else {
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
    } else {
      form.setValue('areaId', '');
      form.setValue('churchId', '');
    }
  }, [selectedCityId, form]);

  // Reset church when area changes
  useEffect(() => {
    form.setValue('churchId', '');
  }, [selectedAreaId, form]);

  // Social login handlers
  const handleSocialLogin = (provider: 'google') => {
    console.log(`Logging in with ${provider}`);

    if (provider === 'google') {
      // Redirect to backend Google login endpoint
      // Note: NEXT_PUBLIC_API_URL should be the full backend URL, e.g., "https://youssefyousry-001-site1.qtempurl.com/api"
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ||
        'https://youssefyousry-001-site1.qtempurl.com/api';
      const redirectUrl = `${apiUrl}/ExternalAuth/google/login`;
      window.location.href = redirectUrl;
    } else {
      // TODO: Implement Apple and Facebook login
      console.log(`${provider} login not implemented yet`);
    }
  };

  // Prepare options for selects
  const countryOptions = useMemo(
    () =>
      countriesData?.result?.map((country) => ({
        value: country.id,
        label: country.name,
      })) || [],
    [countriesData],
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

  const churchOptions = useMemo(
    () =>
      churchesData?.result?.map((church) => ({
        value: church.id,
        label: church.name,
      })) || [],
    [churchesData],
  );

  async function onSubmit(values: any) {
    try {
      // Format phone number - remove all non-digit characters
      const phoneNumber = values.phone ? values.phone.replace(/\D/g, '') : '';

      const registerData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: phoneNumber,
        password: values.password,
        ...(values.countryId && { countryId: values.countryId }),
        ...(values.cityId && { cityId: values.cityId }),
        ...(values.areaId && { areaId: values.areaId }),
        ...(values.churchId && { churchId: values.churchId }),
      };

      await registerApi(registerData);

      toast.success(t('forms.toasts.signUpSuccess'));

      // Redirect to OTP verification page for registration
      router.push(
        `/${locale}/otp?email=${encodeURIComponent(values.email)}&type=register`,
      );
    } catch (error: any) {
      toast.error(error.message || t('forms.toasts.somethingWentWrong'));
    }
  }

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            'mx-auto mb-8 mt-14 space-y-3 max-md:mx-auto md:max-w-xl md:space-y-7',
          )}
        >
          <h3 className='font-bold text-neutral-800 md:text-lg xl:text-xl'>
            {t('pages.signUp.personalInformation')}
          </h3>

          <div className='grid gap-3 md:grid-cols-2'>
            <CustomInput
              fieldName='firstName'
              placeholder={t('forms.placeholders.firstName')}
            />

            <CustomInput
              fieldName='lastName'
              placeholder={t('forms.placeholders.lastName')}
            />
          </div>

          <div className='grid gap-3 md:grid-cols-2'>
            <CustomInput
              fieldName='email'
              placeholder={t('forms.placeholders.email')}
            />

            <CustomPhoneInput
              fieldName='phone'
              placeholder={t('forms.placeholders.phone')}
            />
          </div>

          <CustomInput
            fieldName='password'
            type='password'
            placeholder={t('forms.placeholders.password')}
          />

          <CustomInput
            fieldName='confirmPassword'
            type='password'
            placeholder={t('forms.placeholders.confirmPassword')}
          />

          <div className='grid gap-3 md:grid-cols-2'>
            <CustomSelect
              fieldName='countryId'
              placeholder={
                t('forms.placeholders.country') || 'Country (Optional)'
              }
              options={countryOptions}
            />

            <CustomSelect
              fieldName='cityId'
              placeholder={t('forms.placeholders.city') || 'City (Optional)'}
              options={cityOptions}
              disabled={!selectedCountryId || cityOptions.length === 0}
            />
          </div>
          <div className='grid gap-3 md:grid-cols-2'>
            <CustomSelect
              fieldName='areaId'
              placeholder={t('forms.placeholders.area') || 'Area (Optional)'}
              options={areaOptions}
              disabled={!selectedCityId || areaOptions.length === 0}
            />

            <CustomSelect
              fieldName='churchId'
              placeholder={
                t('forms.placeholders.church') || 'Church (Optional)'
              }
              options={churchOptions}
              disabled={!selectedAreaId || churchOptions.length === 0}
            />
          </div>

          <Button
            variant='default'
            disabled={isSubmitting}
            className='w-full rounded-lg px-4 py-2 text-center capitalize max-sm:text-sm xl:text-lg'
          >
            {isSubmitting ? <Spinner /> : t('forms.buttonsLabels.signUp')}
          </Button>

          {/* <SocialMediaLogin/> */}

          <div className='text-center max-sm:text-sm'>
            <span className='font-medium text-neutral-500'>
              {t('pages.signUp.alreadyHaveAccount')}{' '}
            </span>{' '}
            <Link
              href='/sign-in'
              className='font-bold text-primary-600'
            >
              {t('pages.signUp.loginToAccount')}
            </Link>
          </div>
        </form>
      </Form>
      <div className='flex items-center justify-center gap-3'>
        <div className='h-px flex-1 bg-muted' />
        <span className='text-xs text-muted-foreground'>
          {isArabic ? 'أو التسجيل باستخدام' : 'Or sign up with'}
        </span>
        <div className='h-px flex-1 bg-muted' />
      </div>
      <div className='mb-10 mt-4 flex items-center justify-center gap-3'>
        <Button
          variant='outline'
          className='flex w-full max-w-[300px] items-center justify-center gap-2'
          onClick={() => handleSocialLogin('google')}
          type='button'
        >
          <Icon name='google' />
        </Button>
      </div>
    </section>
  );
};

export default SignUpForm;
