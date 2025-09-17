import Spinner from '../shared/loaders/Spinner';

const InitialLoader = () => {
  return (
    <Spinner
      color='var(--secondary-600)'
      size={45}
      className='mx-auto mt-14 flex items-center justify-center space-x-2 text-primary-500'
    />
  );
};

export default InitialLoader;
