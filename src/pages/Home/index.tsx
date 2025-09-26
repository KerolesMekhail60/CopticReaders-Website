import PageHeading from '@/components/shared/PageHeading';

import BookDialog from './_components/add-book/BookDialog';
import BookMangent from './_components/BookMangent';
import ImportButton from './_components/ImportButton';

import useTranslations from '@/i18n/useTranslations';

const Home = () => {
  const { t } = useTranslations();
  return (
    <>
      <div className='mb-6 flex items-start justify-between'>
        <PageHeading text={t('title.BookManagement')} />
        <div className='flex items-center gap-2'>
          <ImportButton />
          <BookDialog />
        </div>
      </div>
      <BookMangent />
    </>
  );
};

export default Home;
