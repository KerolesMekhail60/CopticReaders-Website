'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { useTranslations } from 'next-intl';

import { BookOpen } from 'lucide-react';

import { useQueryClient } from '@tanstack/react-query';

import BookCard from './BookCard';

import { useAuth } from '@/contexts/AuthContext';

import { useFavoritesManager } from '@/hooks/books/useFavoritesManager';

import { BookType } from '@/types';

interface BooksGridProps {
  books: BookType[];
  locale: string;
  isLoading?: boolean;
}

const BooksGrid = ({ books, locale, isLoading }: BooksGridProps) => {
  console.log('🚀 ~ BooksGrid ~ books:', books);
  const t = useTranslations('books');
  const isArabic = locale === 'ar';
  const queryClient = useQueryClient();

  const { isAuthenticated } = useAuth();

  const { toggleFavorite, isLoading: isFavoriteLoading } =
    useFavoritesManager();

  // Sync books with React Query cache updates
  const [localBooks, setLocalBooks] = useState<BookType[]>(books);

  // Update local books when props change
  useEffect(() => {
    setLocalBooks(books);
  }, [books]);

  // Get favorite status from cache and merge with local books
  const booksWithFavoriteStatus = useMemo(() => {
    // Merge local books with cache data
    return localBooks.map((book) => {
      const id = String(book.id || book.bookId);
      // Check both the books query cache and the bookFavorite cache
      const favoriteFromCache = queryClient.getQueryData<boolean>([
        'bookFavorite',
        id,
      ]);

      // Also check books query cache
      const allQueries = queryClient.getQueriesData({ queryKey: ['books'] });
      let favoriteFromBooksCache: boolean | undefined;

      for (const [, data] of allQueries) {
        if (data && typeof data === 'object' && 'result' in data) {
          const paginatedData = data as { result?: BookType[] };
          const foundBook = paginatedData.result?.find(
            (b) => String(b.id || b.bookId) === id,
          );
          if (foundBook && foundBook.isFavorite !== undefined) {
            favoriteFromBooksCache = foundBook.isFavorite;
            break;
          }
        }
      }

      const finalFavorite =
        favoriteFromCache !== undefined
          ? favoriteFromCache
          : favoriteFromBooksCache !== undefined
            ? favoriteFromBooksCache
            : book.isFavorite;

      return {
        ...book,
        isFavorite: finalFavorite,
      };
    });
  }, [localBooks, queryClient]);

  // Subscribe to cache updates to trigger re-render
  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      // Only update if it's a bookFavorite or books query update
      if (
        event?.query?.queryKey?.[0] === 'bookFavorite' ||
        event?.query?.queryKey?.[0] === 'books'
      ) {
        // Force re-render by updating local books reference
        setLocalBooks((prev) => [...prev]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient]);

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className='mx-auto flex h-[486px] w-full max-w-[282px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-secondary-100'
          >
            <div className='flex flex-1 flex-col p-3 sm:p-4'>
              {/* Image Section */}
              <div className='relative mb-3 aspect-[3/4] w-full overflow-hidden rounded-xl bg-primary-500 sm:mb-4' />

              {/* Heart Icon Placeholder */}
              {/* <div
                className={`absolute top-5 h-6 w-6 rounded-full bg-gray-200 sm:top-6`}
              /> */}

              {/* Text Section */}
              <div className={`mb-3 flex-1 space-y-1 sm:mb-4`}>
                <div className='h-4 w-full rounded bg-gray-200' />
                <div className='h-4 w-3/4 rounded bg-gray-200' />
                <div className='h-3 w-1/2 rounded bg-gray-200' />
              </div>

              {/* Button Section */}
              <div className='mt-auto flex flex-col gap-2'>
                <div className='h-10 w-full rounded-xl bg-gray-200 sm:h-11' />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className='flex min-h-[400px] flex-col items-center justify-center py-12 text-center'>
        <div className='mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100'>
          <BookOpen className='h-12 w-12 text-gray-400' />
        </div>
        <h3 className='mb-2 text-xl font-semibold text-gray-800'>
          {t('noBooksAvailable')}
        </h3>
        <p className='max-w-md text-sm text-gray-500'>{t('noBooksMessage')}</p>
      </div>
    );
  }

  const handleToggleFavorite = (bookId?: string) => {
    if (bookId) {
      const book = booksWithFavoriteStatus.find(
        (b) => b.id === bookId || b.bookId === bookId,
      );
      const isCurrentlyFavorite = book?.isFavorite ?? false;

      // Call toggleFavorite to trigger the auth check and toast
      toggleFavorite(bookId, isCurrentlyFavorite);

      // Only optimistically update UI if user is authenticated
      if (isAuthenticated) {
        setLocalBooks((prev) =>
          prev.map((b) =>
            b.id === bookId || b.bookId === bookId
              ? { ...b, isFavorite: !isCurrentlyFavorite }
              : b,
          ),
        );
      }
    }
  };
  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {booksWithFavoriteStatus.map((book) => (
          <BookCard
            key={book.id || book.bookId}
            book={book}
            isArabic={isArabic}
            isFavorite={book.isFavorite}
            toggleFavorite={handleToggleFavorite}
            disabled={isFavoriteLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default BooksGrid;
