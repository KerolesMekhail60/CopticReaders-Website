import useTableSearchParams from '@/hooks/useTableSearchParams';

import useTranslations from '@/i18n/useTranslations';

type TableStatisticsProps = {
  totalCount?: number;
};

function TableStatistics({ totalCount }: TableStatisticsProps) {
  const { pageIndex, pageSize } = useTableSearchParams();
  const { t } = useTranslations('tables');

  const totalShowing =
    pageSize * pageIndex > Number(totalCount || 0)
      ? totalCount
      : pageSize * pageIndex;

  return (
    <p className='text-sm text-muted-foreground'>
      {t('showing', {
        count: totalShowing || 0,
        total: totalCount || pageSize,
      })}
    </p>
  );
}

export default TableStatistics;
