import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { otpApi } from '@/services/api-auth';

export function useOtp() {
  const navigate = useNavigate();

  const { mutateAsync: otp, isPending: isLoading } = useMutation({
    mutationFn: otpApi,
    onSuccess: ({ email, otp }) => {
      navigate(`/reset-password?email=${email}&otp=${otp}`);
    },
  });

  return { otp, isLoading };
}
