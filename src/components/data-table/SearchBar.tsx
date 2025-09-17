import { ChangeEvent, useState } from 'react';

import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

type SearchBarProps = {
  placeholder: string;
  className?: string;
  containerClassName?: string;
};

const SearchBar = ({
  placeholder = '',
  className = '',
  containerClassName = '',
}: SearchBarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('searchValue') || '',
  );

  const search = searchParams.get('searchValue') || '';

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('searchValue', e.target.value);
    newSearchParams.set('pageIndex', '1');
    setSearchParams(newSearchParams);
  }

  return (
    <div className={cn('relative', containerClassName)}>
      <Input
        type='text'
        placeholder={placeholder}
        className={cn(
          'h-12 w-full rounded-lg border-[1px] border-secondary-100 bg-card px-10 py-3 placeholder:text-secondary-300 rtl:leading-[4]',
          className,
        )}
        value={search ?? searchValue}
        onChange={handleChange}
      />

      <Search className='absolute left-4 top-1/2 size-5 -translate-y-1/2 text-secondary-300' />
    </div>
  );
};

export default SearchBar;
