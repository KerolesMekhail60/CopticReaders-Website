import React from 'react';

type HeaderSectionProps = {
  src: string;
  title: string;
};
const HeaderSection = ({ src, title }: HeaderSectionProps) => {
  return (
    <section
      className='relative flex h-60 items-center justify-center bg-center bg-no-repeat text-xl font-bold text-secondary-50 md:h-72 md:text-2xl xl:h-96 xl:text-3xl'
      style={{
        backgroundImage: `url(${src})`,
      }}
    >
      <div
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(260.07deg, hsla(40, 55%, 95%, 0.5) 24.61%, hsla(40, 45%, 88%, 0.5) 92.8%)',
        }}
      />

      <h1 className='relative pt-20 capitalize'>{title}</h1>
    </section>
  );
};

export default HeaderSection;
