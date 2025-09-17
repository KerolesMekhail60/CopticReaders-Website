import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';

type CustomPasswordInputProps = {
  fieldName: string;
  label: string;
  placeholder: string;
  className?: string;
  disabled?: boolean;
};

function CustomPasswordInput({
  fieldName,
  label,
  placeholder,
  className = '',
  disabled = false,
}: CustomPasswordInputProps) {
  const form = useFormContext();
  const { isSubmitting } = form.formState;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className='text-sm font-semibold text-neutral-900'>
            {label}
          </FormLabel>
          <FormControl>
            <PasswordInput
              className='h-[53px] border border-neutral-100 bg-neutral-10 placeholder:text-neutral-400'
              placeholder={placeholder}
              disabled={isSubmitting || disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomPasswordInput;
