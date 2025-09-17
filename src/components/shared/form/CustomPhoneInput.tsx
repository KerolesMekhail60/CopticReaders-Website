import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input';

type CustomPhoneInputProps = {
  fieldName: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

const CustomPhoneInput = ({
  fieldName,
  disabled = false,
  label,
  placeholder = '',
}: CustomPhoneInputProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.formState;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className='flex flex-col items-start'>
          <FormLabel>{label}</FormLabel>
          <FormControl className='w-full'>
            <PhoneInput
              placeholder={placeholder}
              {...field}
              defaultCountry='IT'
              disabled={isSubmitting || disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomPhoneInput;
