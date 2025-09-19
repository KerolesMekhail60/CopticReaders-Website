import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

import useLocale from '@/i18n/useLocale';

type TableDateLngProps = {
  date: string;
  time?: boolean;
};

const TableDateLng = ({ date, time = false }: TableDateLngProps) => {
  const { isEnglish } = useLocale();
  const parsedDate = new Date(date);

  const formattedDate = format(parsedDate, 'd MMM yyyy', {
    locale: isEnglish ? undefined : ar,
  });

  const formattedTime = format(parsedDate, 'h:mm a', {
    locale: isEnglish ? undefined : ar,
  });

  return (
    <>
      <p>{formattedDate}</p>
      <p>{time && `${formattedTime}`}</p>
    </>
  );
};

export default TableDateLng;
