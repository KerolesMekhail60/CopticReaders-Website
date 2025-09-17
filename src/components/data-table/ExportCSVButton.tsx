import { FolderInput } from 'lucide-react';

import { type Table } from '@tanstack/react-table';

import useTranslations from '@/i18n/useTranslations';
import { exportTableToCSV } from '@/lib/export';

type ExportCSVButtonProps<TData> = { table: Table<TData>; filename: string };

function ExportCSVButton<TData>({
  table,
  filename,
}: ExportCSVButtonProps<TData>) {
  const { t } = useTranslations();
  return (
    <button
      className='flex cursor-pointer items-center gap-2 text-primary'
      onClick={() =>
        exportTableToCSV(table, {
          filename,
          excludeColumns: ['select', 'actions', 'actionType'],
        })
      }
    >
      {t('Export')}
      <FolderInput
        className='size-6'
        aria-hidden='true'
      />
    </button>
  );
}

export default ExportCSVButton;
