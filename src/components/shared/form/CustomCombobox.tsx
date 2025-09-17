import { useState } from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { SelectItem as SelectItemType } from '@/types';

import { cn } from '@/lib/utils';

type CustomComboboxProps = {
  fieldName: string;
  label: string;
  items: SelectItemType[];
  placeholder: string;
  disabled?: boolean;
  className?: string;
};

const CustomCombobox = ({
  fieldName,
  label,
  placeholder,
  className,
  items,
  disabled,
}: CustomComboboxProps) => {
  const [open, setOpen] = useState(false);
  const form = useFormContext();
  const { isSubmitting } = form.formState;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>

          <Popover
            open={open}
            onOpenChange={setOpen}
          >
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  disabled={isSubmitting || disabled}
                >
                  {field.value
                    ? items.find(({ value }) => value === field.value)?.label
                    : placeholder}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='ComboboxPopoverContent p-0'>
              <Command>
                <CommandInput placeholder='Search...' />
                <CommandList>
                  <CommandEmpty>Not Found...</CommandEmpty>
                  <CommandGroup>
                    {items.map(({ label, value }) => (
                      <CommandItem
                        value={label}
                        key={value}
                        onSelect={() => {
                          form.setValue(fieldName, value);
                          setOpen(false);
                        }}
                      >
                        {label}
                        <Check
                          size={18}
                          className={cn(
                            'ml-auto',
                            value === field.value ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomCombobox;
