'use client';



import QuoteCard from './QuoteCard';

import { QuotesResult } from '@/types';

const QUOTE_SKELETON_ITEMS = [1, 2];

const QuoteCardsSkeleton = () => (
  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
    {QUOTE_SKELETON_ITEMS.map((item) => (
      <div
        key={item}
        className='animate-pulse space-y-3 rounded-2xl border border-dashed border-secondary-200 bg-white p-6 shadow-sm'
      >
        <div className='h-4 w-1/3 rounded-full bg-gray-200' />
        <div className='h-3 w-full rounded bg-gray-100' />
        <div className='h-3 w-3/4 rounded bg-gray-100' />
        <div className='h-3 w-2/3 rounded bg-gray-100' />
      </div>
    ))}
  </div>
);

type QuoteListProps = {
  quotes?: QuotesResult | null;
  locale: string;
};

const QuoteList = ({
  quotes,
  locale,
}: QuoteListProps) => {
  const isArabic = locale === 'ar';
  const hasQuotes = (quotes?.result?.length ?? 0) > 0;


  return (
    <div className='container mx-auto my-14 space-y-6'>
      <h2 className='text-2xl font-bold'>
        {isArabic ? 'نور من الكلمات' : 'Light from the Words'}
      </h2>

      {quotes?.result && quotes?.result.length === 0 ? (
        <QuoteCardsSkeleton />
      ) : (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {quotes?.result?.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
            />
          ))}

          {!hasQuotes && (
            <div className='col-span-full rounded-xl border border-dashed border-secondary-200 p-6 text-center text-muted-foreground'>
              {isArabic
                ? 'لا توجد اقتباسات متاحة الآن'
                : 'No quotes available now'}
            </div>
          )}
        </div>
      )}


    </div>
  );
};

export default QuoteList;
