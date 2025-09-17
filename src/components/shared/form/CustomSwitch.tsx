import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

import { cn } from '@/lib/utils';

type CustomSwitchProps = {
  fieldName: string;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
};

const CustomSwitch = ({
  fieldName,
  label,
  description,
  disabled = false,
  className,
}: CustomSwitchProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.formState;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex flex-row items-center justify-between rounded-lg border p-4',
            className
          )}
        >
          <div className='space-y-0.5'>
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-readonly
              disabled={isSubmitting || disabled}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CustomSwitch;
