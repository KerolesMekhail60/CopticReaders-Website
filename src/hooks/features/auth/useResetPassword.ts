import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import useTranslations from '@/i18n/useTranslations';
import { resetPasswordApi } from '@/services/api-auth';

export function useResetPassword() {
  const navigate = useNavigate();
  const { t } = useTranslations('forms.toasts');

  const { mutateAsync: resetPassword, isPending: isLoading } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success(t('resetPassword'));
      navigate('/signin', { replace: true });
    },
  });

  return { resetPassword, isLoading };
}
