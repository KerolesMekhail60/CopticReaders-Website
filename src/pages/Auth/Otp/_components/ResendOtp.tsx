import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { postData } from '@/utils';

import useTranslations from '@/i18n/useTranslations';

// import { postData } from '@/utils/api';

function ResendOtp() {
  const [timer, setTimer] = useState(0);
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const { t } = useTranslations('forms');
  const handelResend = async () => {
    try {
      setTimer(30);

      await postData(
        `Account/sendForgetPasswordOtp?emailOrPhoneNumber=${email}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        },
      );
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
      className='w-full text-center text-sm font-bold text-primary-500 underline hover:text-primary-700 disabled:opacity-50'
      onClick={handelResend}
      disabled={timer > 0}
      type='button'
    >
      {timer === 0 ? (
        <span>{t('buttonLabels.resendAgain')} </span>
      ) : (
        <span>{`${t('buttonLabels.resendEmail')} (${timer || 60} ${t('buttonLabels.seconds')})`}</span>
      )}
    </button>
  );
}

export default ResendOtp;
