import PageHeading from '@/components/shared/PageHeading';

import PublisherTable from './_components/PublisherTable';

import useTranslations from '@/i18n/useTranslations';

const Publisher = () => {
  const { t } = useTranslations();
  return (
    <>
      <div className='mb-6'>
        <PageHeading text={t('title.Publisher')} />
      </div>
      <PublisherTable />
    </>
  );
};

export default Publisher;
