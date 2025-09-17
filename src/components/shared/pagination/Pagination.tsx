import ReactPaginate from 'react-paginate';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { updateSearchParams } from '@/utils';

type PaginationProps = {
  fieldName?: string;
  totalCount: number;
};

const Pagination = ({
  fieldName = 'pageIndex',
  totalCount,
}: PaginationProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const pageIndex = Number(searchParams.get(fieldName)) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const totalPages = Math.ceil((totalCount || 1) / pageSize);

  return (
    <ReactPaginate
      forcePage={Number(pageIndex) === 0 ? 0 : Number(pageIndex) - 1}
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
      containerClassName='flex justify-start p-4 mx-auto items-center overflow-x-auto max-sm:max-w-xs max-lg:max-w-md gap-2'
      previousLinkClassName='p-2 hover:text-primary transition-colors'
      nextLinkClassName='p-2 hover:text-primary transition-colors'
      pageLinkClassName='w-10 h-10 flex justify-center items-center rounded-lg text-neutral-500 hover:bg-primary-50 hover:text-primary transition-colors'
      disabledLinkClassName='cursor-default opacity-70 hover:!text-foreground'
      activeLinkClassName='!text-white bg-primary hover:!bg-primary hover:text-white'
      breakClassName='px-2 py-4'
      onPageChange={({ selected }) => {
        const newPathName = updateSearchParams(fieldName, `${selected + 1}`);

        navigate(newPathName);
      }}
    />
  );
};

export default Pagination;
