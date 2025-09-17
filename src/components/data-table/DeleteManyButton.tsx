import { type Table } from '@tanstack/react-table';

import Icon from '@/components/shared/Icon';
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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { useMediaQuery } from '@/hooks/use-media-query';

type DeleteManyButtonProps<TData> = {
  table: Table<TData>;
};

function DeleteManyButton<TData>({ table }: DeleteManyButtonProps<TData>) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          {table.getFilteredSelectedRowModel().rows.length >= 1 && (
            <Button
              variant='ghost'
              className='items-center gap-1 text-primary transition-colors duration-200 hover:bg-transparent hover:text-error-400'
            >
              <Icon name='delete' />
              Delete ({table.getFilteredSelectedRowModel().rows.length})
            </Button>
          )}
        </DrawerTrigger>

        <DrawerContent className='gap-6 rounded-2xl bg-card sm:rounded-2xl'>
          <DrawerHeader className='space-y-3 sm:text-center'>
            <DrawerTitle className='text-2xl'>Delete Announcement</DrawerTitle>

            <DrawerDescription className='text-base text-neutral-400'>
              Are you sure you want to delete this Announcement ?
            </DrawerDescription>
          </DrawerHeader>

          <DrawerFooter className='flex-row gap-2 sm:justify-start'>
            <DrawerClose asChild>
              <Button
                variant='outline'
                className='flex-1'
              >
                Cancel
              </Button>
            </DrawerClose>
            <Button
              variant='destructive'
              className='flex-1'
            >
              Delete
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {table.getFilteredSelectedRowModel().rows.length >= 1 && (
          <Button
            variant='ghost'
            className='items-center gap-1 text-primary transition-colors duration-200 hover:bg-transparent hover:text-error-400'
          >
            <Icon name='delete' />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className='gap-6 rounded-2xl bg-card sm:rounded-2xl'>
        <DialogHeader className='space-y-3 sm:text-center'>
          <DialogTitle className='text-2xl'>Delete Announcement</DialogTitle>

          <DialogDescription className='text-base text-neutral-400'>
            Are you sure you want to delete this Announcement ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='flex-row gap-2 sm:justify-start'>
          <DialogClose asChild>
            <Button
              variant='outline'
              className='flex-1'
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant='destructive'
            className='flex-1'
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteManyButton;
