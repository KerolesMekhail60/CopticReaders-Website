import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
};

export default useScrollToTop;
