'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import ResendOtp from './ResendOtp';

import { useAuth } from '@/contexts/AuthContext';

import { cn } from '@/lib/utils';
import { validateResetOtpApi, verifyOtpApi } from '@/services/auth-api';
import { zodResolver } from '@hookform/resolvers/zod';

const OtpForm = () => {
  const t = useTranslations('');
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const email = searchParams.get('email');
  const type = searchParams.get('type'); // 'register' or 'reset-password'

  const FormSchema = z.object({
    otp: z.string().min(5, {
      message: t('forms.errors.otp'),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!email) {
      toast.error(t('forms.errors.emailRequired'));
      return;
    }

    try {
      const { otp } = data;

      if (type === 'reset-password') {
        // Validate password reset OTP
        await validateResetOtpApi({
          email,
          otp,
        });

        toast.success(t('forms.toasts.verifySuccess'));

        // Redirect to reset password page
        router.push(
          `/${locale}/reset-password?email=${encodeURIComponent(email)}&otp=${otp}`,
        );
        return;
      }

      // Handle registration OTP verification
      const userData = await verifyOtpApi({
        email,
        otp,
      });

      // Store user data and update auth state
      await login(userData);

      toast.success(t('forms.toasts.verifySuccess'));

      // Redirect to home or callback URL
      const callbackUrl = searchParams.get('callbackUrl');
      router.push(callbackUrl || `/${locale}`);
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
            'container mx-auto mb-32 mt-14 space-y-4 max-md:mx-auto md:max-w-xl',
          )}
          dir='ltr'
        >
          <p className='text-center font-bold text-neutral-800'>
            {t('pages.otp.desc')}
          </p>
          <FormField
            control={form.control}
            name='otp'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={5}
                    {...field}
                  >
                    <InputOTPGroup className='mx-auto flex items-center justify-center gap-3'>
                      {[...Array(5)].map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className='h-14 w-14 rounded-md border text-center text-2xl font-bold text-primary-500'
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className='text-center' />
              </FormItem>
            )}
          />
          <ResendOtp />
          <Button className='!mt-8 w-full rounded-lg px-4 py-2 text-center capitalize max-sm:text-sm xl:text-lg'>
            {isSubmitting ? <Spinner /> : t('forms.buttonsLabels.send')}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default OtpForm;
