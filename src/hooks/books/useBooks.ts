'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useAuth } from '@/contexts/AuthContext';

import { BookType, PaginatedBooksResponse } from '@/types';

import { getAllData } from '@/utils/api';
import {
  BookFilterParams,
  buildBookQueryString,
} from '@/utils/BookFilterParams';

const parseNumericValue = (value: unknown, fallback: number) => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
  }

  return fallback;
};

const normalizeBooksResponse = (payload: unknown): PaginatedBooksResponse => {
  if (!payload) {
    return { result: [] };
  }

  const raw =
    Array.isArray((payload as PaginatedBooksResponse)?.result) &&
    !(payload as { result?: PaginatedBooksResponse })?.result?.result
      ? (payload as PaginatedBooksResponse)
      : ((payload as { result?: PaginatedBooksResponse })
          ?.result as PaginatedBooksResponse) ||
        (payload as PaginatedBooksResponse);

  const fallbackArray = Array.isArray(payload as BookType[])
    ? (payload as BookType[])
    : [];

  const books = Array.isArray(raw?.result) ? raw.result : fallbackArray;

  const pageSize = parseNumericValue(raw?.pageSize, 12);
  const pageNumber = parseNumericValue(raw?.pageNumber, 1);
  const totalCount = parseNumericValue(raw?.totalCount, books.length);
  const totalPages = parseNumericValue(
    raw?.totalPages,
    pageSize > 0 ? Math.max(1, Math.ceil(totalCount / pageSize)) : 1,
  );

  return {
    result: books,
    pageNumber,
    pageSize,
    totalCount,
    totalPages,
  };
};

type UseBooksArgs = {
  locale: string;
  filters: BookFilterParams;
  initialData?: PaginatedBooksResponse | null;
  enabled?: boolean;
};

export function useBooks({
  locale,
  filters,
  initialData,
  enabled = true,
}: UseBooksArgs) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['books', locale, filters],
    queryFn: async () => {
      const queryString = buildBookQueryString(filters);
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept-Language': locale,
      };

      // Add Authorization header if token is available
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await getAllData(`Books/paginated?${queryString}`, {
        headers,
        cache: 'no-store',
      });

      return normalizeBooksResponse(response?.result ?? response);
    },
    placeholderData: keepPreviousData,
    initialData: initialData ?? undefined,
    enabled,
    select: (data) => ({
      ...data,
      result: data?.result ?? [],
    }),
    staleTime: 2 * 60 * 1000,
  });
}
