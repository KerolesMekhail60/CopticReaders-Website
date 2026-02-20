import Image from 'next/image';

const MainLoader = () => {
  return (
    <div className='relative h-dvh w-full bg-background text-center'>
      <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-3'>
        <Image
          src='/gif/loader.gif'
          alt='Loading...'
          width={400}
          height={400}
          className='size-[250px] xs:size-[400px]'
        />
      </div>
    </div>
  );
};

export default MainLoader;
