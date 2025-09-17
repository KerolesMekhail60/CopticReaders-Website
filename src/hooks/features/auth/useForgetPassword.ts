import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import useTranslations from '@/i18n/useTranslations';
import { forgetPasswordApi } from '@/services/api-auth';

export function useForgetPassword() {
  const navigate = useNavigate();
  const { t } = useTranslations('forms.toasts');

  const { mutateAsync: forgetPassword, isPending: isLoading } = useMutation({
    mutationFn: forgetPasswordApi,
    onSuccess: (email) => {
      toast.success(t('otp'));
      navigate(`/otp?email=${email}`);
    },
  });

  return { forgetPassword, isLoading };
}
