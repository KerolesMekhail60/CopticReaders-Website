import { useSearchParams } from 'react-router-dom';

import { type Table } from '@tanstack/react-table';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import useTranslations from '@/i18n/useTranslations';
type ShowRowsSelectProps<TData> = {
  table: Table<TData>;
};

function ShowRowsSelect<TData>({ table }: ShowRowsSelectProps<TData>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = searchParams.get('pageSize') || '10';
  const { t } = useTranslations('tables');

  return (
    <div className='flex items-center gap-2'>
      <span className='text-sm'>{t('rowsPerPage')}</span>

      <Select
        onValueChange={(value) => {
          table.setPageSize(Number(value));
          const params = new URLSearchParams(searchParams);
          params.set('pageSize', value);
          params.set('pageIndex', '1');
          setSearchParams(params);
        }}
      >
        <SelectTrigger className='h-8 w-[70px] justify-between'>
          <SelectValue
            asChild
            placeholder={pageSize}
          >
            <span>{pageSize}</span>
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {['10', '20', '30', '40', '50'].map((pageSize) => (
            <SelectItem
              key={pageSize}
              value={pageSize}
            >
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default ShowRowsSelect;
