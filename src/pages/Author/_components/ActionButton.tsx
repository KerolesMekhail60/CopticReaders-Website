import { useState } from 'react';

import { Ellipsis, Pen, Trash2 } from 'lucide-react';

import RemoveButton from '@/components/data-table/RemoveButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import AuthorForm from './add-author/AuthorForm';

import { Author } from '@/types';

import useLocale from '@/i18n/useLocale';
import useTranslations from '@/i18n/useTranslations';
import { cn } from '@/lib/utils';

const ActionButton = ({
  author,
  className,
}: {
  author?: Author;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  const { isEnglish } = useLocale();
  const { t } = useTranslations();

  async function handleDelete() {
    //   await deleteService(service.id);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'flex size-8 flex-col items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-500',
              className,
            )}
          >
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Pen className='size-4' />
              {t('author.edit')}
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <RemoveButton
              title={isEnglish ? 'Remove Author' : 'حذف المؤلف'}
              onDelete={handleDelete}
              // isLoading={isDeleting}
              triggerButton={
                <div className='flex items-center gap-2 p-2 text-sm text-error-500 hover:bg-red-500 hover:text-white'>
                  <Trash2 className='size-4' />
                  {isEnglish ? 'Remove' : 'حذف'}
                </div>
              }
            >
              <p className='text-center text-secondary-800'>
                {isEnglish
                  ? 'Are you sure you want to delete '
                  : 'هل أنت متأكد أنك تريد حذف '}
                <span className='text-primary-500'>
                  {isEnglish ? author?.name : author?.nameAr}
                </span>
                {isEnglish ? ' from Authors?' : ' من المؤلفين؟'}
              </p>
            </RemoveButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className='max-h-[80vh] max-w-[900px]'>
        <DialogHeader>
          <DialogTitle className='text-lg font-bold text-secondary-900 md:text-xl lg:text-2xl xl:text-3xl'>
            {t('author.edit')}
          </DialogTitle>
        </DialogHeader>
        <AuthorForm
          author={author}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ActionButton;
