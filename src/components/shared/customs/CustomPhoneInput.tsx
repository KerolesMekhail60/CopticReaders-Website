//import { useLocale } from 'next-intl';

import { useLocale } from 'next-intl';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input';

import { cn } from '@/lib/utils';

type CustomPhoneInputProps = {
  fieldName: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

const CustomPhoneInput = ({
  fieldName,
  disabled = false,
  label,
  placeholder = '',
  className,
}: CustomPhoneInputProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.formState;
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className='flex flex-col items-start'>
          {label && (
            <FormLabel className='text-base font-bold text-grayish-50'>
              {label}
            </FormLabel>
          )}
          <FormControl className='w-full'>
            <PhoneInput
              placeholder={placeholder}
              {...field}
              defaultCountry='EG'
              disabled={isSubmitting || disabled}
              className={cn(
                'rounded-2xl bg-white hover:bg-neutral-100',
                className,
              )}
              dir={isArabic ? 'rtl' : 'ltr'}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomPhoneInput;
