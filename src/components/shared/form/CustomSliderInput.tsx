import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';

type CustomSliderInputProps = {
  fieldName: string;
  label: string;
  disabled?: boolean;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
};

const CustomSliderInput = ({
  fieldName,
  label,
  disabled,
  className,
  min = 0,
  max = 100,
  step = 5,
}: CustomSliderInputProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.formState;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field: { value, onChange } }) => (
        <FormItem className={className}>
          <FormLabel>
            {label} - {value}
          </FormLabel>
          <FormControl>
            <Slider
              min={min}
              max={max}
              step={step}
              defaultValue={[min + 1]}
              onValueChange={(vals) => {
                onChange(vals[0]);
              }}
              disabled={isSubmitting || disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomSliderInput;
