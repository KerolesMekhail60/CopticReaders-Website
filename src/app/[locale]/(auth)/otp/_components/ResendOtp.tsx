'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { toast } from 'sonner';

import { resendOtpApi } from '@/services/auth-api';

function ResendOtp() {
  const [timer, setTimer] = useState(0);
  const t = useTranslations('');
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const handelResend = async () => {
    if (!email) {
      toast.error(t('forms.errors.emailRequired'));
      return;
    }

    try {
      setTimer(60);

      await resendOtpApi(email);

      toast.success(t('pages.otp.resend.success') || 'OTP resent successfully');
    } catch (error: any) {
      setTimer(0);
      toast.error(error?.message || 'Something went wrong, please try again');
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (timer > 0) {
        setTimer((t) => t - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [timer]);

  return (
    <button
      className='w-full text-center text-sm font-bold text-primary-700 underline disabled:opacity-50'
      onClick={handelResend}
      disabled={timer > 0}
    >
      {timer === 0 ? (
        <span>{t('pages.otp.resend.resendAgain')} </span>
      ) : (
        <span>{`${t('pages.otp.resend.resendEmail')} (${timer || 60} ${t('pages.otp.resend.resendAgain')})`}</span>
      )}
    </button>
  );
}

export default ResendOtp;
