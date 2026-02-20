'use client';

import React, { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { ChevronRight } from 'lucide-react';

import { useQueryClient } from '@tanstack/react-query';

import BookCard from './BookCard';

import { useAuth } from '@/contexts/AuthContext';

import { useFavoritesManager } from '@/hooks/books/useFavoritesManager';

import { BookType } from '@/types';

import { cn } from '@/lib/utils';

interface BooksListProps {
  books: BookType[];
  locale: string;
  label: string;
  currentPage?: number;
  currentCategoryId?: string;
  className?: string;
}

const BookList = ({ books, locale, label, className }: BooksListProps) => {
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

  const mobileCount = 1;
  const tabletCount = 2;
  const desktopCount = 3;
  const desktopCount2 = 5;

  return (
    <div className={cn('my-14 space-y-6', className)}>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>{label}</h2>

        <Link
          href={`/${locale}/books`}
          className='flex items-center gap-2 text-xl font-bold text-secondary-600'
        >
          <p>{t('showAll')}</p>
          <ChevronRight className='rtl:rotate-180' />
        </Link>
      </div>

      {/* Mobile view */}
      <div className='flex flex-wrap gap-4 md:hidden'>
        {booksWithFavoriteStatus?.slice(0, mobileCount).map((book) => (
          <div key={book.id || book.bookId}>
            <BookCard
              book={book}
              isArabic={isArabic}
              isFavorite={book.isFavorite}
              toggleFavorite={handleToggleFavorite}
              disabled={isFavoriteLoading}
            />
          </div>
        ))}
      </div>

      {/* Tablet view */}
      <div className='hidden flex-wrap gap-4 md:flex lg:hidden'>
        {booksWithFavoriteStatus?.slice(0, tabletCount).map((book) => (
          <div key={book.id || book.bookId}>
            <BookCard
              book={book}
              isArabic={isArabic}
              isFavorite={book.isFavorite}
              toggleFavorite={handleToggleFavorite}
              disabled={isFavoriteLoading}
            />
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <div className='hidden flex-wrap gap-6 lg:flex 2xl:hidden'>
        {booksWithFavoriteStatus?.slice(0, desktopCount).map((book) => (
          <div key={book.id || book.bookId}>
            <BookCard
              book={book}
              isArabic={isArabic}
              isFavorite={book.isFavorite}
              toggleFavorite={handleToggleFavorite}
              disabled={isFavoriteLoading}
            />
          </div>
        ))}
      </div>
      <div className='hidden flex-wrap gap-6 2xl:flex'>
        {booksWithFavoriteStatus?.slice(0, desktopCount2).map((book) => (
          <div key={book.id || book.bookId}>
            <BookCard
              book={book}
              isArabic={isArabic}
              isFavorite={book.isFavorite}
              toggleFavorite={handleToggleFavorite}
              disabled={isFavoriteLoading}
            />
          </div>
        ))}
      </div>

      {/* Show message if no books */}
      {(!booksWithFavoriteStatus || booksWithFavoriteStatus.length === 0) && (
        <div className='py-8 text-center'>
          <p className='text-gray-500'>{t('noBooks')}</p>
        </div>
      )}
    </div>
  );
};

export default BookList;
