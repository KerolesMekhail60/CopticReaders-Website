import { useEffect } from 'react';

import Cookies from 'js-cookie';
import { Outlet, useNavigate } from 'react-router-dom';

import useScrollToTop from '@/hooks/useScrollToTop';

import { TOKEN } from '@/constants';

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const isLoggedIn = Cookies.get(TOKEN);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1); // Redirects to the previous page if logged in
    }
  }, [isLoggedIn, navigate]);
};

function AuthLayout() {
  useAuthRedirect();
  useScrollToTop();

  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <main className='container'>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AuthLayout;
