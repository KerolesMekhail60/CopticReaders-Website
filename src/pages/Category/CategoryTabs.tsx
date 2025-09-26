import { useSearchParams } from 'react-router-dom';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import CategoryTable from './_components/category/CategoryTable';
import SubCategoryTable from './_components/subcategory/SubCategoryTable';

import useTranslations from '@/i18n/useTranslations';

const CategoryTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 'category';

  const { t, dir } = useTranslations();
  return (
    <Tabs
      defaultValue={page}
      onValueChange={(value) => {
        const params = new URLSearchParams();
        params.set('page', value);

        setSearchParams(params);
      }}
      dir={dir}
    >
      <TabsList className='mb-6 flex justify-start gap-4 bg-secondary-50'>
        <TabsTrigger
          value='category'
          className='rounded-b-none rounded-t-lg px-3 py-4 text-secondary-900 hover:bg-primary-50 hover:text-primary-400 data-[state=active]:bg-primary-500 data-[state=active]:text-primary-50'
        >
          {t('Categories')}
        </TabsTrigger>

        <TabsTrigger
          value='sub-category'
          className='rounded-b-none rounded-t-lg px-3 py-4 text-secondary-900 hover:bg-primary-50 hover:text-primary-400 data-[state=active]:bg-primary-500 data-[state=active]:text-primary-50'
        >
          {t('Sub Categories')}
        </TabsTrigger>
      </TabsList>

      <TabsContent value='category'>
        <CategoryTable />
      </TabsContent>

      <TabsContent value='sub-category'>
        <SubCategoryTable />
      </TabsContent>
    </Tabs>
  );
};
export default CategoryTabs;
