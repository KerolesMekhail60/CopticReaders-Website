import { useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import useLocale from './useLocale';
import useTranslations from './useTranslations';

import IT_FLAG from '/svg/it.svg';
import USA_FLAG from '/svg/us.svg';

export default function LocaleSwitcher() {
  const { i18n } = useTranslations();
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);

  const LANGUAGES = [
    { label: 'English', value: 'en', icon: USA_FLAG },

    {
      label: 'Italian',
      value: 'it',
      icon: IT_FLAG,
    },
  ];
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='ms-auto flex h-10 items-center gap-x-2 rounded-sm border px-2 xs:h-11 xs:w-[150px]'
        >
          <img
            src={LANGUAGES.find((language) => language.value === locale)?.icon}
            className='size-6 rounded-full object-cover'
          />
          <span className='max-xs:hidden'>
            {LANGUAGES.find((language) => language.value === locale)?.label}
          </span>
          <ChevronDown className='ms-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[150px] p-0'>
        <Command>
          <CommandList>
            <CommandGroup>
              {LANGUAGES.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue) => {
                    i18n.changeLanguage(currentValue);
                    setOpen(false);
                  }}
                >
                  <img
                    src={language?.icon}
                    className='size-6 rounded-full object-cover'
                  />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
