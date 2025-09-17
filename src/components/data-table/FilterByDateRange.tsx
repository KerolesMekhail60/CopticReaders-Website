import React, { useEffect } from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useSearchParams } from 'react-router-dom';

import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

import { cn } from '@/lib/utils';

const FilterByDateRange = ({
  fromFieldName,
  toFieldName,
  placeholder,
  className = '',
}: {
  fromFieldName: string;
  toFieldName: string;

  placeholder: string;
  className?: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const fromValue = searchParams.get(fromFieldName) || '';
  const toValue = searchParams.get(toFieldName) || '';
  const [date, setDate] = React.useState<DateRange | undefined>();

  function handleChange(value: DateRange | undefined) {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value?.from) {
      newSearchParams.set(
        fromFieldName,
        format(value?.from, 'MM/dd/yyyy') || fromValue,
      );
    }

    if (value?.to) {
      newSearchParams.set(
        toFieldName,
        format(value?.to, 'MM/dd/yyyy') || toValue,
      );
    }
    newSearchParams.set('pageIndex', '1');
    setSearchParams(newSearchParams);
  }

  useEffect(() => {
    if (toValue && fromValue) {
      setDate({ from: new Date(fromValue), to: new Date(toValue) });
    }
  }, [toValue, fromValue]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn('h-12 font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto p-0'
          align='start'
        >
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={(date) => {
              setDate(date);
              handleChange(date);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterByDateRange;
