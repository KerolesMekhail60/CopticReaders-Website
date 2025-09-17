const MainLoader = () => {
  return (
    <div className='relative h-dvh w-full text-center'>
      <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-3'>
        <img
          src='/gif/loader.gif'
          alt='Loading...'
          width={300}
          height={300}
          className='max-xs:size-56'
        />
      </div>
    </div>
  );
};

export default MainLoader;
