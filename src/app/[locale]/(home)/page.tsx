import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';

import HomeClient from './_components/HomeClient';

import { getAllDataParallel } from '@/utils/api';

type SearchParams = {
  AuthorId?: string;
  CategoryIds?: string;
  Search?: string;
  PageNumber?: string;
  PageSize?: string;
};

function buildBooksQuery(params?: SearchParams) {
  if (!params) return '';

  const query = new URLSearchParams();

  if (params.AuthorId) query.set('AuthorId', params.AuthorId);
  if (params.CategoryIds) query.set('CategoryIds', params.CategoryIds);
  if (params.Search) query.set('Search', params.Search);

  return query.toString();
}

const Home = async ({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) => {
  const locale = await getLocale();

  // 🔑 REQUIRED in Next.js 15
  const resolvedSearchParams = await searchParams;

  // Get token from cookies for authenticated requests
  const cookieStore = await cookies();
  const token = cookieStore.get('coptic_reader_access_token')?.value;

  const booksQuery = buildBooksQuery(resolvedSearchParams);

  // Build headers - include Authorization if token exists
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept-Language': locale,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const [
    quotesResponse,
    categoriesResponse,
    booksResponse,
    authorsResponse,
    famousBooks,
    HolyBook,
  ] = await getAllDataParallel(
    [
      `InspirationalQuotes/paginated?IsActive=true`,
      'Categories/all',
      `UserBooks/browse${booksQuery ? `?${booksQuery}&IsRecent=true` : ''}`,
      `Authors/all`,
      `UserBooks/browse?IsFamous=true`,
      `UserBooks/holy-bible`,
    ],
    {
      headers,
    },
  );

  return (
    <HomeClient
      locale={locale}
      categories={categoriesResponse?.result ?? []}
      recentBooks={booksResponse?.result ?? null}
      initialQuotes={quotesResponse?.result ?? null}
      authors={authorsResponse?.result ?? []}
      famousBooks={famousBooks?.result ?? null}
      HolyBook={HolyBook?.result ?? null}
      searchParams={resolvedSearchParams}
    />
  );
};

export default Home;
