'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Category } from '@/types';

import { getAllData } from '@/utils/api';

type UseCategoriesArgs = {
  locale: string;
  initialData?: Category[] | null;
  enabled?: boolean;
};

const normalizeCategoriesResponse = (payload: unknown): Category[] => {
  if (!payload) return [];

  if (Array.isArray(payload)) {
    return payload as Category[];
  }

  if (Array.isArray((payload as { result?: Category[] }).result)) {
    return (payload as { result?: Category[] }).result ?? [];
  }

  return [];
};

export function useCategories({
  locale,
  initialData,
  enabled = true,
}: UseCategoriesArgs) {
  return useQuery({
    queryKey: ['categories', locale],
    queryFn: async () => {
      const response = await getAllData('Categories/all', {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': locale,
        },
        cache: 'no-store',
      });

      return normalizeCategoriesResponse(response?.result ?? response);
    },
    initialData: initialData ?? undefined,
    placeholderData: keepPreviousData,
    enabled,
    staleTime: 10 * 60 * 1000,
  });
}
