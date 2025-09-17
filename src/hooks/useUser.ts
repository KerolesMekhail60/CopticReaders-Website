import Cookies from 'js-cookie';

import { useQuery } from '@tanstack/react-query';

import { User } from '@/types';

import { TOKEN } from '@/constants';

import { getCurrentUser } from '@/services/api-auth';

export function useUser() {
  const token = Cookies.get(TOKEN);

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    enabled: !!token,
    staleTime: Infinity,
  });

  return {
    isLoading,
    user,
    isAuthenticated: !!token,
  };
}
