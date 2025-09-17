import Cookies from 'js-cookie';

import { useQuery } from '@tanstack/react-query';

import { REFRESH_TOKEN, TOKEN } from '@/constants';

import { refreshTokenApi } from '@/services/api-auth';

export function useRefreshToken() {
  const token = Cookies.get(TOKEN);
  const refreshToken = Cookies.get(REFRESH_TOKEN);
  const {
    data,
    isPending: isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['refreshToken'],
    queryFn: refreshTokenApi,
    enabled: !!token && !!refreshToken,
    staleTime: 30 * 60 * 1000,
    refetchInterval: 30 * 60 * 1000,
    retry: 0,
  });

  return { data, isLoading, isError, error };
}
