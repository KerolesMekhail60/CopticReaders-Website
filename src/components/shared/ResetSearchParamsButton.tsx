import { useSearchParams } from 'react-router-dom';

import useTranslations from '@/i18n/useTranslations';

const ResetSearchParamsButton = () => {
  const [_, setSearchParams] = useSearchParams();
  const { t } = useTranslations();
  return (
    <button
      className='text-primary-500'
      onClick={() => {
        const newParams = new URLSearchParams();
        setSearchParams(newParams);
      }}
    >
      {t('Reset')}
    </button>
  );
};

export default ResetSearchParamsButton;
