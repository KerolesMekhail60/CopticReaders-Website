'use client';

import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Filter } from 'lucide-react';

import Pagination from '@/components/shared/Pagination';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import BooksGrid from './BooksGrid';
import CategoriesSidebar from './CategoriesSidebar';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { Category, PaginatedBooksResponse } from '@/types';

type SearchParams = {
  CategoryIds?: string | string[];
  PageNumber?: string;
  PageSize?: string;
  Search?: string;
};

interface BooksClientProps {
  locale: string;
  initialBooks: PaginatedBooksResponse | null;
  categories: Category[];
  searchParams: SearchParams;
}

const BooksClient = ({
  locale,
  initialBooks,
  categories,
  searchParams,
}: BooksClientProps) => {
  const t = useTranslations('books');
  const router = useRouter();
  const searchParamsObj = useSearchParams();
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [loadingCategoryId, setLoadingCategoryId] = useState<string | null>(
    null,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isArabic = locale === 'ar';
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const currentPage = parseInt(searchParams?.PageNumber || '1');
  const totalPages = initialBooks?.totalPages || 1;
  const totalCount = initialBooks?.totalCount || 0;

  const handleCategoryClick = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParamsObj.toString());

    if (categoryId) {
      // Remove existing CategoryIds and add the new one
      params.delete('CategoryIds');
      params.append('CategoryIds', categoryId);
      setLoadingCategoryId(categoryId);
    } else {
      // Remove CategoryIds to show all books
      params.delete('CategoryIds');
      setLoadingCategoryId('all');
    }

    // Set loading state
    setIsCategoryLoading(true);

    // Reset to page 1 when filtering
    params.set('PageNumber', '1');

    router.push(`/${locale}/books?${params.toString()}`);

    // Close drawer on mobile after selection
    if (isMobile) {
      setDrawerOpen(false);
    }

    // Reset loading state after navigation
    setTimeout(() => {
      setIsCategoryLoading(false);
      setLoadingCategoryId(null);
    }, 1000);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParamsObj.toString());
    params.set('PageNumber', page.toString());
    router.push(`/${locale}/books?${params.toString()}`);
  };

  const selectedCategoryIds = searchParamsObj.getAll('CategoryIds');

  return (
    <section className='container mx-auto pb-8 pt-14'>
      {/* Mobile: Floating Button with Drawer */}
      {isMobile ? (
        <div className='relative'>
          {/* Main Content */}
          <main>
            <BooksGrid
              books={initialBooks?.result ?? []}
              locale={locale}
              isLoading={!initialBooks || isCategoryLoading}
            />

            {/* Pagination */}
            <div className='mt-8 flex justify-center'>
              <Pagination
                pageNumber={currentPage}
                totalCount={totalCount}
                totalPages={totalPages}
                pageSize={searchParams?.PageSize || '12'}
                locale={locale}
                onPageChange={handlePageChange}
              />
            </div>
          </main>

          {/* Floating Filter Button */}
          <div className='fixed bottom-6 right-6 z-50'>
            <Sheet
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant='default'
                  className='h-14 w-14 gap-2 rounded-full p-3 shadow-lg'
                >
                  <Filter className='h-6 w-6' />
                  <span className='sr-only'>{t('siteSections')}</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side='bottom'
                className='rounded-t-2xl'
              >
                <SheetHeader>
                  <SheetTitle>{t('siteSections')}</SheetTitle>
                </SheetHeader>

                <div className='mt-6'>
                  <CategoriesSidebar
                    categories={categories}
                    selectedCategoryIds={selectedCategoryIds}
                    onCategoryClick={handleCategoryClick}
                    totalBooksCount={totalCount}
                    isCategoryLoading={isCategoryLoading}
                    loadingCategoryId={loadingCategoryId}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      ) : (
        /* Desktop: Original Layout with Sidebar */
        <div
          className={`flex flex-col gap-8 lg:flex-row ${
            isArabic ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Categories Sidebar */}
          <aside className='w-full lg:w-80 lg:flex-shrink-0 rtl:hidden'>
            <CategoriesSidebar
              categories={categories}
              selectedCategoryIds={selectedCategoryIds}
              onCategoryClick={handleCategoryClick}
              totalBooksCount={totalCount}
              isCategoryLoading={isCategoryLoading}
              loadingCategoryId={loadingCategoryId}
            />
          </aside>

          {/* Main Content */}
          <main className='flex-1'>
            <BooksGrid
              books={initialBooks?.result ?? []}
              locale={locale}
              isLoading={!initialBooks || isCategoryLoading}
            />

            {/* Pagination - Only show if there are books and more than 1 page */}
            <div className='mt-8 flex justify-center'>
              <Pagination
                pageNumber={currentPage}
                totalCount={totalCount}
                totalPages={totalPages}
                pageSize={searchParams?.PageSize || '12'}
                locale={locale}
                onPageChange={handlePageChange}
              />
            </div>
          </main>
          <aside className='w-full lg:w-80 lg:flex-shrink-0 ltr:hidden'>
            <CategoriesSidebar
              categories={categories}
              selectedCategoryIds={selectedCategoryIds}
              onCategoryClick={handleCategoryClick}
              totalBooksCount={totalCount}
              isCategoryLoading={isCategoryLoading}
              loadingCategoryId={loadingCategoryId}
            />
          </aside>
        </div>
      )}
    </section>
  );
};

export default BooksClient;
