import React from 'react';

import HeroBackground from '@/../public/images/hero-background.png';

const HeroSection = ({ locale }: { locale: string }) => {
  const isEnglish = locale === 'en';

  return (
    <section
      className='flex min-h-[60vh] w-full items-center justify-center bg-cover bg-center bg-no-repeat px-4 text-center sm:px-6 md:px-10'
      style={{
        backgroundImage: `url(${HeroBackground.src})`,
      }}
    >
      <p
        className={`max-w-[850px] font-bold leading-snug text-primary-500 ${
          isEnglish
            ? 'text-[28px] sm:text-[36px] md:text-[44px] lg:text-[56px]'
            : 'text-[26px] sm:text-[34px] md:text-[42px] lg:text-[54px]'
        }`}
        dir={isEnglish ? 'ltr' : 'rtl'}
      >
        {isEnglish ? (
          <>
            Read, Reflect, and Grow Spiritually <br />
            <span className='text-secondary-700'>
              A complete library of Christian books
            </span>
          </>
        ) : (
          <>
            اقرأ، تأمل، وانمو روحيًا <br />
            <span className='text-secondary-700'>
              مكتبة متكاملة للكتب المسيحية
            </span>
          </>
        )}
      </p>
    </section>
  );
};

export default HeroSection;
