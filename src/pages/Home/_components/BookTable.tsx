import CustomTable from '@/components/data-table/CustomTable';
import TableStatistics from '@/components/data-table/TableStatistics';
import Pagination from '@/components/shared/pagination/Pagination';

import { columns } from './book-columns';

import useDataTable from '@/hooks/useDataTable';

import { BookType } from '@/types';

import { EMPTY_ARRAY } from '@/constants';

import bookData from '@/data/book-data.json';

const data = bookData as unknown as BookType[];

function BookTable() {
  const table = useDataTable(data || EMPTY_ARRAY, columns);

  return (
    <div className='mt-8'>
      {/* <div style={{ opacity: isPlaceholderData ? '50%' : '100%' }}> */}
      <div>
        <CustomTable
          table={table}
          columnsLength={columns.length}
        />
      </div>

      <div className='flex flex-col items-center gap-3 py-4 md:flex-row md:justify-between'>
        <TableStatistics totalCount={1} />

        <div>
          <Pagination totalCount={1} />
        </div>
      </div>
    </div>
  );
}

export default BookTable;
