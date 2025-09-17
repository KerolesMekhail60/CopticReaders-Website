import useTranslations from './useTranslations';

const Localized = ({ text, options = {} }: { text: string; options?: any }) => {
  const { t } = useTranslations();
  return <>{t(text, options)}</>;
};

export default Localized;
