'use client';

import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/contexts/AuthContext';

import { BookType } from '@/types';

import { getAllData } from '@/utils/api';

const normalizeFavoritesResponse = (payload: unknown): BookType[] => {
  if (!payload) {
    return [];
  }

  const result = (payload as { result?: BookType[] })?.result ?? payload;

  return Array.isArray(result) ? result : [];
};

export function useFavorites() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const response = await getAllData('UserBooks/my-books', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      });

      return normalizeFavoritesResponse(response);
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
