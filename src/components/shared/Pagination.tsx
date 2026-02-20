'use client';
import { useRouter } from 'next/navigation';

import ReactPaginate from 'react-paginate';

import { cn } from '@/lib/utils';

export const updateSearchParams = (key: string, value: string) => {
  const searchParams = new URLSearchParams(location.search);

  searchParams.set(key, value);

  const newPathname = `${location.pathname}?${searchParams.toString()}`;

  return newPathname;
};
type PaginationProps = {
  totalCount: number;
  pageSize?: string;
  pageNumber?: string | number;
  locale?: string;
  onPageChange?: (page: number) => void;
  totalPages?: number;
};

const linkStyles = 'size-10 flex items-center justify-center  bg-transparent';

const Pagination = ({
  pageNumber,
  locale,
  onPageChange,
  totalCount,
  pageSize,
  totalPages,
}: PaginationProps) => {
  const router = useRouter();

  const isArabic = locale === 'ar';
  const currentPageIndex = Math.max(0, parseInt(String(pageNumber || '1')) - 1);

  // Calculate total pages if not provided
  const pageSizeNum = parseInt(String(pageSize || '12'));
  const calculatedTotalPages =
    totalPages || Math.max(1, Math.ceil(totalCount / pageSizeNum));
  const pageCount = Math.max(1, calculatedTotalPages);

  const handlePageChange = ({ selected }: { selected: number }) => {
    const nextPageNumber = selected + 1;

    if (onPageChange) {
      onPageChange(nextPageNumber);
      return;
    }

    const newPathname = updateSearchParams('pageNumber', `${nextPageNumber}`);
    router.push(newPathname, { scroll: true });
  };

  return (
    <>
      <ReactPaginate
        previousLabel={isArabic ? 'السابق' : 'Previous'}
        nextLabel={isArabic ? 'التالي' : 'Next'}
        breakLabel='...'
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName='flex p-4 mx-auto items-center overflow-x-auto max-sm:max-w-xs max-w-fit gap-6'
        previousLinkClassName={cn(
          linkStyles,
          'w-fit text-primary-500 underline bg-transparent',
        )}
        nextLinkClassName={cn(
          linkStyles,
          'w-fit text-primary-500 underline bg-transparent',
        )}
        pageLinkClassName={linkStyles}
        disabledLinkClassName='cursor-default !bg-transparent text-grayish-900'
        activeLinkClassName=' rounded-xl !bg-primary-500 !text-white'
        breakClassName='px-2 py-4'
        initialPage={currentPageIndex}
        forcePage={currentPageIndex}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Pagination;
