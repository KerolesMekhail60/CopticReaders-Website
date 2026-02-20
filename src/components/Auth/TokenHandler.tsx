'use client';

import { Suspense, useEffect, useRef } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

import { toast } from 'sonner';

import { useAuth } from '@/contexts/AuthContext';

import type { LoginResponse } from '@/types';

/**
 * TokenHandler component to intercept OAuth2 tokens from URL query parameters
 * and save them to cookies via AuthContext login function.
 *
 * This component should be rendered in the root layout or page to handle
 * token callbacks from social login providers like Google.
 */
function TokenHandlerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const { login } = useAuth();
  const isProcessingRef = useRef(false);

  useEffect(() => {
    // Prevent multiple processing calls
    if (isProcessingRef.current) {
      return;
    }

    const handleTokens = async () => {
      const accessToken = searchParams.get('accessToken');
      const refreshToken = searchParams.get('refreshToken');
      const callbackUrl = searchParams.get('callbackUrl');

      // Only process if both tokens are present
      if (!accessToken || !refreshToken) {
        return;
      }

      // Mark as processing to prevent duplicate calls
      isProcessingRef.current = true;

      try {
        console.log('Processing OAuth tokens...');

        // Decode JWT to extract basic user info (payload is base64 encoded)
        const payload = JSON.parse(atob(accessToken.split('.')[1]));

        console.log('JWT payload extracted:', {
          uid: payload.uid,
          email: payload.email,
          accountType: payload.accountType,
        });

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

        console.log('Calling login with tokens...');

        // Call login to save tokens in cookies and fetch profile
        await login(loginResponse);

        console.log('Login successful, showing toast...');

        toast.success(
          locale === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Logged in successfully',
        );

        console.log('Redirecting to:', callbackUrl || `/${locale}`);

        // Remove tokens from URL and redirect to callback URL or home
        const redirectUrl = callbackUrl || `/${locale}`;
        router.replace(redirectUrl);
      } catch (error) {
        console.error('OAuth token handling error:', error);
        toast.error(
          error instanceof Error
            ? error.message
            : locale === 'ar'
              ? 'فشل المصادقة'
              : 'Authentication failed',
        );
        // Redirect to login page on error
        router.replace(`/${locale}/sign-in`);
      } finally {
        // Reset processing flag after a short delay to prevent issues
        setTimeout(() => {
          isProcessingRef.current = false;
        }, 1000);
      }
    };

    handleTokens();
  }, [searchParams, router, locale, login]);

  return null;
}

const TokenHandler = () => {
  return (
    <Suspense fallback={null}>
      <TokenHandlerContent />
    </Suspense>
  );
};

export default TokenHandler;
