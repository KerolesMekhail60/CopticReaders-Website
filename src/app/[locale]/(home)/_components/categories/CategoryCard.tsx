'use client';
import React from 'react';

import Image from 'next/image';

import { Category } from '@/types';

import categoryImage from '@/../public/images/category.png';
import { useRouter } from '@/i18n/routing';
const CategoryCard = ({ category }: { category: Category }) => {
  const router = useRouter();

  const handleClick = () => {
    const queryParams = new URLSearchParams();
    queryParams.set('CategoryIds', category.id ?? '');

    router.push(`/books?${queryParams.toString()}`);
  };
  return (
    <button
      onClick={handleClick}
      className='flex w-[150px] cursor-pointer flex-col items-center justify-center gap-2'
    >
      <Image
        src={categoryImage}
        width={84}
        height={84}
        alt='category image'
      />
      <h2 className='truncate text-center text-sm font-medium'>
        {category.name}
      </h2>
    </button>
  );
};

export default CategoryCard;
