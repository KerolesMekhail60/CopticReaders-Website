import PageHeading from '@/components/shared/PageHeading';

import BookDialog from './_components/add-book/BookDialog';
import BookMangent from './_components/BookMangent';

const Home = () => {
  return (
    <>
      <div className='mb-6 flex items-start justify-between'>
        <PageHeading text='Book Management' />
        <BookDialog />
      </div>
      <BookMangent />
    </>
  );
};

export default Home;
