import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { TagsInput } from '@/components/ui/tags-input';

type CustomTagsInputProps = {
  fieldName: string;
  label: string;
  placeholder: string;
  className?: string;
};

const CustomTagsInput = ({
  fieldName,
  label,
  placeholder,
  className,
}: CustomTagsInputProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <TagsInput
              value={field.value}
              onValueChange={field.onChange}
              placeholder={placeholder}
            />
          </FormControl>
          <FormDescription>Add tags.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomTagsInput;
