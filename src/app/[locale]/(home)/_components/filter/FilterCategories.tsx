'use client';

import { useEffect, useState } from 'react';

import { useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ChevronDown } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Category } from '@/types';

import { cn } from '@/lib/utils';

type Props = {
  categories: Category[];
};

const CategoriesPopover = ({ categories }: Props) => {
  const t = useTranslations('books');
  const { locale } = useParams();
  const isEnglish = locale === 'en';

  const searchParams = useSearchParams();
  const categoryIdFromUrl = searchParams.get('CategoryIds');

  const selectedCategory = categories.find(
    (cat) => cat.id === categoryIdFromUrl,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState(
    selectedCategory
      ? isEnglish
        ? selectedCategory.nameEn
        : selectedCategory.nameAr
      : '',
  );

  const { setValue, getValues, resetField } = useFormContext();

  const selectedCategoryId = getValues('CategoryId');

  useEffect(() => {
    if (!selectedCategoryId) setLabel('');
  }, [selectedCategoryId]);
  const hasValue = Boolean(label);
  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      modal={true}
    >
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-14 w-full justify-between rounded-none border-b px-5 hover:bg-secondary-100'
        >
          <span
            className={cn(
              'truncate',
              hasValue ? 'text-primary-500' : 'text-neutral-400',
            )}
          >
            {hasValue ? label : t('selectCategory')}
          </span>

          <ChevronDown
            className={cn(
              'transition-colors',
              hasValue ? 'text-primary-500' : 'text-neutral-400',
            )}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        {categories.map((category) => {
          const name = isEnglish ? category.nameEn : category.nameAr;

          return (
            <Button
              key={category.id}
              variant='ghost'
              className={`w-full justify-start ${
                selectedCategoryId === category.id ? 'bg-ls-primary-100' : ''
              }`}
              onClick={() => {
                setIsOpen(false);

                if (selectedCategoryId === category.id) {
                  resetField('CategoryId');
                  setLabel('');
                } else {
                  setValue('CategoryId', category.id);
                  setLabel(name);
                }
              }}
            >
              {name}
            </Button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default CategoriesPopover;
