import { useEffect } from 'react';

import { ThemeProvider } from 'next-themes';

import Cookies from 'js-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import useScrollToTop from '@/hooks/useScrollToTop';

import { TOKEN } from '@/constants';

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get(TOKEN)) {
      navigate('/');
    }
  }, [navigate]);
};

function AuthLayout() {
  useAuthRedirect();
  useScrollToTop();

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='light'
      forcedTheme='light'
    >
      <div className='flex min-h-screen w-full flex-col'>
        <main className='container'>
          <Outlet />
        </main>
      </div>

      <Toaster
        richColors
        position='top-right'
      />
    </ThemeProvider>
  );
}

export default AuthLayout;
