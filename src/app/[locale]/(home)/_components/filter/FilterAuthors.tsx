'use client';

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ChevronDown } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Author } from '@/types';

import { cn } from '@/lib/utils';

type Props = {
  authors: Author[];
};

const AuthorsPopover = ({ authors }: Props) => {
  const t = useTranslations('books');

  const searchParams = useSearchParams();
  const authorIdFromUrl = searchParams.get('AuthorId');

  const selectedAuthor = authors.find((a) => a.id === authorIdFromUrl);

  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState(selectedAuthor ? selectedAuthor.name : '');

  const { setValue, getValues, resetField } = useFormContext();

  const selectedAuthorId = getValues('AuthorId');

  useEffect(() => {
    if (!selectedAuthorId) setLabel('');
  }, [selectedAuthorId]);
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
            {hasValue ? label : t('selectAuthor')}
          </span>

          <ChevronDown className='text-neutral-400' />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        {authors.map((author) => {
          const name = author.name;

          return (
            <Button
              key={author.id}
              variant='ghost'
              className={`w-full justify-start ${
                selectedAuthorId === author.id ? 'bg-ls-primary-100' : ''
              }`}
              onClick={() => {
                setIsOpen(false);

                if (selectedAuthorId === author.id) {
                  resetField('AuthorId');
                  setLabel('');
                } else {
                  setValue('AuthorId', author.id);
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

export default AuthorsPopover;
