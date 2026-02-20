'use client';

import { useTranslations } from 'next-intl';

import { BookCardsSkeleton } from '@/components/shared/BookCardsSkeleton';

import BookList from './AllBooks/BookList';
import CategoriesList from './categories/CategoriesList';
import Filter from './filter/Filter';
import QuoteList from './quotes/QuoteList';
import HeroSection from './HeroSection';

import useFilter from '@/hooks/useFilter';

import { Author, BookType, Category, QuotesResult } from '@/types';
import { QueryParams } from '@/types/global';

type HomeClientProps = {
  locale: string;
  categories: Category[];
  recentBooks: BookType[];
  initialQuotes: QuotesResult | null;
  authors: Author[];
  famousBooks: BookType[];
  HolyBook: BookType[];
  searchParams?: QueryParams;
};

const HomeClient = ({
  locale,
  categories,
  recentBooks,
  initialQuotes,
  authors,
  famousBooks,
  HolyBook,
  searchParams,
}: HomeClientProps) => {
  const t = useTranslations('books');
  const { form, handleFilteration, handleReset, isPending } =
    useFilter(searchParams);
  const isRecentLoading = recentBooks === null || isPending;
  const isFamousLoading = famousBooks === null;
  const isHolyLoading = HolyBook === null;

  return (
    <section>
      <HeroSection locale={locale} />
      <Filter
        authors={authors}
        categories={categories}
        form={form}
        handleFilteration={handleFilteration}
        handleReset={handleReset}
        isPending={isPending}
      />
      <div className='relative'>
        <CategoriesList
          categories={categories}
          locale={locale}
        />
      </div>

      <div className='relative min-h-[200px]'>
        {isRecentLoading ? (
          <BookCardsSkeleton />
        ) : (
          <BookList
            books={recentBooks}
            locale={locale}
            label={t('recentBooks')}
            className='container mx-auto'
          />
        )}
      </div>

      <div className='relative min-h-[200px]'>
        {isFamousLoading ? (
          <BookCardsSkeleton />
        ) : (
          <BookList
            books={famousBooks}
            locale={locale}
            label={t('popularBooks')}
            className='container mx-auto'
          />
        )}
      </div>

      <QuoteList
        quotes={initialQuotes ?? null}
        locale={locale}
      />

      <div className='relative min-h-[200px]'>
        {isHolyLoading ? (
          <BookCardsSkeleton />
        ) : (
          <BookList
            books={HolyBook}
            locale={locale}
            label={t('holyBible')}
            className='container mx-auto'
          />
        )}
      </div>
    </section>
  );
};

export default HomeClient;
