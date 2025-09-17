import { Separator } from '@radix-ui/react-separator';

import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';

import MAIN_LOGO from '/svg/main-logo.svg';

export function Corporate() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <span className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
            LS
          </span>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>{corporate.name}</span>
            <span className='truncate text-xs'>{corporate.plan}</span>
          </div>
        </SidebarMenuButton> */}
        <div className='my-5 flex w-full justify-center'>
          <img src={MAIN_LOGO} />
        </div>
        <Separator
          orientation='horizontal'
          className='mr-2 h-4'
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
