import React from 'react';

import Image from 'next/image';

import { Card } from '../ui/card';

import { SocialMediaItem } from '@/types';

import { getAllData } from '@/utils/api';

import social from '@/../public/images/social-background.png';
import { Locale } from '@/i18n/i18n.config';

const SocialMedia = async ({ locale }: { locale: Locale }) => {
  const isEnglish = locale === 'en';
  const SocialMedia = await getAllData('SocialMedia/all', {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
    },
  });
  const socialMediaData = SocialMedia.result as SocialMediaItem[];

  return (
    <main className='container mx-auto'>
      <Card
        style={{
          backgroundImage: `url(${social.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className={`mb-8 mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl px-6 py-8 shadow-sm md:flex-row`}
      >
        {/* Icons */}

        {/* Text */}
        <div className='max-w-[418px] text-center text-2xl font-bold text-primary-500 sm:text-3xl md:text-4xl'>
          {isEnglish ? (
            <>
              Follow us on{' '}
              <span className='text-secondary-700'>Social Media</span>
            </>
          ) : (
            <>
              تابعنا على{' '}
              <span className='text-secondary-700'>
                وسائل التواصل الاجتماعي
              </span>
            </>
          )}
        </div>
        <div className='flex items-center justify-center gap-4'>
          {socialMediaData.map((item: SocialMediaItem) => (
            <a
              key={item.id}
              href={
                item.url.startsWith('http') ? item.url : `https://${item.url}`
              }
              target='_blank'
              rel='noopener noreferrer'
              title={isEnglish ? item.nameEn : item.nameAr}
              className='transition-transform hover:scale-110'
            >
              <Image
                src={item.iconUrl}
                alt={item.nameEn}
                className='h-8 w-8 sm:h-10 sm:w-10'
                width={40}
                height={40}
              />
            </a>
          ))}
        </div>
      </Card>
    </main>
  );
};

export default SocialMedia;
