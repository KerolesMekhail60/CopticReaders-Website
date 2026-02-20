import { useState } from 'react';

import { useLocale } from 'next-intl';

import { Eye, EyeOff } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

type PasswordInput = {
  fieldName: string;
  label: string;
  placeholder: string;

  form: UseFormReturn<any>;
  disabled?: boolean;
};

function PasswordInput({
  fieldName,
  label,
  placeholder,
  form,
  disabled = false,
}: PasswordInput) {
  const [showPassword, setShowPassword] = useState(false);
  const locale = useLocale();
  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }
  const dir = locale === 'en' ? 'ltr' : 'rtl';
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem
          className='group relative'
          dir={dir}
        >
          <FormLabel
            className={cn(
              'absolute start-2 z-[2] -translate-y-1/2 bg-[#FEF7FF] px-1 text-xs capitalize group-focus-within:text-primary rtl:end-auto',
              disabled && 'text-ls-primary-1700 bg-white',
            )}
          >
            {label}
          </FormLabel>

          <FormControl>
            <div className='relative'>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                className='border-ls-primary-1700 !mt-0 h-fit rounded-lg border p-3 pe-10 text-sm leading-6 focus-visible:border-primary focus-visible:ring-offset-0 xs:p-4 xs:text-base'
                disabled={disabled}
                dir={dir}
                {...field}
              />

              <div className='absolute inset-y-0 end-3 start-auto flex items-center rtl:end-3'>
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='flex items-center justify-center text-gray-500'
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default PasswordInput;
