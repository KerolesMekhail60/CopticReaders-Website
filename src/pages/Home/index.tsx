import PageHeading from '@/components/shared/PageHeading';

import BookDialog from './_components/add-book/BookDialog';
import BookMangent from './_components/BookMangent';
import ImportButton from './_components/ImportButton';

const Home = () => {
  return (
    <>
      <div className='mb-6 flex items-start justify-between'>
        <PageHeading text='Book Management' />
        <div className='flex items-center gap-2'>
          <ImportButton />
          <BookDialog />
        </div>
      </div>
      <BookMangent />
    </>
  );
};

export default Home;
