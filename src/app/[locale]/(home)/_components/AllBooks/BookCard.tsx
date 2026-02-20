'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

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

  // Use book.isFavorite if available, otherwise fall back to isFavorite prop
  const isBookFavorite = book.isFavorite ?? isFavorite;

  return (
    <Card className='mx-auto flex w-full min-w-[259px] flex-col overflow-hidden rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg'>
      <CardContent className='flex flex-1 flex-col bg-white p-3 sm:p-4'>
        <div className='relative mb-3 aspect-[3/4] max-h-[300px] w-full overflow-hidden rounded-xl bg-white sm:mb-4'>
          <Image
            src={book.coverUrl || BookPlaceholder}
            alt={book.title || 'Book'}
            fill
            className='max-h-[300px] max-w-[358px] object-cover'
          />

          {toggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(book.id || book.bookId);
              }}
              disabled={disabled}
              className={`absolute top-2 rounded-full bg-white/80 p-1.5 shadow-md transition-all sm:p-2 ${
                isArabic ? 'right-2' : 'left-2'
              } ${disabled ? 'cursor-not-allowed opacity-60' : 'hover:bg-white'}`}
            >
              <Heart
                className={`h-4 w-4 transition-all sm:h-5 sm:w-5 ${
                  isBookFavorite
                    ? 'scale-110 fill-red-500 text-red-500'
                    : 'text-gray-500 hover:text-red-400'
                } ${disabled ? 'animate-pulse' : ''}`}
              />
            </button>
          )}
        </div>

        <div className={`mb-3 flex-1 space-y-1 sm:mb-4`}>
          <h2 className='line-clamp-2 max-w-[258px] truncate font-bold leading-tight'>
            {book.title || 'Untitled'}
          </h2>
          <p className='line-clamp-2 max-w-[258px] truncate text-xs text-neutral-500 sm:text-sm'>
            {book.firstAuthor ? book.firstAuthor.name : 'Unknown author'}
          </p>
        </div>

        <Button
          variant='secondary'
          className='h-10 w-full py-2 text-sm font-bold sm:h-11 sm:text-base'
          // onClick={() => window.open(book.fileUrl || '#', '_blank')}
          onClick={() => router.push(`/${locale}/books/${book.id || book.bookId}`)}
          // disabled={!book.fileUrl}
        >
          {isArabic ? 'عرض الكتاب' : 'View Book'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookCard;
