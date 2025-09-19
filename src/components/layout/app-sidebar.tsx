import * as React from 'react';

import { BookPlus, GalleryVerticalEnd } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Corporate } from '@/components/layout/Corporate';
import { NavMain } from '@/components/layout/nav-main';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

import { NavUser } from './nav-user';

import { useUser } from '@/hooks/useUser';

import useTranslations from '@/i18n/useTranslations';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslations();
  const { user } = useUser();
  const data = {
    user: {
      name: user?.firstName + ' ' + user?.lastName,
      email: user?.email || '',
      avatar: `https://ui-avatars.com/api/?name=${user?.firstName}&color=fff&background=66121b`,
    },
    corporate: {
      name: 'Coptic Readers',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    navMain: [
      {
        title: t('layout.navbar.books'),
        url: '#',
        icon: BookPlus,
        items: [
          {
            title: 'Planner',
            url: '/reservations',
          },
          {
            title: t('layout.navbar.calendar'),
            url: '/reservations/calendar',
          },
          {
            title: 'Reservation List',
            url: '/reservations/list',
          },
          {
            title: 'Global Time',
            url: '/reservations/global-time',
          },
        ],
      },
    ],
  };

  return (
    <Sidebar
      collapsible='icon'
      variant='inset'
      className='rounded-r-[32px] bg-white pt-4'
      style={{
        boxShadow: '9px 0px 24px -4px var(--primary-900)',
      }}
      {...props}
    >
      <SidebarHeader className='h-24 bg-white'>
        <Link to='/'>
          <Corporate />
        </Link>
      </SidebarHeader>

      <SidebarContent className='bg-white'>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter className='bg-white'>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
