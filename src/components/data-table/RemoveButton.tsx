import { ReactNode, useState } from 'react';

import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import Spinner from '../shared/loaders/Spinner';

import { useMediaQuery } from '@/hooks/use-media-query';

import useTranslations from '@/i18n/useTranslations';

type RemoveButtonProps = {
  title: string;
  onDelete: () => Promise<void>;
  isLoading?: boolean;
  children: ReactNode;
  triggerButton?: ReactNode;
};

const RemoveButton = ({
  title,
  onDelete,
  isLoading,
  children,
  triggerButton = null,
}: RemoveButtonProps) => {
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { t } = useTranslations('forms.buttonLabels');

  async function handleRemove() {
    await onDelete();
    setOpen(false);
  }

  if (isDesktop)
    return (
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          {!triggerButton ? (
            <button className='flex items-center justify-center rounded-sm text-primary-500'>
              <Trash2 size={20} />
            </button>
          ) : (
            triggerButton
          )}
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-center text-2xl font-semibold text-secondary-900'>
              {title}
            </DialogTitle>
            <DialogDescription className='sr-only'>{title}</DialogDescription>
          </DialogHeader>

          {children}

          <DialogFooter className='flex w-full flex-col gap-4 xs:flex-row sm:justify-stretch'>
            <DialogClose asChild>
              <Button
                variant='outline'
                className='flex-1'
              >
                {t('cancel')}
              </Button>
            </DialogClose>

            <Button
              onClick={handleRemove}
              className='!m-0 flex-1'
            >
              {isLoading ? <Spinner /> : t('remove')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <button className='flex size-8 items-center justify-center rounded-sm text-primary-500'>
          <Trash2 size={20} />
        </button>
      </DrawerTrigger>

      <DrawerContent className='pb-4'>
        <DrawerHeader>
          <DrawerTitle className='text-center text-2xl font-semibold text-secondary-900'>
            {title}
          </DrawerTitle>
          <DrawerDescription className='sr-only'> {title}</DrawerDescription>
        </DrawerHeader>

        {children}

        <DialogFooter className='mt-4 flex w-full flex-col gap-4 px-4 xs:flex-row sm:justify-stretch'>
          <DialogClose asChild>
            <Button
              variant='outline'
              className='flex-1'
            >
              {t('cancel')}
            </Button>
          </DialogClose>

          <Button
            onClick={handleRemove}
            className='flex-1'
          >
            {isLoading ? <Spinner /> : t('remove')}
          </Button>
        </DialogFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default RemoveButton;
