import React from 'react';

import { useTranslations } from 'next-intl';

import BookCard from '../(home)/_components/AllBooks/BookCard';

import { BookType } from '@/types';

interface BooksListProps {
  books: BookType[];
  locale: string;
  lable: string;
  currentPage?: number;
  currentCategoryId?: string;
}

const ShowAllBooks = ({ books, locale, lable }: BooksListProps) => {
  const t = useTranslations('books');
  const isArabic = locale === 'ar';

  return (
    <div className='container mx-auto my-14 space-y-6'>
      <h2 className='text-2xl font-bold'>{lable}</h2>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5'>
        {books?.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isArabic={isArabic}
          />
        ))}
      </div>

      {/* Empty state */}
      {(!books || books.length === 0) && (
        <div className='py-8 text-center'>
          <p className='text-gray-500'>{t('noBooks')}</p>
        </div>
      )}
    </div>
  );
};

export default ShowAllBooks;
