import { useSearchParams } from 'react-router-dom';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { SelectItem as SelectItemType } from '@/types';

import { cn } from '@/lib/utils';

const FilterByType = ({
  items,
  fieldName,
  placeholder,
  className = '',
  icon,
}: {
  items: SelectItemType[];
  fieldName: string;
  placeholder: string;
  className?: string;
  icon?: React.ReactNode;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(fieldName) || '';

  function handleChange(value: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(fieldName, value);
    newSearchParams.set('pageIndex', '1');
    setSearchParams(newSearchParams);
  }

  return (
    <Select
      onValueChange={handleChange}
      defaultValue={value}
      value={value}
    >
      <SelectTrigger className={cn('w-40', className)}>
        <div className='flex items-center justify-start gap-3'>
          {icon && <div className=''>{icon}</div>}
          <SelectValue
            placeholder={placeholder}
            className='text-start'
          />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items?.map(({ value, label }) => (
            <SelectItem
              key={value}
              value={value}
            >
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterByType;
