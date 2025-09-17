import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import notFound from './../../public/svg/not-found.svg';
const NotFound = () => {
  return (
    <div className='container mx-auto flex min-h-dvh flex-col items-center justify-center text-center'>
      <img
        src={notFound}
        className='mb-10'
      />
      <h1 className='mb-3 text-2xl font-semibold text-secondary-900 md:text-[28px] lg:text-[32px]'>
        Oops! We can’t find that page.
      </h1>
      <p className='mb-7 text-sm text-secondary-400 md:text-lg'>
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Button className='max-w-[426px] md:w-[426px]'>
        <Link to='/'>Go To Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
