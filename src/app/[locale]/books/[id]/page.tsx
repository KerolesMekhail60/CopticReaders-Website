import React from 'react';

import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Image from 'next/image';

import BookList from '../../(home)/_components/AllBooks/BookList';

import ShareButton from './_components/ShareButton';
import BookPdfDialog from './BookPdfDialog';

import { Category } from '@/types';

import { getAllData } from '@/utils/api';

import BookPlaceholder from '@/../public/images/book-placeholder.jpg';
import { Locale } from '@/i18n/i18n.config';
import { encryptUrlToToken } from '@/lib/secure-link';
import { getSiteUrl } from '@/lib/site';

interface BookDetailProps {
  params: Promise<{
    id: string;
    locale: Locale;
  }>;
}

const siteUrl = getSiteUrl();

function buildBookUrl(locale: Locale, id: string) {
  return `${siteUrl}/${locale}/books/${id}`;
}

const labels = {
  ar: {
    author: 'اسم الكاتب',
    publisher: 'الناشر',
    publishYear: 'سنة النشر',
    pages: 'عدد الصفحات',
    categories: 'التصنيفات',
    viewBook: 'عرض الكتاب',
    notFound: 'الكتاب غير موجود',
    description: 'الوصف',
    unavailable: 'غير متاح',
    loadingBook: 'جاري تحميل الكتاب...',
    recommended: 'الكتب المقترحة',
    shareButton: 'مشاركة',
    noRecommendedBooks: 'لا توجد كتب مقترحة',
  },
  en: {
    author: 'Author',
    publisher: 'Publisher',
    publishYear: 'Publish Year',
    pages: 'Pages',
    categories: 'Categories',
    viewBook: 'View Book',
    notFound: 'Book not found',
    description: 'Description',
    unavailable: 'Unavailable',
    loadingBook: 'Loading book...',
    recommended: 'Recommended Books',
    shareButton: 'Share',
    noRecommendedBooks: 'No recommended books available',
  },
};

async function fetchBookById(id: string, locale: Locale, token?: string) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept-Language': locale,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return getAllData(`books/${id}/localized`, { headers });
}

