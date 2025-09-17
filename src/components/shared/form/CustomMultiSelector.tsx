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

type CustomMultiSelectorProps = {
  fieldName: string;
  label: string;
  placeholder: string;
  items: SelectItem[];
  type?: string;
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
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <MultiSelector
              values={field.value}
              onValuesChange={field.onChange}
              loop
              className='max-w-xs'
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput
                  placeholder={placeholder}
                  disabled={isSubmitting || disabled}
                />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {items.map(({ label, value }) => (
                    <MultiSelectorItem key={value} value={value}>
                      {label}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomMultiSelector;
