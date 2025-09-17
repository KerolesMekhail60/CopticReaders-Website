import { ThemeProvider } from 'next-themes';

import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import { SidebarInset, SidebarProvider } from '../ui/sidebar';

import { AppSidebar } from './app-sidebar';
import Header from './Header';

import { GlobalProvider } from '@/context/useGlobalContext';

function AppLayout() {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='light'
      forcedTheme='light'
    >
      <GlobalProvider>
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset className='max-h-[calc(100svh-theme(spacing.4))] overflow-x-auto shadow-none md:peer-data-[variant=inset]:shadow-none'>
            <Header />
            <div className='overflow-y-auto bg-neutral-10 p-6'>
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>

        <Toaster
          richColors
          position='top-right'
          duration={3000}
          closeButton
        />
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default AppLayout;
