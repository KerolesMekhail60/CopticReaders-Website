import { Outlet } from 'react-router-dom';

import Header from './header/Header';
import SideBar from './sidebar/SideBar';

import { GlobalProvider } from '@/context/useGlobalContext';

function AppLayout() {
  return (
    <GlobalProvider>
      <SideBar />

      <div className='flex flex-col bg-card transition-all duration-500 md:ltr:pl-32 md:rtl:pr-20'>
        <Header />

        <main className='min-h-[calc(100svh-theme(spacing.20))] overflow-y-auto bg-secondary-50 px-6 pt-6'>
          <Outlet />
        </main>
      </div>
    </GlobalProvider>
  );
}

export default AppLayout;
