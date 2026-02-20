import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';

import BooksClient from './BooksClient';

import { getAllDataParallel } from '@/utils/api';

type SearchParams = {
  CategoryIds?: string | string[];
  PageNumber?: string;
  PageSize?: string;
  Search?: string;
};

function buildBooksQuery(params?: SearchParams) {
  if (!params) return '';

  const query = new URLSearchParams();

  if (params.PageNumber) query.set('PageNumber', params.PageNumber);
  if (params.PageSize) query.set('PageSize', params.PageSize);
  if (params.Search) query.set('Search', params.Search);

  // Handle CategoryIds - can be string or array
  if (params.CategoryIds) {
    const categoryIds = Array.isArray(params.CategoryIds)
      ? params.CategoryIds
      : [params.CategoryIds];
    categoryIds.forEach((id) => {
      query.append('CategoryIds', id);
    });
  }

  return query.toString();
}

async function Books({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const locale = await getLocale();

  // 🔑 REQUIRED in Next.js 15
  const resolvedSearchParams = await searchParams;

  // Get token from cookies for authenticated requests
  const cookieStore = await cookies();
  const token = cookieStore.get('coptic_reader_access_token')?.value;

  const booksQuery = buildBooksQuery(resolvedSearchParams);
  const pageNumber = resolvedSearchParams?.PageNumber || '1';
  const pageSize = resolvedSearchParams?.PageSize || '12';

  // Build headers - include Authorization if token exists
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept-Language': locale,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const [booksResponse, categoriesResponse] = await getAllDataParallel(
    [
      `UserBooks/browse${booksQuery ? `?${booksQuery}` : `?PageNumber=${pageNumber}&PageSize=${pageSize}`}`,
      'Categories/books-counted?PageNumber=1&PageSize=10000',
    ],
    {
      headers,
    },
  );
  console.log("🚀 ~ Books ~ categoriesResponse:", categoriesResponse)

  // Normalize books response - handle both nested and flat structures
  let normalizedBooks = null;
  if (booksResponse) {
    const raw = booksResponse?.result?.result
      ? booksResponse.result
      : booksResponse?.result
        ? booksResponse
        : { result: booksResponse };

    normalizedBooks = {
      result: Array.isArray(raw?.result) ? raw.result : [],
      totalCount: raw?.totalCount || 0,
      totalPages: raw?.totalPages || 1,
      pageNumber: raw?.pageNumber || parseInt(pageNumber),
      pageSize: raw?.pageSize || parseInt(pageSize),
    };
  }

  // Normalize categories response
  const categories =
    categoriesResponse?.result?.result ?? categoriesResponse?.result ?? [];

  return (
    <BooksClient
      locale={locale}
      initialBooks={normalizedBooks}
      categories={categories}
      searchParams={resolvedSearchParams}
    />
  );
}

export default Books;
