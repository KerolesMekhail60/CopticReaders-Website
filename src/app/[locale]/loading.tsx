import Image from 'next/image';

function Loading() {
  return (
    <div className='absolute top-0 z-50 block h-screen w-full overflow-clip bg-primary-500 text-center'>
      <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-3'>
        <Image
          src='/gif/loader-2.gif'
          alt='Loading...'
          width={300}
          height={300}
          className='object-contain max-xs:size-60'
          quality={150}
        />
      </div>
    </div>
  );
}
export default Loading;
