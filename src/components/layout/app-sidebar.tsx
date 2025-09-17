import * as React from 'react';

import {
  Building,
  Calendar,
  ConciergeBell,
  Database,
  GalleryVerticalEnd,
  Radio,
  Settings,
} from 'lucide-react';
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

// This is sample data.

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
        title: t('layout.navbar.reservations'),
        url: '#',
        icon: Calendar,
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
      {
        title: t('Services'),
        url: '#',
        icon: ConciergeBell,
        items: [
          {
            title: t('ServicesTypes'),
            url: '/services/services-types',
          },
          {
            title: t('Services'),
            url: '/services',
          },
          {
            title: t('Requests'),
            url: '/services/requests',
          },
          {
            title: t('PackageItems'),
            url: '/services/package-items',
          },
        ],
      },
      {
        title: t('Devices'),
        url: '#',
        icon: Radio,
        items: [
          // {
          //   title: t('Controls'),
          //   url: '/controls',
          // },
          {
            title: t('Devices'),
            url: '/controls/devices',
          },
          {
            title: t('devicesSettings'),
            url: '/controls/settings',
          },
        ],
      },
      {
        title: t('layout.navbar.finanicals'),
        url: '#',
        icon: Database,
        items: [
          {
            title: t('layout.navbar.invoices'),
            url: '/financials/invoices',
          },
        ],
      },
      {
        title: t('layout.navbar.apartments'),
        url: '#',
        icon: Building,
        items: [
          {
            title: t('layout.navbar.apartments'),
            url: '/apartments',
          },
        ],
      },

      {
        title: t('layout.navbar.buildings'),
        url: '#',
        icon: Building,
        items: [
          {
            title: t('layout.navbar.buildings'),
            url: '/buildings',
          },
          {
            title: t('layout.navbar.structures'),
            url: '/buildings/structures',
          },
          {
            title: t('layout.navbar.amenitiesTypes'),
            url: '/buildings/amenities-types',
          },
          {
            title: t('layout.navbar.amenities'),
            url: '/buildings/amenities',
          },
        ],
      },

      {
        title: t('layout.navbar.settings'),
        url: '#',
        icon: Settings,
        items: [
          {
            title: t('layout.navbar.rules'),
            url: '/settings/rules',
          },
          {
            title: t('layout.navbar.cities'),
            url: '/settings/cities',
          },
          {
            title: t('layout.navbar.guests'),
            url: '/settings/guests',
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
      <SidebarHeader className='bg-white'>
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
