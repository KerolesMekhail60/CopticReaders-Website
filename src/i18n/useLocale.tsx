import { useTranslation } from 'react-i18next';

const useLocale = () => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.resolvedLanguage === 'en';

  return { locale: i18n.resolvedLanguage || 'en', isEnglish };
};

export default useLocale;
