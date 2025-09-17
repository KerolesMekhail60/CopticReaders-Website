import Cookies from 'js-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { User } from '@/types';

import { REFRESH_TOKEN, TOKEN } from '@/constants';

import { loginApi } from '@/services/api-auth';

export function useLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const { mutateAsync: login, isPending: isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: async (user: User) => {
      const options = {
        expires: new Date(user.expiresOn),
      };

      Cookies.set(TOKEN, user.token, options);
      Cookies.set(REFRESH_TOKEN, user.refreshToken, options);

      navigate(callbackUrl, { replace: true });
    },
  });

  return { login, isLoading };
}
