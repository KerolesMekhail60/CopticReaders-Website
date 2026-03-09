import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/lib/site';

type SitemapBook = {
  id?: string;
  bookId?: string;
  createdOn?: string;
  updatedOn?: string;
};

type BrowseResponse = {
  result?: SitemapBook[] | { result?: SitemapBook[] };
};

const LOCALES = ['ar', 'en'] as const;

async function getBooksForSitemap(): Promise<SitemapBook[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) return [];

  try {
    const response = await fetch(
      `${apiUrl}/UserBooks/browse?PageNumber=1&PageSize=10000`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return [];

    const data = (await response.json()) as BrowseResponse;
    const result = data?.result;
    if (Array.isArray(result)) return result;
    return result?.result ?? [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    {
      url: `${siteUrl}/${locale}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/${locale}/books`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]);

  const books = await getBooksForSitemap();

  const bookRoutes: MetadataRoute.Sitemap = books.flatMap((book) => {
    const id = book.id || book.bookId;
    if (!id) return [];

    const lastModified = book.updatedOn || book.createdOn;

    return LOCALES.map((locale) => ({
      url: `${siteUrl}/${locale}/books/${id}`,
      lastModified: lastModified ? new Date(lastModified) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  });

  return [...staticRoutes, ...bookRoutes];
}
