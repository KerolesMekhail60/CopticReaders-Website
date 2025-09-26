import PageHeading from '@/components/shared/PageHeading';

import CategoryTabs from './CategoryTabs';

import useTranslations from '@/i18n/useTranslations';

const Category = () => {
  const { t } = useTranslations();
  return (
    <>
      <div className='mb-6'>
        <PageHeading text={t('titleCategories')} />
      </div>
      <CategoryTabs />
    </>
  );
};

export default Category;
