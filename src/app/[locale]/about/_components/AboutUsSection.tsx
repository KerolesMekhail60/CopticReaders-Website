import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { About } from '@/types';

import { Locale } from '@/i18n/i18n.config';

const AboutUsSection = ({
  about,
  locale,
}: {
  about: About;
  locale: Locale;
}) => {
  return (
    <div className='grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-[84px]'>
      {/* Content */}
      <div className='space-y-8'>
        <h1 className='text-[32px] font-bold text-primary-500'>{about.title}</h1>
        <p className='text-xl text-[#434343]'>{about.description}</p>
        <div className='flex justify-start'>
          <Link href={`/${locale}/contact`}>
            <Button variant='secondary'>
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </Button>
          </Link>
        </div>
      </div>

      <div className='flex justify-center md:justify-end'>
        <Image
          src={about?.imageUrl ?? ''}
          alt='About image'
          width={500}
          height={500}
          className='h-auto max-h-[300px] w-full rounded-lg object-contain md:max-h-[450px]'
          priority
        />
      </div>
    </div>
  );
};

export default AboutUsSection;
