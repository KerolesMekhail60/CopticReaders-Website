import { StrictMode, Suspense } from 'react';

import { createRoot } from 'react-dom/client';

import MainLoader from '@/components/shared/loaders/MainLoader.tsx';

import App from './App.tsx';

import '@/index.css';

import './i18n/config.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* loading Locales */}
    <Suspense fallback={<MainLoader />}>
      <App />
    </Suspense>
  </StrictMode>
);
