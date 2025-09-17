import { useFormContext } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { Item } from '@/types';

import useLocale from '@/i18n/useLocale';
type CustomCheckboxInputProps = {
  fieldName: string;
  disabled?: boolean;
  className?: string;
  item: Item;
};

const CustomCheckboxInput = ({
  fieldName,
  item,
  disabled = false,
}: CustomCheckboxInputProps) => {
  const form = useFormContext();
  const { isEnglish } = useLocale();
  const { isSubmitting } = form.formState;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
            <FormControl>
              <Checkbox
                disabled={isSubmitting || disabled}
                checked={field.value?.includes(item.id)}
                onCheckedChange={(checked) => {
                  return checked
                    ? field.onChange([...field.value, item.id])
                    : field.onChange(
                        field.value?.filter(
                          (value: string) => value !== item.id,
                        ),
                      );
                }}
              />
            </FormControl>

            <FormLabel className='font-normal'>
              {isEnglish ? item.nameEn : item.nameIt}
            </FormLabel>
          </FormItem>
        );
      }}
    />
  );
};

export default CustomCheckboxInput;
