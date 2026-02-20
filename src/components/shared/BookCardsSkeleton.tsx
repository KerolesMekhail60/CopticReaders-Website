const BOOK_SKELETON_ITEMS = [1, 2, 3];

export const BookCardsSkeleton = () => (
  <div className='container mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
    {BOOK_SKELETON_ITEMS.map((item) => (
      <div
        key={item}
        className='flex animate-pulse flex-col gap-4 rounded-2xl border border-gray-200 bg-secondary-100 p-4 shadow-sm'
      >
        <div className='h-48 w-full rounded-2xl bg-primary-500' />
        <div className='space-y-3'>
          <div className='h-4 w-3/4 rounded-full bg-primary-200' />
          <div className='h-3 w-1/2 rounded-full bg-primary-200' />
        </div>
        <div className='h-10 w-full rounded-xl bg-primary-100' />
      </div>
    ))}
  </div>
);
