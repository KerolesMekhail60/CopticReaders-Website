import { SidebarTrigger } from '@/components/ui/sidebar';

import LocaleSwitcher from '@/i18n/LocaleSwitcher';

const Header = () => {
  return (
    <header className='border-btransition-[width,height] flex h-16 shrink-0 items-center gap-2 rounded-none bg-neutral-10 ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
      <div className='flex flex-1 items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1 md:hidden' />

        <LocaleSwitcher />
      </div>
    </header>
  );
};

export default Header;
