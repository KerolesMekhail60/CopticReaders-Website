'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { BookCardsSkeleton } from '@/components/shared/BookCardsSkeleton';
import { Button } from '@/components/ui/button';

import { useAuth } from '@/contexts/AuthContext';

import { useFavorites } from '@/hooks/books/useFavorites';
import { useFavoritesManager } from '@/hooks/books/useFavoritesManager';

import BookCard from '@/app/[locale]/(home)/_components/AllBooks/BookCard';

const FavoritesClient = ({ locale }: { locale: string }) => {
  const t = useTranslations('favorites');
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const { data: favorites, isLoading, error, refetch } = useFavorites();

  const { toggleFavorite, isLoading: isFavoriteLoading } = useFavoritesManager({
    onSuccess: () => {
      refetch(); // Refresh favorites list after add/remove
    },
  });

  const isArabic = locale === 'ar';

  const handleToggleFavorite = (bookId?: string) => {
    if (bookId) {
      // Favorites are always favorited, so we pass true
      toggleFavorite(bookId, true);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/sign-in`);
    }
  }, [isAuthenticated, locale, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className='container mx-auto min-h-screen px-4 py-8'>
        <BookCardsSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto min-h-screen px-4 py-8'>
        <div className='flex flex-col items-center justify-center py-20'>
          <p className='mb-4 text-lg text-red-500'>{t('loadError')}</p>
          <Button onClick={() => router.refresh()}>{t('tryAgain')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto min-h-screen px-4 py-8'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold'>{t('title')}</h1>
        <p className='text-gray-600'>{t('subtitle')}</p>
      </div>

      {!favorites || favorites.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20'>
          <div className='mb-4 text-6xl'>📚</div>
          <h2 className='mb-2 text-2xl font-bold'>{t('noFavoritesTitle')}</h2>
          <p className='mb-6 text-center text-gray-600'>
            {t('noFavoritesMessage')}
          </p>
          <Button onClick={() => router.push(`/${locale}/books`)}>
            {t('browseBooks')}
          </Button>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {favorites.map((book) => (
            <BookCard
              key={book.id || book.bookId}
              book={book}
              isArabic={isArabic}
              isFavorite={book.isFavorite ?? true} // Favorites are always favorited
              toggleFavorite={handleToggleFavorite}
              disabled={isFavoriteLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesClient;
