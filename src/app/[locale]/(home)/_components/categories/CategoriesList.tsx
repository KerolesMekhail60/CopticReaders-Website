import React from 'react';

import Link from 'next/link';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import CategoryCard from './CategoryCard';

import { Category } from '@/types';

const CategoriesList = ({
  categories,
  locale,
}: {
  categories: Category[];
  locale: string;
}) => {
  const isArabic = locale === 'ar';

  const mobileCount = 2;
  const tabletCount = 4;
  const desktopCount = 4;
  const desktopCountXl = 6;
  const desktopCount2Xl = 7;

  return (
    <div className='container mx-auto my-14 space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>
          {isArabic ? 'تصنيفات الكتب' : 'Book Categories'}
        </h2>

        <Link
          href={`${locale}/books`}
          className='flex items-center gap-2 text-xl font-bold text-secondary-600'
        >
          <p>{isArabic ? 'عرض الكل' : 'Show All'}</p>
          {!isArabic && <ChevronRight />}
          {isArabic && <ChevronLeft />}
        </Link>
      </div>

      <div className='flex flex-wrap gap-4 md:hidden'>
        {categories.slice(0, mobileCount).map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>

      <div className='hidden flex-wrap gap-6 md:flex lg:hidden'>
        {categories.slice(0, tabletCount).map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>

      <div className='hidden flex-wrap gap-11 lg:flex xl:hidden'>
        {categories.slice(0, desktopCount).map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>
      <div className='hidden flex-wrap gap-11 xl:flex 2xl:hidden'>
        {categories.slice(0, desktopCountXl).map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>
      <div className='hidden flex-wrap gap-11 2xl:flex'>
        {categories.slice(0, desktopCount2Xl).map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
