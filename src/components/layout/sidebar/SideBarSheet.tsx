import { useState } from 'react';

import { AlignJustify } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';

import NavMenu from '../header/NavMenu';

import NavLinks from './NavLinks';

import { useMediaQuery } from '@/hooks/use-media-query';
import { useUser } from '@/hooks/useUser';
const SideBarSheet = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { user, isLoading: isUserLoading } = useUser();
  console.log('🚀 ~ user:', user);
  const [openSheet, setOpenSheet] = useState(false);
  if (!isMobile) return;
  function onClose() {
    setOpenSheet(false);
  }
  return (
    <Sheet
      open={openSheet}
      onOpenChange={(open) => setOpenSheet(open)}
    >
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='rounded-full md:hidden'
        >
          <AlignJustify className='!size-6' />
        </Button>
      </SheetTrigger>

      <SheetContent className='sm:max-w-[603px]'>
        <div className='-mt-5 mb-4 flex items-center'>
          <div>
            {isUserLoading ? (
              <Skeleton className='h-16 w-[264px] rounded-md' />
            ) : (
              <NavMenu />
            )}
          </div>
        </div>
        <NavLinks onClose={onClose} />
      </SheetContent>
    </Sheet>
  );
};

export default SideBarSheet;
