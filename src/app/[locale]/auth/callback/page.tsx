'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

import { toast } from 'sonner';

import Spinner from '@/components/shared/loaders/Spinner';

import { useAuth } from '@/contexts/AuthContext';

import type { LoginResponse } from '@/types';

const CallbackPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations('login');
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        const callbackUrl = searchParams.get('callbackUrl');

        if (!accessToken || !refreshToken) {
          console.error('Missing tokens in callback');
          toast.error(
            t('toasts.invalidCredentials') || 'Authentication failed',
          );
          router.push(`/${locale}/sign-in`);
          return;
        }

        // Decode JWT to extract basic user info (payload is base64 encoded)
        const payload = JSON.parse(atob(accessToken.split('.')[1]));

        // Create LoginResponse object with tokens and basic user info from JWT
        const loginResponse: LoginResponse = {
          id: payload.uid || payload.sub || '',
          message: 'Google login successful',
          isAuthenticated: true,
          fullName: payload.email?.split('@')[0] || '', // Fallback: use email prefix
          username: payload.email?.split('@')[0] || '',
          email: payload.email || '',
          phoneNumber: '',
          token: accessToken,
          expiresOn: new Date(payload.exp * 1000).toISOString(),
          accountType: parseInt(payload.accountType) || 2,
          refreshToken: refreshToken,
          imageUrl: null,
          refreshTokenExpiration: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000,
          ).toISOString(), // 7 days
          role: payload.role || '',
        };

        // Call login to save tokens in cookies and fetch profile
        await login(loginResponse);

        toast.success(t('toasts.success') || 'Login successful');

        // Redirect to callback URL or home
        const redirectUrl = callbackUrl || `/${locale}`;
        router.push(redirectUrl);
      } catch (error) {
        console.error('Google OAuth callback error:', error);
        toast.error(
          error instanceof Error ? error.message : 'Authentication failed',
        );
        router.push(`/${locale}/sign-in`);
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router, locale, login, t]);

  if (isLoading) {
    return (
      <div className='flex min-h-[60vh] items-center justify-center'>
        <div className='text-center'>
          <Spinner />
          <p className='mt-4 text-muted-foreground'>
            {locale === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing you in...'}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default CallbackPage;
