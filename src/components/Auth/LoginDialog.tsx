'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import CustomEmail from '../shared/customs/CustomEmail';
import PasswordInput from '../shared/customs/PasswordInput';
import Icon from '../shared/Icon';
import { Form } from '../ui/form';

import { useAuth } from '@/contexts/AuthContext';

import Logo from '@/../public/Logo.svg';
import { useRouter } from '@/i18n/routing';
import { passwordPattern } from '@/lib/regex';
import { loginApi } from '@/services/auth-api';
import { zodResolver } from '@hookform/resolvers/zod';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginDialog({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const locale = useLocale();
  const t = useTranslations('login');
  const isArabic = locale === 'ar';
  const router = useRouter();
  const { login } = useAuth();

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, { message: t('errors.email.required') })
      .email(t('errors.email.format')),
    password: z
      .string()
      .min(8, { message: t('errors.password.required') })
      .regex(passwordPattern, t('errors.password.format')),
  });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Submit handler
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const userData = await loginApi({
        email: data.email,
        password: data.password,
      });

      // Store user data and update auth state
      await login(userData);

      toast.success(t('toasts.success'));
      setOpen(false);
      form.reset();

      // Redirect to home or callback URL if needed
      router.push(`/${locale}`);
    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error(error.message || t('toasts.invalidCredentials'));
      form.setError('root', {
        message:
          error.message ||
          (isArabic
            ? 'فشل تسجيل الدخول. حاول مرة أخرى.'
            : 'Login failed. Please try again.'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Social login handlers
  const handleSocialLogin = (provider: 'apple' | 'google' | 'facebook') => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <Button
            variant='secondary'
            className={className}
          >
            {isArabic ? 'تسجيل الدخول' : 'Login'}
          </Button>
        </DialogTrigger>

        <DialogContent className='w-[760px] max-w-2xl rounded-2xl p-8'>
          <div className='mx-auto w-full max-w-[426px]'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='mb-2 space-y-8'>
                  <DialogHeader className='mb-4'>
                    <Image
                      src={Logo}
                      alt='Reads Coptic Logo'
                      priority
                      width={100}
                      height={80}
                    />
                    <DialogTitle className='text-2xl font-semibold'>
                      {isArabic ? 'تسجيل الدخول' : 'Login'}
                    </DialogTitle>
                    <p className='mt-2 text-sm text-muted-foreground'>
                      {isArabic
                        ? 'تسجيل الدخول للوصول إلى حسابك'
                        : 'Login to access your account'}
                    </p>
                  </DialogHeader>

                  <CustomEmail
                    fieldName='email'
                    placeholder={isArabic ? 'البريد الإلكتروني' : 'Email'}
                    type='email'
                    label={isArabic ? 'البريد الإلكتروني' : 'Email'}
                    disabled={isLoading}
                  />

                  <PasswordInput
                    form={form}
                    fieldName='password'
                    placeholder={isArabic ? 'كلمة المرور' : 'Password'}
                    label={isArabic ? 'كلمة المرور' : 'Password'}
                    disabled={isLoading}
                  />
                </div>

                <div className='mb-10 flex items-center justify-between'>
                  <a
                    href={`/${locale}/forgot-password`}
                    className='text-ls-primary-500 hover:text-ls-primary-100 text-sm underline'
                  >
                    {isArabic ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                  </a>
                </div>

                <Button
                  className='h-12 w-full text-sm leading-5 xs:p-[17px]'
                  type='submit'
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner />
                  ) : isArabic ? (
                    'تسجيل الدخول'
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
            </Form>
            <div className='mt-6 flex items-center gap-3'>
              <div className='h-px flex-1 bg-muted' />
              <span className='text-xs text-muted-foreground'>
                {isArabic ? 'أو تسجيل الدخول باستخدام' : 'Or sign in with'}
              </span>
              <div className='h-px flex-1 bg-muted' />
            </div>
            <div className='mt-4 grid grid-cols-3 gap-3'>
              <Button
                variant='outline'
                className='flex items-center justify-center gap-2'
                onClick={() => handleSocialLogin('apple')}
                type='button'
                disabled={isLoading}
              >
                <Icon name='apple' />
              </Button>
              <Button
                variant='outline'
                className='flex items-center justify-center gap-2'
                onClick={() => handleSocialLogin('google')}
                type='button'
                disabled={isLoading}
              >
                <Icon name='google' />
              </Button>
              <Button
                variant='outline'
                className='flex items-center justify-center gap-2'
                onClick={() => handleSocialLogin('facebook')}
                type='button'
                disabled={isLoading}
              >
                <Icon name='blueFacebook' />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