export async function generateMetadata({
  params,
}: BookDetailProps): Promise<Metadata> {
  const { id, locale } = await params;

  try {
    const book = await fetchBookById(id, locale);
    const title = book?.title || (locale === 'ar' ? 'تفاصيل كتاب' : 'Book Details');
    const description =
      book?.description ||
      (locale === 'ar'
        ? 'تفاصيل كتاب من مكتبة Coptic Readers.'
        : 'Book details from the Coptic Readers library.');

    return {
      title,
      description,
      alternates: {
        canonical: buildBookUrl(locale, id),
        languages: {
          ar: buildBookUrl('ar', id),
          en: buildBookUrl('en', id),
        },
      },
      openGraph: {
        title,
        description,
        type: 'article',
        url: buildBookUrl(locale, id),
        images: book?.coverUrl ? [{ url: book.coverUrl }] : undefined,
      },
    };
  } catch {
    return {
      title: locale === 'ar' ? 'الكتاب غير موجود' : 'Book not found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

const BookDetail = async ({ params }: BookDetailProps) => {
  const { id, locale } = await params;
  const t = labels[locale];

  // Get token from cookies for authenticated requests
  const cookieStore = await cookies();
  const token = cookieStore.get('coptic_reader_access_token')?.value;

  /* ------------------------------------------------------------------ */
  /* 1️⃣ Fetch book details                                              */
  /* ------------------------------------------------------------------ */
  const book = await fetchBookById(id, locale, token);

  if (!book) {
    return (
      <section className='container mx-auto my-14'>
        <h2 className='text-2xl font-bold'>{t.notFound}</h2>
      </section>
    );
  }

  /* ------------------------------------------------------------------ */
  /* 2️⃣ Secure PDF token                                                */
  /* ------------------------------------------------------------------ */
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || '';

  const hasSecret = Boolean(process.env.FILE_TOKEN_SECRET);

  let bookWithToken = book as typeof book & { __pdfToken?: string };

  if (hasSecret && book.fileUrl) {
    const fullUrl = /^https?:\/\//i.test(book.fileUrl)
      ? book.fileUrl
      : `${apiBase.replace(/\/$/, '')}/${book.fileUrl.replace(/^\//, '')}`;

    bookWithToken = {
      ...book,
      __pdfToken: encryptUrlToToken(fullUrl, 60 * 30),
    };
  }

  /* ------------------------------------------------------------------ */
  /* 3️⃣ Book info rows                                                  */
  /* ------------------------------------------------------------------ */
  const infoRows = [
    { label: t.author, value: book.firstAuthor?.name },
    { label: t.publisher, value: book.publisher?.name },
    { label: t.publishYear, value: book.publishYear },
    { label: t.pages, value: book.pagesCount },
    {
      label: t.categories,
      value: book.categories?.map((c: Category) => c.name).join('، '),
    },
    { label: t.description, value: book.description },
  ];

  /* ------------------------------------------------------------------ */
  /* 4️⃣ Build CategoryIds query correctly (array<string>)               */
  /* ------------------------------------------------------------------ */
  const categoryIds =
    book.categories?.map((c: Category) => c.id).filter(Boolean) ?? [];

  const searchParams = new URLSearchParams();
  categoryIds.forEach((id: string) => {
    searchParams.append('CategoryIds', id);
  });

  const browseEndpoint =
    categoryIds.length > 0
      ? `UserBooks/browse?${searchParams.toString()}`
      : null;

  /* ------------------------------------------------------------------ */
  /* 5️⃣ Fetch recommended books                                          */
  /* ------------------------------------------------------------------ */
  const bookResponse = browseEndpoint
    ? await getAllData(browseEndpoint, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': locale,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
    : null;

  const recommendedBooks = bookResponse?.result ?? [];
  const bookUrl = buildBookUrl(locale, id);

  const bookSchema = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    description: book.description,
    inLanguage: locale,
    author: book.firstAuthor?.name
      ? {
          '@type': 'Person',
          name: book.firstAuthor.name,
        }
      : undefined,
    image: book.coverUrl || undefined,
    url: bookUrl,
    datePublished: book.publishYear ? `${book.publishYear}-01-01` : undefined,
    publisher: book.publisher?.name
      ? {
          '@type': 'Organization',
          name: book.publisher.name,
        }
      : undefined,
  };

  /* ------------------------------------------------------------------ */
  /* 6️⃣ Render                                                         */
  /* ------------------------------------------------------------------ */
  return (
    <section className='container mx-auto my-8 px-4 md:my-14'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookSchema),
        }}
      />
      <div className='grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-4'>
        {/* COVER */}
        <div className='col-span-1'>
          <div className='relative mx-auto aspect-[3/4] max-h-[442px] overflow-hidden rounded-xl'>
            <Image
              src={book.coverUrl || BookPlaceholder}
              alt={book.title}
              fill
              className='object-cover'
            />
          </div>
        </div>

        {/* DETAILS */}
        <div className='col-span-3 flex flex-col justify-between'>
          <div className='grid auto-rows-min grid-cols-[104px_20px_1fr] gap-3'>
            {infoRows.map((row, index) => (
              <React.Fragment key={index}>
                <span className='text-lg font-medium text-[#656565]'>
                  {row.label}
                </span>
                <span className='text-center text-lg font-medium text-[#656565]'>
                  :
                </span>
                <span className='text-lg text-[#A6A6A6]'>
                  {row.value || '-'}
                </span>
              </React.Fragment>
            ))}
          </div>

          <div className='mt-6 flex gap-3 flex-row sm:items-center sm:gap-4'>
            <BookPdfDialog
              token={bookWithToken.__pdfToken}
              fileUrl={bookWithToken.fileUrl}
              viewLabel={t.viewBook}
              unavailableLabel={t.unavailable}
              loadingLabel={t.loadingBook}
              classNameTrigger='w-[200px]'
            />
            <ShareButton
              bookTitle={book.title}
              bookUrl={bookUrl}
              shareLabel={t.shareButton}
              locale={locale}
            />
          </div>
        </div>
      </div>

      {/* RECOMMENDED BOOKS */}
      <div className='relative min-h-[200px]'>
        {!browseEndpoint || recommendedBooks.length === 0 ? (
          <div className='my-14 space-y-6'>
            <h2 className='text-2xl font-bold'>{t.recommended}</h2>
            <div className='py-8 text-center'>
              <p className='text-gray-500'>{t.noRecommendedBooks}</p>
            </div>
          </div>
        ) : (
          <BookList
            books={recommendedBooks}
            locale={locale}
            label={t.recommended}
          />
        )}
      </div>
    </section>
  );
};

export default BookDetail;
