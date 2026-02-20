'use client';

import { ChangeEvent } from 'react';

import { Search } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

type SearchBarProps = {
  placeholder: string;
  className?: string;
  containerClassName?: string;
};

const SearchBar = ({
  placeholder,
  className,
  containerClassName,
}: SearchBarProps) => {
  const { setValue, watch } = useFormContext();

  const searchValue = watch('Search') ?? '';
  const hasValue = Boolean(searchValue);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value.startsWith(' ')) return;

    setValue('Search', value, {
      shouldDirty: true,
    });
  }

  return (
    <div className={cn('relative w-full border-b', containerClassName)}>
      <Input
        type='text'
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        className={cn(
          `h-[53px] w-full rounded-none border-0 px-10 py-3 shadow-none transition-colors focus-visible:ring-0 ${
            hasValue
              ? 'border-primary-500 text-primary-500'
              : 'border-neutral-300 text-neutral-400'
          } placeholder:text-neutral-400 md:w-[360px] lg:w-96`,
          className,
        )}
      />

      <div
        className={cn(
          'absolute left-4 top-1/2 -translate-y-1/2 transition-colors',
          hasValue ? 'text-primary-500' : 'text-neutral-400',
        )}
      >
        <Search />
      </div>
    </div>
  );
};

export default SearchBar;
