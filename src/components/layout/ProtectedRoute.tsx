import { ReactNode, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import MainLoader from '../shared/loaders/MainLoader';

//import { useUser } from '@/hooks/useUser';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Load the authenticated user
  //const { isLoading, isAuthenticated } = useUser();
  const isAuthenticated = true;
  const isLoading = false;
  // 2. If there is NO authenticated user, redirect to the /signin
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading)
        navigate(`/?callbackUrl=${location.pathname}`);
    },
    [isAuthenticated, isLoading, navigate, location.pathname],
  );

  // 3. While loading, show a spinner
  if (isLoading) return <MainLoader />;

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
