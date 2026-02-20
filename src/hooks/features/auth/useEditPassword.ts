import { useCallback } from 'react';

import { useTranslations } from 'next-intl';

import { toast } from 'sonner';

import { useAuth } from '@/contexts/AuthContext';

import type { ChangePasswordRequest } from '@/types';

import { changePasswordApi } from '@/services/auth-api';

export const useEditPassword = () => {
  const { token } = useAuth();
  const t = useTranslations('forms');

  const editPassword = useCallback(
    async (data: ChangePasswordRequest) => {
      if (!token) {
        toast.error(t('toasts.somethingWentWrong'));
        throw new Error('No authentication token available');
      }

      try {
        const res = await changePasswordApi(data, token);

        if (res?.isError) {
          throw new Error(res.message || t('toasts.somethingWentWrong'));
        }

        toast.success(t('toasts.changePasswordSuccess'));
        return res;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : t('toasts.somethingWentWrong');
        toast.error(errorMessage);
        throw error;
      }
    },
    [token, t],
  );

  return { editPassword };
};
