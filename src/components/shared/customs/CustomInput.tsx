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
  trailing?: React.ReactNode;
};

function CustomInput({
  fieldName,
  label,
  placeholder,
  type = 'text',
  className = '',
  formItemClassName = '',
  disabled = false,
  isNumberAsAString = false,
  trailing,
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
        <FormItem className={formItemClassName}>
          {label && (
            <FormLabel className='text-base font-bold text-primary-500'>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <div className='relative flex items-center'>
              <Input
                dir={`${type === 'email' ? 'ltr' : ''}`}
                placeholder={placeholder}
                type={type}
                disabled={isSubmitting || disabled}
                className={cn(
                  'h-[53px] rounded-2xl bg-white p-4 hover:bg-neutral-100',
                  trailing ? 'pr-20' : '',
                  className,
                )}
                {...field}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(event, field)
                }
              />
              {trailing && (
                <div className='absolute end-2 top-1/2 -translate-y-1/2'>
                  {trailing}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomInput;
