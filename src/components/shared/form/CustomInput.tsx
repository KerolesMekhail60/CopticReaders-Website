import { useEffect } from 'react';

import {
  // ControllerRenderProps,
  // FieldValues,
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

import useLocale from '@/i18n/useLocale';
import { cn } from '@/lib/utils';

type CustomInputProps = {
  fieldName: string;
  label?: string;
  subLable?: string;
  placeholder: string;
  type?: string;
  className?: string;
  formItemClassName?: string;
  disabled?: boolean;
  isNumberAsAString?: boolean;
  optional?: boolean;
};

function CustomInput({
  fieldName,
  optional,
  label,
  subLable,
  placeholder,
  type = 'text',
  className = '',
  formItemClassName = '',
  disabled = false,
  isNumberAsAString = false,
}: CustomInputProps) {
  const form = useFormContext();
  const { isSubmitting } = form.formState;
  const { isEnglish } = useLocale();
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
  // const handleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   field: ControllerRenderProps<FieldValues, string>,
  // ) => {
  //   const inputValue = event.target.value;

  //   if (type === 'number') {
  //     field.onChange(+inputValue);
  //     return;
  //   }

  //   if (isNumberAsAString && !/^\d*$/.test(inputValue)) {
  //     return;
  //   }

  //   field.onChange(inputValue);
  // };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={formItemClassName}>
          {label && (
            <FormLabel className='text-start text-sm'>
              {label}{' '}
              {optional && (
                <span className='text-sm font-normal italic text-neutral-400'>
                  {isEnglish ? '(optional)' : '(اختيارى)'}
                </span>
              )}
              {subLable && (
                <span className='text-xs font-normal text-neutral-400'>
                  {subLable}
                </span>
              )}
            </FormLabel>
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              disabled={isSubmitting || disabled}
              className={cn(
                'h-[53px] rounded-2xl bg-neutral-10 p-4 placeholder:text-neutral-400',
                className,
              )}
              {...field}
              onChange={(event) => {
                const inputValue = event.target.value;

                if (type === 'number') {
                  field.onChange(inputValue === '' ? '' : +inputValue);
                  return;
                }

                if (isNumberAsAString) {
                  if (!/^\d*$/.test(inputValue)) return;
                }

                field.onChange(inputValue);
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
