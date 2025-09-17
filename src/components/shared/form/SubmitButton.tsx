import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import Spinner from '../loaders/Spinner';

import useTranslations from '@/i18n/useTranslations';
import { cn } from '@/lib/utils';

type SubmitButtonProps = {
  label?: string;
  className?: string;
  loading?: boolean;
};

const SubmitButton = ({ label, className, loading }: SubmitButtonProps) => {
  const { t } = useTranslations();
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Button
      type='submit'
      className={cn('w-full', className)}
    >
      {isSubmitting || loading ? <Spinner /> : label || t('Submit')}
    </Button>
  );
};

export default SubmitButton;
