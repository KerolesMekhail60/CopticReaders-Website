import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import useTranslations from '@/i18n/useTranslations';

const LogOutMessage = ({
  isOpen,
  onClose,
  onLogout,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}) => {
  const { t, dir } = useTranslations()
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      {' '}
      {/* Ensure dialog is controlled */}
      <DialogContent className='sm:rounded-2xl' >
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold text-secondary-900' dir={dir}>
            {t('Are you sure you want to logout')}
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className='flex w-full flex-col gap-4 xs:flex-row sm:justify-stretch'>
          <Button
            onClick={onLogout}
            className='!m-0 flex-1 hover:bg-red-500'
            variant='outline'
          >
            {t('Logout')}
          </Button>
          <DialogClose asChild>
            <Button
              variant='default'
              className='flex-1'
            >
              {t('Stay Logged in')}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  );
};

export default LogOutMessage;
