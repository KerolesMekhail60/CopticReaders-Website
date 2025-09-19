import useTableSearchParams from '@/hooks/useTableSearchParams';

import useTranslations from '@/i18n/useTranslations';

type TableStatisticsProps = {
  totalCount?: number;
};

function TableStatistics({ totalCount }: TableStatisticsProps) {
  const { pageIndex, pageSize } = useTableSearchParams();
  const { t } = useTranslations();

  const start = (pageIndex - 1) * pageSize + 1;
  const end = Math.min(pageIndex * pageSize, totalCount || 0);

  return (
    <p className='text-sm text-muted-foreground'>
      {t('showing', { start, end, total: totalCount || 0 })}
    </p>
  );
}

export default TableStatistics;
