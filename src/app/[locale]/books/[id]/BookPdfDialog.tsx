'use client';

import { lazy, Suspense } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

const PdfViewer = lazy(() => import('@/components/shared/PdfViewer'));

interface BookPdfDialogProps {
  token?: string;
  fileUrl?: string;
  viewLabel: string;
  unavailableLabel: string;
  loadingLabel: string;
  classNameTrigger?: string;
}

const BookPdfDialog = ({
  token,
  fileUrl,
  viewLabel,
  unavailableLabel,
  loadingLabel,
  classNameTrigger,
}: BookPdfDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='secondary'
          className={cn(
            'h-10 w-[200px] py-2 text-sm font-bold sm:h-11 sm:text-base',
            classNameTrigger,
          )}
          disabled={!token && !fileUrl}
        >
          {fileUrl ? viewLabel : unavailableLabel}
        </Button>
      </DialogTrigger>

      <DialogContent
        className='flex h-full w-full max-w-none flex-col'
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className='px-3 py-2 sm:px-6 sm:py-4'>
          <DialogTitle className='text-base sm:text-lg md:text-xl'>
            {viewLabel}
          </DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-hidden px-2 pb-3 sm:px-4 sm:pb-4'>
          <Suspense
            fallback={
              <div className='flex h-full min-h-[300px] items-center justify-center text-sm sm:text-base'>
                {loadingLabel}
              </div>
            }
          >
            <PdfViewer
              token={token}
              file={fileUrl}
            />
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookPdfDialog;
