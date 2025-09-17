import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';

type CustomTextarea = {
  fieldName: string;
  label: string;
  placeholder: string;
  className?: string;
  disabled?: boolean;
};

function CustomTextarea({
  fieldName,
  label = '',
  placeholder = '',
  className = '',
  disabled = false,
}: CustomTextarea) {
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
            <Textarea
              placeholder={placeholder}
              className={cn(
                'h-[53px] border border-neutral-100 bg-neutral-10 placeholder:text-neutral-400',
                'resize-none',
              )}
              {...field}
              disabled={isSubmitting || disabled}
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

export default CustomTextarea;
