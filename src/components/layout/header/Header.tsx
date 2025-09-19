import LanguageForm from '@/components/layout/header/LanguageForm';
import { Skeleton } from '@/components/ui/skeleton';

import Logo from '../sidebar/Logo';
import SideBarSheet from '../sidebar/SideBarSheet';

import NavMenu from './NavMenu';

import { useUser } from '@/hooks/useUser';

const Header = () => {
  //const { user, isLoading: isUserLoading } = useUser();
  const isLoading = false;
  return (
    <header className='sticky top-0 z-10 flex h-[76px] shrink-0 items-center justify-between gap-2 bg-white px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 md:justify-end'>
      <Logo className='md:hidden' />
      <div>
        {/* <Notifications /> */}
        <div className='mt-4 max-md:hidden sm:mt-0'>
          <LanguageForm />
        </div>
        {/* Mobile Screen */}
        <SideBarSheet />
      </div>
      <div className='max-md:hidden'>
        {isLoading ? (
          <Skeleton className='h-16 w-[264px] rounded-md' />
        ) : (
          <NavMenu />
        )}
      </div>
    </header>
  );
};

export default Header;
