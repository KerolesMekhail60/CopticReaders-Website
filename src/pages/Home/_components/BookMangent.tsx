import BookFilter from './BookFilter';
import BookTable from './BookTable';

const BookMangent = () => {
  return (
    <section className='mt-8 max-md:pb-16'>
      <BookFilter />
      <BookTable />
    </section>
  );
};

export default BookMangent;
