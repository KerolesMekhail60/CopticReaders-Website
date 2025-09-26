import { useState } from 'react';

import { DialogTitle } from '@radix-ui/react-dialog';

import AddButton from '@/components/data-table/AddButton';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';

import PublisherForm from './PublisherForm';

import useTranslations from '@/i18n/useTranslations';

const PublisherDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslations();
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <AddButton buttonLabel={t('publisherAdd')} />
      <DialogContent className='max-h-[80vh] max-w-[900px]'>
        <DialogHeader>
          <DialogTitle className='text-lg font-bold text-secondary-900 md:text-xl lg:text-2xl xl:text-3xl'>
            {t('publisherAdd')}
          </DialogTitle>
        </DialogHeader>
        <PublisherForm onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default PublisherDialog;
