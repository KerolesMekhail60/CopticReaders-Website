import React from 'react';

import Image from 'next/image';

import { Vision } from '@/types';

import VisionBackground from '@/../public/images/vision.jpg';

const AboutVision = ({ vision }: { vision: Vision }) => {
  return (
    <div className='relative overflow-hidden rounded-2xl px-6 py-10 md:px-10 md:py-14'>
      <div
        className='absolute inset-0 scale-110'
        style={{
          backgroundImage: `url(${VisionBackground.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(12px)',
        }}
      />

      {/* Color overlay */}
      <div className='absolute inset-0 bg-orange-100 opacity-70' />

      {/* Content */}
      <div className='relative flex items-center justify-between gap-6'>
        <div className='max-w-3xl space-y-4'>
          <h2 className='text-xl font-bold text-[#7A0C0C] md:text-2xl'>
            {vision.title}
          </h2>
          <p className='leading-relaxed text-[#3F3F3F]'>{vision.description}</p>
        </div>

        {/* Icon */}
        <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-md'>
          <Image
            src={vision.imageUrl}
            alt='vision icon'
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutVision;
