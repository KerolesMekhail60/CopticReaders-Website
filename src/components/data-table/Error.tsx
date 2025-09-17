import { AlertCircle } from 'lucide-react';

const Error = () => {
  return (
    <div className='mt-14 flex items-center justify-center space-x-2 text-red-500'>
      <AlertCircle className='text-red-500' />
      <span>An error occurred, Try again later!!</span>
    </div>
  );
};

export default Error;
