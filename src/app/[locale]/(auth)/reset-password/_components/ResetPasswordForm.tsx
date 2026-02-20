'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import CustomInput from '@/components/shared/customs/CustomInput';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { passwordPattern } from '@/lib/regex';
import { cn } from '@/lib/utils';
import { resetPasswordApi } from '@/services/auth-api';
import { zodResolver } from '@hookform/resolvers/zod';

const ResetPasswordForm = () => {
  const t = useTranslations('');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const otp = searchParams.get('otp');

  const formSchema = z
    .object({
      password: z
        .string({ required_error: t('forms.errors.password.required') })
        .regex(passwordPattern, t('forms.errors.password.format')),
      confirmPassword: z.string({
        required_error: t('forms.errors.confirmPassword.required'),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('forms.errors.confirmPassword.match'),
      path: ['confirmPassword'],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { password } = values;

      if (!email || !otp) {
        toast.error(t('forms.errors.emailOrOtpMissing'));
        return;
      }

      // Get token from localStorage if available (optional)
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('auth_token') || ''
          : '';

      const res = await resetPasswordApi(
        {
          email,
          otp,
          newPassword: password,
        },
        token,
      );

      if (res.isError) {
        throw new Error(res.message);
      }
      form.reset();
      toast.success(t('forms.toasts.resetPasswordSuccess'));
      router.push(`/${locale}/sign-in`);
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
            {t('pages.resetPassword.enterNewPassword')}
          </h3>
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

          <Button className='!mt-8 w-full rounded-lg px-4 py-2 text-center max-sm:text-sm xl:text-lg'>
            {isSubmitting ? <Spinner /> : t('forms.buttonsLabels.savePassword')}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ResetPasswordForm;
