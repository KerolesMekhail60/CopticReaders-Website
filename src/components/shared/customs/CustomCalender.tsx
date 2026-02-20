import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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

import { cn } from '@/lib/utils';

type CustomCalenderProps = {
  fieldName: string;
  label: string;
  placeholder: string;
  className?: string;
};

const CustomCalender = ({
  fieldName,
  label,
  placeholder,
  className,
}: CustomCalenderProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.formState;

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)}>
          <FormLabel className='font-bold text-grayish-50'>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  className={cn(
                    'h-[53px] rounded-2xl border-input bg-white px-4 py-4 text-start font-normal hover:bg-neutral-100 hover:text-foreground',
                    field.value ? 'text-foreground' : 'text-muted-foreground',
                  )}
                  disabled={isSubmitting}
                >
                  {field.value ? (
                    <span>{format(field.value, 'PPP')}</span>
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className='ms-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto p-0'
              align='start'
            >
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomCalender;
