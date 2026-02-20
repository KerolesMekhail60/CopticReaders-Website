'use client';
import { useEffect } from 'react';

import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';

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
  label?: string;
  placeholder: string;
  type?: string;
  className?: string;
  formItemClassName?: string;
  disabled?: boolean;
  isNumberAsAString?: boolean;
};

function CustomEmail({
  fieldName,
  label,
  placeholder,
  type = 'text',
  className = '',
  formItemClassName = '',
  disabled = false,
  isNumberAsAString = false,
}: CustomInputProps) {
  const form = useFormContext();
  const { isSubmitting } = form.formState;

  // Prevent wheel event on number inputs
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if ((event.target as HTMLInputElement).type === 'number') {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Handle input change based on type
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>,
  ) => {
    const inputValue = event.target.value;

    if (type === 'number') {
      field.onChange(+inputValue);
      return;
    }

    if (isNumberAsAString && !/^\d*$/.test(inputValue)) {
      return;
    }

    field.onChange(inputValue);
  };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={cn('group relative', formItemClassName)}>
          <FormControl>
            <div className='relative'>
              <Input
                placeholder={placeholder}
                type={type}
                disabled={isSubmitting || disabled}
                className={cn(
                  'border-ls-primary-1700 !mt-0 h-fit rounded-lg border p-3 text-sm leading-6 focus-visible:border-primary focus-visible:ring-offset-0 xs:p-4 xs:text-base',
                  className,
                )}
                {...field}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event, field)
                }
              />

              {label && (
                <FormLabel
                  className={cn(
                    'absolute start-2 top-0 z-[2] -translate-y-1/2 bg-[#FEF7FF] px-1 text-xs capitalize text-primary-500 transition-all group-focus-within:text-primary',
                    disabled && 'text-ls-primary-1700 bg-white',
                  )}
                >
                  {label}
                </FormLabel>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomEmail;
