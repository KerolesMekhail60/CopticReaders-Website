import { useSearchParams } from 'react-router-dom';

import useTranslations from '@/i18n/useTranslations';

const BookFilter = () => {
  const { t } = useTranslations();
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParam = (key: string, value: string) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  const resetParams = () => {
    setSearchParams({});
  };

  return (
    <div className='rounded-2xl border border-[#CACCCC] bg-card px-6 py-4'>
      <div className='flex flex-wrap items-end gap-6'>
        {/* Search Bar */}
        <div className='flex flex-col space-y-1'>
          <label className='text-sm font-medium'>
            {t('filters.bookIdName')}
          </label>
          <input
            type='text'
            placeholder={t('filters.searchByBookIdName')}
            className='h-9 w-60 rounded-md border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary'
            value={searchParams.get('searchValue') || ''}
            onChange={(e) => updateParam('searchValue', e.target.value)}
          />
        </div>

        {/* Publish Year */}
        <div className='flex flex-col space-y-1'>
          <label className='text-sm font-medium'>
            {t('filters.publishYear')}
          </label>
          <input
            type='number'
            placeholder={t('filters.selectPublishYear')}
            className='h-9 w-44 rounded-md border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary'
            value={searchParams.get('publishYear') || ''}
            onChange={(e) => updateParam('publishYear', e.target.value)}
          />
        </div>

        {/* Author */}
        <div className='flex flex-col space-y-1'>
          <label className='text-sm font-medium'>{t('filters.authors')}</label>
          <select
            className='h-9 w-44 rounded-md border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary'
            value={searchParams.get('author') || ''}
            onChange={(e) => updateParam('author', e.target.value)}
          >
            <option value=''>{t('filters.all')}</option>
            <option value='1'>Peter Awad</option>
          </select>
        </div>

        {/* Added Date */}
        <div className='flex flex-col space-y-1'>
          <label className='text-sm font-medium'>
            {t('filters.addedDate')}
          </label>
          <input
            type='date'
            className='h-9 w-48 rounded-md border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary'
            value={searchParams.get('addedDate') || ''}
            onChange={(e) => updateParam('addedDate', e.target.value)}
          />
        </div>

        {/* Category */}
        <div className='flex flex-col space-y-1'>
          <label className='text-sm font-medium'>{t('filters.category')}</label>
          <select
            className='h-9 w-44 rounded-md border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary'
            value={searchParams.get('category') || ''}
            onChange={(e) => updateParam('category', e.target.value)}
          >
            <option value=''>{t('filters.all')}</option>
            <option value='1'>Bible</option>
          </select>
        </div>

        {/* Status */}
        <div className='flex flex-col space-y-1'>
          <label className='text-sm font-medium'>{t('filters.status')}</label>
          <select
            className='h-9 w-44 rounded-md border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary'
            value={searchParams.get('status') || ''}
            onChange={(e) => updateParam('status', e.target.value)}
          >
            <option value=''>{t('filters.all')}</option>
            <option value='1'>{t('filters.active')}</option>
            <option value='2'>{t('filters.inactive')}</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className='flex flex-col space-y-1'>
          <label className='invisible text-sm font-medium'>
            {t('filters.reset')}
          </label>
          <button
            onClick={resetParams}
            className='h-9 rounded-md border px-4 text-sm font-medium hover:bg-gray-100'
          >
            {t('filters.reset')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookFilter;
