import useLocale from '@/i18n/useLocale';

const TableAgeCell = ({ age }: { age: number }) => {
  const { isEnglish } = useLocale();

  return age === 0 ? (
    isEnglish ? (
      <p>Less than 1 year</p>
    ) : (
      <p>أقل من سنة واحدة</p>
    )
  ) : isEnglish ? (
    <p>{age} Years</p>
  ) : (
    <p>{age} سنة</p>
  );
};

export default TableAgeCell;
