import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { cn } from '@/lib/utils';

type CustomRadioGroupProps = {
  fieldName: string;
  className?: string;
  values: string[];
};

const CustomRadioGroup = ({
  fieldName,
  className,
  values,
}: CustomRadioGroupProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.formState;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className='flex-1 space-y-0'>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn('flex gap-3', className)}
              disabled={isSubmitting}
            >
              {values.map((value) => (
                <FormItem
                  key={value}
                  className='flex items-center space-x-3 space-y-0'
                >
                  <FormControl>
                    <RadioGroupItem value={value} />
                  </FormControl>
                  <FormLabel className='font-normal'>{value}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomRadioGroup;
