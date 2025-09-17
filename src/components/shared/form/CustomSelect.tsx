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

import { SelectItem as SelectItemType } from '@/types';

import { cn } from '@/lib/utils';

type CustomSelectProps = {
  fieldName: string;
  label: string;
  items: SelectItemType[];
  placeholder: string;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
};

const CustomSelect = ({
  fieldName,
  label,
  placeholder,
  className,
  items,
  disabled,
  onChange,
}: CustomSelectProps) => {
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

          <Select
            onValueChange={(value) => {
              field.onChange(value);
              if (onChange) onChange(value);
            }}
            defaultValue={field.value}
            disabled={isSubmitting || disabled}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  'h-[53px] border border-neutral-100 bg-neutral-10 placeholder:text-neutral-400',
                  !field.value && 'text-neutral-400',
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {items?.map(({ label, value }) => (
                <SelectItem
                  key={value}
                  value={value}
                  className='cursor-pointer'
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomSelect;
