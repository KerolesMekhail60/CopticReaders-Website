import { useTranslation } from 'react-i18next';

const useTranslations = (key: string = '') => {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: key,
    useSuspense: false,
  });

  const dir = i18n.dir(i18n.resolvedLanguage);

  return { t, i18n, dir };
};

export default useTranslations;
