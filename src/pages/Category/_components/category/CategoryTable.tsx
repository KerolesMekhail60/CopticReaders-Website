import CustomTable from '@/components/data-table/CustomTable';
import SearchBar from '@/components/data-table/SearchBar';
import TableStatistics from '@/components/data-table/TableStatistics';
import Pagination from '@/components/shared/pagination/Pagination';

import { columns } from './category-columns';
import CategoryDialog from './CategoryDialog';

import useDataTable from '@/hooks/useDataTable';

import { Category } from '@/types';

import { EMPTY_ARRAY } from '@/constants';

import categories from '@/data/category-data.json';
import useTranslations from '@/i18n/useTranslations';

const data = categories as unknown as Category[];

function CategoryTable() {
  const table = useDataTable(data || EMPTY_ARRAY, columns);
  const { t } = useTranslations();
  return (
    <>
      <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
        <div className='w-full'>
          <SearchBar
            placeholder={t('searchBar')}
            className='max-w-[500px]'
          />
        </div>
        <CategoryDialog />
      </div>
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
    </>
  );
}

export default CategoryTable;
