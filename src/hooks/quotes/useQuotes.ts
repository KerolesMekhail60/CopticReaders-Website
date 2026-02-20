'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { QuotesResult } from '@/types';

import { getAllData } from '@/utils/api';

type UseQuotesArgs = {
  locale: string;
  pageNumber: string;
  pageSize?: string;
  initialData?: QuotesResult | null;
  enabled?: boolean;
};

const buildQuotesQuery = (pageNumber: string, pageSize: string) => {
  const params = new URLSearchParams({
    IsActive: 'true',
    PageNumber: pageNumber || '1',
    PageSize: pageSize || '2',
  });

  return params.toString();
};

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

const normalizeQuotesResponse = (payload: unknown): QuotesResult => {
  const defaultValue: QuotesResult = {
    pageNumber: 1,
    pageSize: 2,
    totalCount: 0,
    totalPages: 0,
    result: [],
  };

  if (!payload) {
    return defaultValue;
  }

  const raw =
    (payload as QuotesResult)?.pageNumber !== undefined
      ? (payload as QuotesResult)
      : (((payload as { result?: QuotesResult })?.result as QuotesResult) ??
        null);

  if (!raw) {
    return defaultValue;
  }

  const result = Array.isArray(raw.result) ? raw.result : [];
  const pageSize = parseNumericValue(raw.pageSize, defaultValue.pageSize);
  const pageNumber = parseNumericValue(raw.pageNumber, defaultValue.pageNumber);
  const totalCount = parseNumericValue(raw.totalCount, result.length);
  const totalPages = parseNumericValue(
    raw.totalPages,
    pageSize > 0 ? Math.max(1, Math.ceil(totalCount / pageSize)) : 1,
  );

  return {
    pageNumber,
    pageSize,
    totalCount,
    totalPages,
    result,
  };
};

export function useQuotes({
  locale,
  pageNumber,
  pageSize = '2',
  initialData,
  enabled = true,
}: UseQuotesArgs) {
  return useQuery({
    queryKey: ['quotes', locale, pageNumber, pageSize],
    queryFn: async () => {
      const queryString = buildQuotesQuery(pageNumber, pageSize);
      const response = await getAllData(
        `InspirationalQuotes/paginated?${queryString}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': locale,
          },
          cache: 'no-store',
        },
      );

      return normalizeQuotesResponse(response?.result ?? response);
    },
    initialData: initialData ?? undefined,
    placeholderData: keepPreviousData,
    enabled,
    staleTime: 60 * 1000,
  });
}
