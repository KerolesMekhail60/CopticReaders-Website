import { useFormContext } from 'react-hook-form';

import { DatetimePicker } from '@/components/ui/datetime-picker';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { cn } from '@/lib/utils';

type CustomDatetimePickerProps = {
  fieldName: string;
  label: string;
  className?: string;
};

const CustomDatetimePicker = ({
  fieldName,
  label,
  className,
}: CustomDatetimePickerProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)}>
          <FormLabel>{label}</FormLabel>
          <DatetimePicker
            {...field}
            format={[
              ['months', 'days', 'years'],
              ['hours', 'minutes', 'am/pm'],
            ]}
          />

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomDatetimePicker;
