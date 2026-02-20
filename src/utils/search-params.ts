//import { addDays, format, isValid } from 'date-fns';

import { FormFilterFields, QueryParams } from '@/types/global';

/* -------------------------------- helpers -------------------------------- */

//const DATE_FORMAT = 'yyyy-MM-dd';

// const formatDate = (date: Date) => format(date, DATE_FORMAT);

// const getValidDate = (value?: string, fallback?: Date) => {
//   const date = value ? new Date(value) : undefined;
//   return date && isValid(date) ? date : fallback;
// };

/* --------------------------- update single param --------------------------- */

export const updateSearchParams = (key: string, value: string) => {
  const searchParams = new URLSearchParams(location.search);

  if (value) {
    searchParams.set(key, value);
  } else {
    searchParams.delete(key);
  }

  return `${location.pathname}?${searchParams.toString()}`;
};

/* --------------------------- form → query string --------------------------- */

export function mapObjectToQueryString(data: FormFilterFields) {
  const {
    AuthorId,
    CategoryId,
    Search,
    //date: { DateFrom, DateTo },
  } = data;

  const queryParams = {
    AuthorId,
    CategoryIds: CategoryId,
    Search,
    // DateFrom: DateFrom ? formatDate(DateFrom) : undefined,
    // DateTo: DateTo ? formatDate(DateTo) : undefined,
    // PageNumber: 1,
    // PageSize: 12,
  };

  return Object.entries(queryParams)
    .filter(([_, value]) => value !== '' && value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

/* --------------------------- query → query string -------------------------- */

export function mapSearchParamsToQueryString(searchParams: QueryParams) {
  const { AuthorId, CategoryIds, Search } = searchParams;

  const queryParams = {
    AuthorId: AuthorId || '',
    CategoryId: CategoryIds || '',
    Search: Search || '',
    // DateFrom: formatDate(getValidDate(DateFrom, addDays(new Date(), 1))!),
    // DateTo: formatDate(getValidDate(DateTo, addDays(new Date(), 2))!),
    // PageNumber: PageNumber || '1',
    // PageSize: PageSize || '12',
  };

  return Object.entries(queryParams)
    .filter(([_, value]) => value !== '' && value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

/* --------------------------- query → form values --------------------------- */

export function mapSearchParamsToDefaultValues(
  searchParams: QueryParams,
): FormFilterFields {
  const { AuthorId, CategoryIds, Search } = searchParams;

  return {
    AuthorId: AuthorId || '',
    CategoryId: CategoryIds || '',
    Search: Search || '',
    // date: {
    //   DateFrom: getValidDate(DateFrom, addDays(new Date(), 1))!,
    //   DateTo: getValidDate(DateTo, addDays(new Date(), 2))!,
    // },
  };
}

/* ------------------------------- reset params ------------------------------ */

export function resetSearchParams() {
  const searchParams = new URLSearchParams(location.search);

  ['AuthorId', 'CategoryIds', 'Search', 'DateFrom', 'DateTo'].forEach(
    (key) => searchParams.delete(key),
  );

  return searchParams.toString();
}
