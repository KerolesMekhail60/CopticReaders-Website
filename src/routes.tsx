/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import MainLoader from './components/shared/loaders/MainLoader';
import ErrorPage from './pages/ErrorPage';
import NotFound from './pages/NotFound';

const Home = lazy(() => import('./pages/Home'));

const SignIn = lazy(() => import('./pages/Auth/SignIn'));
const ForgetPassword = lazy(() => import('./pages/Auth/ForgetPassword'));
const Otp = lazy(() => import('./pages/Auth/Otp'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'));

export const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<MainLoader />}>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: (
      <Suspense fallback={<MainLoader />}>
        <AuthLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/signin',
        element: (
          <Suspense fallback={<MainLoader />}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: '/forget-password',
        element: (
          <Suspense fallback={<MainLoader />}>
            <ForgetPassword />
          </Suspense>
        ),
      },
      {
        path: '/otp',
        element: (
          <Suspense fallback={<MainLoader />}>
            <Otp />
          </Suspense>
        ),
      },
      {
        path: '/reset-password',
        element: (
          <Suspense fallback={<MainLoader />}>
            <ResetPassword />
          </Suspense>
        ),
      },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
