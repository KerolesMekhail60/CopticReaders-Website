'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { BookType } from '@/types';

import BookPlaceholder from '@/../public/images/book-placeholder.jpg';

interface BookCardProps {
  book: BookType;
  isArabic: boolean;
  isFavorite?: boolean;
  toggleFavorite?: (id?: string) => void;
  disabled?: boolean;
}

const BookCard = ({
  book,
  isArabic,
  isFavorite = false,
  toggleFavorite,
  disabled = false,
}: BookCardProps) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('bookCard');
  const tBooks = useTranslations('books');

  // Use book.isFavorite if available, otherwise fall back to isFavorite prop
  const isBookFavorite = book.isFavorite ?? isFavorite;

  const handleViewBook = () => {
    router.push(`/${locale}/books/${book.id || book.bookId}`);
  };

  return (
    <Card
      className='mx-auto flex w-full max-w-[282px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg'
      style={{ maxHeight: '486px' }}
    >
      <CardContent className='flex flex-1 flex-col p-3 sm:p-4'>
        {/* Image Section with Heart Icon */}
        <div className='relative mb-3 aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 sm:mb-4'>
          <Image
            src={book.coverUrl || BookPlaceholder}
            alt={book.title || 'Book'}
            fill
            className='object-cover'
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          />

          {/* Heart Icon - Always visible */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite?.(book.id || book.bookId);
            }}
            disabled={disabled}
            className={`absolute top-2 z-10 rounded-full bg-white/80 p-1.5 shadow-md transition-all sm:p-2 ${
              isArabic ? 'start-2' : 'end-2'
            } ${disabled ? 'cursor-not-allowed opacity-60' : 'transition-colors hover:bg-white'}`}
            aria-label={
              isBookFavorite ? t('removeFromFavorites') : t('addToFavorites')
            }
          >
            <Heart
              className={`h-4 w-4 transition-all sm:h-5 sm:w-5 ${
                isBookFavorite
                  ? 'scale-110 fill-red-500 text-red-500'
                  : 'text-gray-500 hover:text-red-400'
              } ${disabled ? 'animate-pulse' : ''}`}
            />
          </button>
        </div>

        {/* Text Section */}
        <div className={`mb-3 flex-1 space-y-1 text-start sm:mb-4`}>
          <h2 className='line-clamp-2 max-w-[258px] truncate font-bold leading-tight'>
            {book.title || t('untitled')}
          </h2>
          <p className='line-clamp-2 max-w-[258px] truncate text-xs text-neutral-500 sm:text-sm'>
            {book.firstAuthor
              ? book.firstAuthor.name
              : book.bookAuthors && Array.isArray(book.bookAuthors)
                ? book.bookAuthors.map((author, idx) => (
                    <span key={author.id ?? idx}>
                      {author.name}
                      {idx < book.bookAuthors!.length - 1 ? ' – ' : ''}
                    </span>
                  ))
                : t('unknownAuthor')}
          </p>
        </div>

        {/* Buttons Section */}
        <div className='mt-auto flex flex-col gap-2'>
          <Button
            variant='secondary'
            className='h-10 w-full py-2 text-sm font-bold sm:h-11 sm:text-base'
            onClick={handleViewBook}
          >
            {tBooks('viewBook')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
