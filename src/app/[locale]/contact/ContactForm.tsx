'use client';

import { useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { toast } from 'sonner';
import { z } from 'zod';

import CustomInput from '@/components/shared/customs/CustomInput';
import CustomPhoneInput from '@/components/shared/customs/CustomPhoneInput';
import CustomTextarea from '@/components/shared/customs/CustomTextarea';
import Icon from '@/components/shared/Icon';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import ThankYouDialog from './ThankYouDialog';

import { postData } from '@/utils/api';

import { zodResolver } from '@hookform/resolvers/zod';

function ContactForm() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  const [fullName, setFullName] = useState('');
  const formSchema = z.object({
    name: z
      .string({ required_error: t('forms.errors.fullName') })
      .min(1, { message: t('forms.errors.fullName') }),
    churchName: z
      .string({ required_error: t('forms.errors.jobTitle') })
      .min(1, { message: t('forms.errors.jobTitle') }),
    email: z
      .string({ required_error: t('forms.errors.email') })
      .min(1, { message: t('forms.errors.email') })
      .email({ message: t('forms.errors.email') }),
    phoneNumber: z
      .string({ required_error: t('forms.errors.phoneNumber') })
      .refine(isValidPhoneNumber, { message: t('forms.errors.phoneNumber') }),

    message: z
      .string({ required_error: t('forms.errors.message') })
      .min(1, { message: t('forms.errors.message') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      churchName: '',
      email: '',
      phoneNumber: '',

      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await postData('ContactUs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, targetWebsite: 1 }),
      });

      setOpen(true);
      setFullName(values.name);
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error(t('forms.toasts.somethingWentWrong'));
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mx-auto max-w-[846px] rounded-3xl bg-[#FBF6F1] px-6 py-4 md:px-12 md:py-7 lg:px-24 lg:py-14'
        >
          <h3 className='mb-6 text-center text-xl font-bold text-primary-500 sm:text-2xl lg:text-3xl'>
            {t('contactPage.form.title')}
          </h3>
          <div className='w-full space-y-4 px-1 py-1'>
            <CustomInput
              fieldName='name'
              placeholder={t('forms.placeholders.fullName')}
            />

            <CustomInput
              fieldName='churchName'
              placeholder={t('forms.placeholders.jobTitle')}
            />

            <CustomInput
              fieldName='email'
              placeholder={t('forms.placeholders.email')}
            />

            <CustomPhoneInput
              fieldName='phoneNumber'
              placeholder={t('forms.placeholders.phoneNumber')}
            />

            <CustomTextarea
              fieldName='message'
              placeholder={t('forms.placeholders.message')}
            />

            <div className='flex items-center justify-center'>
              <Button
                type='submit'
                variant='secondary'
                className='mx-auto mt-6 w-[230px] max-w-[230px] xs:col-span-2 lg:mx-0'
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Spinner />
                ) : (
                  <>
                    {t('forms.buttonsLabels.sendMessage')}
                    <Icon
                      name='send'
                      className='rtl:-rotate-90'
                    />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <ThankYouDialog
        open={open}
        setOpen={setOpen}
        name={fullName}
        locale={locale}
      />
    </>
  );
}

export default ContactForm;
