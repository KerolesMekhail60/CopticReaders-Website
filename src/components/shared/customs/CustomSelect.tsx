'use client';

import { useLocale } from 'next-intl';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';

type CustomSelectProps = {
  fieldName: string;
  label?: string;
  placeholder: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  className?: string;
  formItemClassName?: string;
};

function CustomSelect({
  fieldName,
  label,
  placeholder,
  options,
  disabled = false,
  className = '',
  formItemClassName = '',
}: CustomSelectProps) {
  const form = useFormContext();
  const { isSubmitting } = form.formState;
  const locale = useLocale();
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
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={isSubmitting || disabled}
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  'h-[53px] rounded-2xl bg-white hover:bg-neutral-100',
                  className,
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  className={cn(locale === 'ar' ? 'text-right' : 'text-left')}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomSelect;
