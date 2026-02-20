'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import PasswordInput from '@/components/shared/customs/PasswordInput';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { passwordPattern } from '@/lib/regex';
import { cn } from '@/lib/utils';
import { changePasswordApi } from '@/services/auth-api';
import { zodResolver } from '@hookform/resolvers/zod';

const ChangePasswordForm = () => {
  const t = useTranslations('');
  const locale = useLocale();
  const router = useRouter();

  const formSchema = z
    .object({
      currentPassword: z
        .string({ required_error: t('forms.errors.password.required') })
        .min(1, t('forms.errors.password.required')),
      newPassword: z
        .string({ required_error: t('forms.errors.password.required') })
        .regex(passwordPattern, t('forms.errors.password.format')),
      confirmPassword: z.string({
        required_error: t('forms.errors.confirmPassword.required'),
      }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('forms.errors.confirmPassword.match'),
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { currentPassword, newPassword } = values;

      // Get token from localStorage
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('auth_token') || ''
          : '';

      if (!token) {
        toast.error(t('forms.errors.authenticationRequired'));
        router.push(`/${locale}/sign-in`);
        return;
      }

      const res = await changePasswordApi(
        {
          currentPassword,
          newPassword,
        },
        token,
      );

      if (res.isError) {
        throw new Error(res.message);
      }
      form.reset();
      toast.success(t('forms.toasts.changePasswordSuccess'));
      // Optionally redirect or stay on page
      // router.push(`/${locale}/profile`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(t('forms.toasts.somethingWentWrong'));
      }
    }
  }

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            'container mx-auto mb-32 mt-14 space-y-7 max-md:mx-auto md:max-w-xl',
          )}
        >
          <h3 className='font-bold text-neutral-800 md:text-lg xl:text-xl'>
            {t('pages.changePassword.title') || 'Change Password'}
          </h3>
          <PasswordInput
            form={form}
            fieldName='currentPassword'
            label={t('forms.labels.currentPassword') || 'Current Password'}
            placeholder={
              t('forms.placeholders.currentPassword') ||
              'Enter current password'
            }
          />
          <PasswordInput
            form={form}
            fieldName='newPassword'
            label={t('forms.labels.newPassword') || 'New Password'}
            placeholder={
              t('forms.placeholders.newPassword') || 'Enter new password'
            }
          />
          <PasswordInput
            form={form}
            fieldName='confirmPassword'
            label={t('forms.labels.confirmPassword') || 'Confirm Password'}
            placeholder={
              t('forms.placeholders.confirmPassword') || 'Confirm new password'
            }
          />

          <Button className='!mt-8 w-full rounded-lg px-4 py-2 text-center capitalize max-sm:text-sm xl:text-lg'>
            {isSubmitting ? (
              <Spinner />
            ) : (
              t('forms.buttonsLabels.changePassword') || 'Change Password'
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ChangePasswordForm;
