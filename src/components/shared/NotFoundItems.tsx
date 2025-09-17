const NotFoundItems = ({ text }: { text: string }) => {
  return (
    <div className='flex flex-col place-items-center'>
      <img
        src='/svg/not-found.svg'
        alt='not found'
        className='size-[320px]'
      />
      <p className='text-2xl font-semibold'>{text}</p>
    </div>
  );
};

export default NotFoundItems;
