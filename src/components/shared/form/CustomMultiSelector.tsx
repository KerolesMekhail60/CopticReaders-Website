import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/multi-select';

import { SelectItem } from '@/types';

import { cn } from '@/lib/utils';

type CustomMultiSelectorProps = {
  fieldName: string;
  label: string;
  placeholder: string;
  items: SelectItem[];
  className?: string;
  disabled?: boolean;
};

function CustomMultiSelector({
  fieldName,
  label,
  placeholder,
  items,
  className = '',
  disabled = false,
}: CustomMultiSelectorProps) {
  const form = useFormContext();
  const { isSubmitting } = form.formState;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        const hasValue = field.value && field.value.length > 0;

        return (
          <FormItem className={className}>
            <FormLabel className='text-sm font-semibold text-neutral-900'>
              {label}
            </FormLabel>
            <FormControl>
              <MultiSelector
                values={field.value}
                onValuesChange={field.onChange}
                loop
                className='w-full'
              >
                <div className='flex flex-col gap-1'>
                  <MultiSelectorTrigger
                    className={cn(
                      'h-[53px] w-full border border-neutral-100 bg-neutral-10 placeholder:text-neutral-400',
                      !hasValue && 'text-neutral-400',
                    )}
                  >
                    <MultiSelectorInput
                      placeholder={!hasValue ? placeholder : undefined}
                      disabled={isSubmitting || disabled}
                      className='w-full'
                    />
                  </MultiSelectorTrigger>

                  <FormMessage />
                </div>

                <MultiSelectorContent className='w-full'>
                  <MultiSelectorList>
                    {items.map(({ label, value }) => (
                      <MultiSelectorItem
                        key={value}
                        value={value}
                      >
                        {label}
                      </MultiSelectorItem>
                    ))}
                  </MultiSelectorList>
                </MultiSelectorContent>
              </MultiSelector>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}

export default CustomMultiSelector;
