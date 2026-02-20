'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { Search, SlidersHorizontal } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import AuthorsPopover from './FilterAuthors';
import CategoriesPopover from './FilterCategories';
import SearchBar from './SearchBar';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import { Author, Category } from '@/types';
import { FormFilterFields } from '@/types/global';

type FilterProps = {
  categories: Category[];
  authors: Author[];
  form: UseFormReturn<FormFilterFields>;
  handleFilteration: () => void;
  handleReset: () => void;
  isPending: boolean;
};

function Filter({
  categories,
  authors,
  form,
  handleFilteration,
  handleReset,
  isPending,
}: FilterProps) {
  const t = useTranslations('books');
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [open, setOpen] = useState(false);

  /* ---------------------------- MOBILE VIEW ---------------------------- */
  if (isMobile) {
    return (
      <Form {...form}>
        {/* Floating Filter Button */}
        <div className='fixed bottom-6 right-6 z-50'>
          <Sheet
            open={open}
            onOpenChange={setOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant='default'
                className='h-14 w-14 gap-2 rounded-full p-3 shadow-lg'
              >
                <SlidersHorizontal className='h-6 w-6' />
                <span className='sr-only'>{t('filter')}</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side='bottom'
              className='rounded-t-2xl'
            >
              <SheetHeader>
                <SheetTitle>{t('filterBooks')}</SheetTitle>
              </SheetHeader>

              <form
                className='mt-6 space-y-4'
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <SearchBar placeholder={t('searchPlaceholder')} />
                <AuthorsPopover authors={authors} />
                <CategoriesPopover categories={categories} />

                <Button
                  type='button'
                  className='mt-6 w-full'
                  disabled={isPending}
                  onClick={(e) => {
                    e.preventDefault();
                    handleFilteration();
                    setOpen(false);
                  }}
                >
                  <Search />
                  <span>{t('search')}</span>
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full'
                  disabled={isPending}
                  onClick={(e) => {
                    e.preventDefault();
                    handleReset();
                    setOpen(false);
                  }}
                >
                  {t('reset')}
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>
      </Form>
    );
  }

  /* ---------------------------- DESKTOP VIEW ---------------------------- */
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className='mx-auto flex max-w-fit -translate-y-[50%] items-center gap-2 rounded-2xl bg-white p-6 shadow-md max-lg:flex-col lg:gap-6'>
          <SearchBar
            placeholder={t('searchPlaceholder')}
            className='max-w-full'
          />
          <AuthorsPopover authors={authors} />
          <CategoriesPopover categories={categories} />

          <Button
            onClick={(e) => {
              e.preventDefault();
              handleFilteration();
            }}
            type='button'
            disabled={isPending}
          >
            <Search />
            <span>{t('search')}</span>
          </Button>

          <Button
            type='button'
            variant='link'
            onClick={(e) => {
              e.preventDefault();
              handleReset();
            }}
            className='text-ms'
            disabled={isPending}
          >
            {t('reset')}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default Filter;
