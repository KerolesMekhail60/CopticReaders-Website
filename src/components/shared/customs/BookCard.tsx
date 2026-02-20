'use client';

import Image from 'next/image';

import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { BookType } from '@/types';

import BookPlaceholder from '@/../public/images/book-placeholder.jpg';

interface BookCardProps {
  book: BookType & { __pdfToken?: string };
  isArabic?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: (id?: string) => void;
  onOpenPdf?: (book: BookType & { __pdfToken?: string }) => void;
}

const BookCard = ({
  book,
  isArabic = false,
  isFavorite = false,
  onFavoriteToggle,
  onOpenPdf,
}: BookCardProps) => {
  return (
    <Card className='mx-auto flex w-full min-w-[259px] flex-col overflow-hidden rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg'>
      <CardContent className='flex flex-1 flex-col bg-white p-3 sm:p-4'>
        {/* Image Section */}
        <div className='relative mb-3 aspect-[3/4] w-full overflow-hidden rounded-xl bg-white sm:mb-4'>
          <Image
            src={book.coverUrl || BookPlaceholder}
            alt={book.title || 'Book'}
            fill
            className='object-cover'
            sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw'
          />
          <button
            onClick={() => onFavoriteToggle?.(book.id)}
            className={`absolute top-2 rounded-full bg-white/80 p-1.5 shadow-md transition-colors hover:bg-white sm:p-2 ${
              isArabic ? 'right-2' : 'left-2'
            }`}
            aria-label={
              isFavorite
                ? isArabic
                  ? 'إزالة من المفضلة'
                  : 'Remove from favorites'
                : isArabic
                  ? 'إضافة إلى المفضلة'
                  : 'Add to favorites'
            }
          >
            <Heart
              className={`h-4 w-4 transition-all sm:h-5 sm:w-5 ${
                isFavorite
                  ? 'scale-110 fill-red-500 text-red-500'
                  : 'text-gray-500 hover:text-red-400'
              }`}
            />
          </button>
        </div>

        {/* Text Section */}
        <div
          className={`mb-3 flex-1 space-y-1 sm:mb-4 ${
            isArabic ? 'text-end' : 'text-start'
          }`}
        >
          <h2 className='line-clamp-2 font-bold leading-tight text-black'>
            {book.title || (isArabic ? 'بدون عنوان' : 'Untitled')}
          </h2>
          <p className='line-clamp-2 text-xs leading-relaxed text-neutral-500 sm:text-sm'>
            {book.bookAuthors && Array.isArray(book.bookAuthors)
              ? book.bookAuthors.map((author, idx) => (
                  <span key={author.id ?? idx}>
                    {author.name}
                    {idx < book.bookAuthors!.length - 1 ? ' – ' : ''}
                  </span>
                ))
              : isArabic
                ? 'مؤلف غير معروف'
                : 'Unknown author'}
          </p>
        </div>

        {/* Button */}
        <div className='mt-auto'>
          <Button
            variant='secondary'
            className='h-10 w-full py-2 text-sm font-bold sm:h-11 sm:text-base'
            onClick={() => onOpenPdf?.(book)}
            disabled={!book.__pdfToken && !book.fileUrl}
          >
            {isArabic ? 'عرض الكتاب' : 'View Book'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCard;
