import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

type CustomInputProps = {
  fieldName: string;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
  formItemClassName?: string;
  disabled?: boolean;
  isNumberAsAString?: boolean;
};

function CustomInput({
  fieldName,
  label,
  placeholder,
  type = 'text',
  className = '',
  formItemClassName = '',
  disabled = false,
  isNumberAsAString,
}: CustomInputProps) {
  const form = useFormContext();
  const { isSubmitting } = form.formState;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={formItemClassName}>
          <FormLabel className='text-sm font-semibold text-neutral-900'>
            {label}
          </FormLabel>

          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              disabled={isSubmitting || disabled}
              className={cn(
                'h-[53px] border border-neutral-100 bg-neutral-10 placeholder:text-neutral-400',
                className,
              )}
              {...field}
              onChange={(event) => {
                const inputValue = event.target.value;

                if (type === 'number') {
                  field.onChange(+inputValue);
                  return;
                }

                if (isNumberAsAString) {
                  if (!/^\d*$/.test(inputValue)) return;
                }

                field.onChange(event.target.value);
              }}
              style={{
                scrollbarGutter: 'stable',
              }}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomInput;
