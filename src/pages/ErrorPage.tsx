import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const ErrorPage = () => {
  // you don't need to explicitly set error to `unknown`
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error';
  }
  console.log('Error:', errorMessage);

  return (
    <div className='container relative mx-auto flex min-h-dvh flex-col items-center justify-center text-center'>
      <img
        src='./../../public/svg/bg-error.svg'
        className='absolute top-[160px]'
      />
      <div className='absolute top-[300px] z-50 max-w-[250px] sm:top-[500px] sm:max-w-[600px]'>
        <h1 className='text-6xl font-semibold text-secondary-900 md:text-8xl lg:text-[136px]/[162.34px]'>
          Error
        </h1>
        <h3 className='mb-3 text-2xl font-semibold text-secondary-900 md:text-[28px] lg:text-[32px]'>
          Something went wrong
        </h3>
        <p className='mb-7 text-sm text-secondary-400 md:text-lg'>
          We’re experiencing technical issues. Try again in a few moments.
        </p>
        <Button
          className='max-w-[426px] md:w-[426px]'
          asChild
        >
          <Link to='/'>Try Again</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
