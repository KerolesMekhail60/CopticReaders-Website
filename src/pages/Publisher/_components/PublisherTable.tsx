import { useTranslation } from 'react-i18next';

import CustomTable from '@/components/data-table/CustomTable';
import SearchBar from '@/components/data-table/SearchBar';
import TableStatistics from '@/components/data-table/TableStatistics';
import Pagination from '@/components/shared/pagination/Pagination';

import PublisherDialog from './add-publisher/PublisherDialog';
import { columns } from './publisher-columns';

import useDataTable from '@/hooks/useDataTable';

import { Publisher } from '@/types';

import { EMPTY_ARRAY } from '@/constants';

import publishers from '@/data/publisher-data.json';

const data = publishers as unknown as Publisher[];

function PublisherTable() {
  const table = useDataTable(data || EMPTY_ARRAY, columns);
  const { t } = useTranslation();
  return (
    <>
      <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
        <div className='w-full'>
          <SearchBar
            placeholder={t('searchBar')}
            className='max-w-[500px]'
          />
        </div>
        <PublisherDialog />
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

export default PublisherTable;
