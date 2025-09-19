import AddButton from '@/components/data-table/AddButton';
import PageHeading from '@/components/shared/PageHeading';
import { Dialog } from '@/components/ui/dialog';

import BookMangent from './_components/BookMangent';

const Home = () => {
  return (
    <>
      <div className='mb-6 flex items-start justify-between'>
        <PageHeading text='Book Management' />
        <Dialog>
          <AddButton buttonLabel='Add Book' />
        </Dialog>
      </div>
      <BookMangent />
    </>
  );
};

export default Home;
