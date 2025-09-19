import useLocale from '@/i18n/useLocale';

const TableTextCell = ({
  textEn,
  textAr,
}: {
  textEn?: string;
  textAr?: string;
}) => {
  const { isEnglish } = useLocale();
  return <p>{isEnglish ? textEn : textAr}</p>;
};

export default TableTextCell;
