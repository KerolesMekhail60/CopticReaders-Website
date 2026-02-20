'use client';

import { useTranslations } from 'next-intl';

import Spinner from '@/components/shared/loaders/Spinner';

import { Category } from '@/types';

import { cn } from '@/lib/utils';

interface CategoriesSidebarProps {
  categories: Category[];
  selectedCategoryIds: string[];
  onCategoryClick: (categoryId: string | null) => void;
  totalBooksCount: number;
  isCategoryLoading?: boolean;
  loadingCategoryId?: string | null;
}

const CategoriesSidebar = ({
  categories,
  selectedCategoryIds,
  onCategoryClick,
  totalBooksCount,
  isCategoryLoading = false,
  loadingCategoryId = null,
}: CategoriesSidebarProps) => {
  console.log("🚀 ~ CategoriesSidebar ~ categories:", categories)

  const t = useTranslations('books');

  // Calculate total books count (sum of all categories + handle subcategories)
  const calculateTotalCount = () => {
    return categories.reduce((total, category) => {
      const categoryCount = (category as any).booksCount || 0;
      return total + categoryCount;
    }, 0);
  };

  const allBooksCount = totalBooksCount || calculateTotalCount();

  return (
    <div className='rounded-lg bg-[#F5F5F0] p-6'>
      <h2 className='mb-6 text-xl font-bold text-gray-800'>
        {t('siteSections')}
      </h2>

      <ul className='space-y-2'>
        {/* All Books Option */}
        <li>
          <button
            onClick={() => onCategoryClick(null)}
            className={cn(
              'w-full rounded-md px-4 py-2 text-start text-sm transition-colors hover:bg-white/50',
              selectedCategoryIds.length === 0
                ? 'bg-white font-semibold text-primary-600'
                : 'text-gray-700 hover:text-gray-900',
              'disabled:opacity-70',
            )}
            disabled={isCategoryLoading && loadingCategoryId === 'all'}
          >
            <span className='flex items-center justify-between'>
              <span className='flex items-center gap-2'>
                {isCategoryLoading && loadingCategoryId === 'all' && (
                  <Spinner size={16} />
                )}
                <span>{t('all')}</span>
              </span>
              <span className='text-gray-500'>({allBooksCount})</span>
            </span>
          </button>
        </li>

        {/* Category List */}
        {categories.map((category) => {
          const categoryId = category.id || '';
          const isSelected = selectedCategoryIds.includes(categoryId);
          const booksCount = (category as any).booksCount || 0;
          const isLoadingCategory =
            isCategoryLoading && loadingCategoryId === categoryId;

          return (
            <li key={categoryId}>
              <button
                onClick={() => onCategoryClick(categoryId)}
                className={cn(
                  'w-full rounded-md px-4 py-2 text-start text-sm transition-colors hover:bg-white/50',
                  isSelected
                    ? 'bg-white font-semibold text-primary-600'
                    : 'text-gray-700 hover:text-gray-900',
                  'disabled:opacity-70',
                )}
                disabled={isLoadingCategory}
              >
                <span className='flex items-center justify-between'>
                  <span className='flex items-center gap-2'>
                    {isLoadingCategory && <Spinner size={16} />}
                    <span>
                      {category.name || category.nameAr || category.nameEn}
                    </span>
                  </span>
                  <span className='text-gray-500'>({booksCount})</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesSidebar;
