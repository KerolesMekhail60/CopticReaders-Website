import PageHeading from '@/components/shared/PageHeading';

import AuthorTable from './_components/AuthorTable';

import useTranslations from '@/i18n/useTranslations';

const Author = () => {
  const { t } = useTranslations();
  return (
    <>
      <div className='mb-6 flex items-start justify-between'>
        <PageHeading text={t('titleAuthors')} />
      </div>
      <AuthorTable />
    </>
  );
};

export default Author;
