'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import CustomEmail from '@/components/shared/customs/CustomEmail';
import PasswordInput from '@/components/shared/customs/PasswordInput';
import Icon from '@/components/shared/Icon';
import Spinner from '@/components/shared/loaders/Spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { useAuth } from '@/contexts/AuthContext';

import Logo from '@/../public/Logo.svg';
import { Link } from '@/i18n/routing';
import { passwordPattern } from '@/lib/regex';
import { cn } from '@/lib/utils';
import { loginApi } from '@/services/auth-api';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginForm = () => {
  const t = useTranslations('login');
  const locale = useLocale();
  const isArabic = locale === 'ar';
  const { login } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const formSchema = z.object({
    email: z
      .string({ required_error: t('errors.email.required') })
      .email(t('errors.email.format')),

    password: z
      .string({ required_error: t('errors.password.required') })
      .regex(passwordPattern, t('errors.password.format')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = form.formState;

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userData = await loginApi({
        email: values.email,
        password: values.password,
      });

      // Store user data and update auth state
      await login(userData);

      toast.success(t('toasts.success'));
      form.reset();
      router.push(callbackUrl || `/${locale}`);
    } catch (error: any) {
      toast.error(error.message || t('toasts.invalidCredentials'));
    }
  }

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('mx-auto mb-4 mt-14 max-w-xl space-y-7')}
        >
          <div className='mb-2 space-y-8'>
            <Image
              src={Logo}
              alt={t('logoAlt')}
              priority
              width={100}
              height={80}
            />

            <h1 className='text-xl font-bold'>{t('title')}</h1>

            <p className='text-sm text-muted-foreground'>{t('description')}</p>

            <CustomEmail
              fieldName='email'
              placeholder={t('fields.email.placeholder')}
              label={t('fields.email.label')}
              disabled={isSubmitting}
            />

            <PasswordInput
              form={form}
              fieldName='password'
              placeholder={t('fields.password.placeholder')}
              label={t('fields.password.label')}
              disabled={isSubmitting}
            />
          </div>

          <p className='text-center max-sm:text-sm'>
            <span className='font-medium text-neutral-500'>
              {t('forgotPassword.text')}
            </span>{' '}
            <Link
              href='/forget-password'
              className='font-bold text-primary-600'
            >
              {t('forgotPassword.link')}
            </Link>
          </p>

          <Button className='w-full rounded-lg px-4 py-2'>
            {isSubmitting ? <Spinner /> : t('buttons.signIn')}
          </Button>

          <p className='text-center max-sm:text-sm'>
            <span className='font-medium text-neutral-500'>
              {t('noAccount.text')}
            </span>{' '}
            <Link
              href={`/sign-up${callbackUrl ? `?callbackUrl=${callbackUrl}` : ''}`}
              className='font-bold text-primary-600'
            >
              {t('noAccount.link')}
            </Link>
          </p>
        </form>
      </Form>
      <div className='flex items-center justify-center gap-3'>
        <div className='h-px flex-1 bg-muted' />
        <span className='text-xs text-muted-foreground'>
          {isArabic ? 'أو تسجيل الدخول باستخدام' : 'Or sign in with'}
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

export default LoginForm;
