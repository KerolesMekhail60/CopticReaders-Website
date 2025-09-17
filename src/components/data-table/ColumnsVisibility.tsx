import { ArrowLeftRight } from 'lucide-react';

import { type Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import useTranslations from '@/i18n/useTranslations';

type ColumnsVisibiltyProps<TData> = {
  table: Table<TData>;
};

function ColumnsVisibility<TData>({ table }: ColumnsVisibiltyProps<TData>) {
  const { t } = useTranslations('forms.buttonLabels');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='flex text-xs shadow-sm rtl:flex-row-reverse'
        >
          <ArrowLeftRight className='mr-2 h-4 w-4' />
          {t('view')}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id.split(/(?=[A-Z])/).join(' ')}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ColumnsVisibility;
