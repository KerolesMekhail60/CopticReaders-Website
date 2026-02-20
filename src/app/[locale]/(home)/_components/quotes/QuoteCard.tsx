import React from 'react';

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { QuoteItem } from '@/types';

import background from '@/../public/images/social-background.png';
const QuoteCard = ({ quote }: { quote: QuoteItem }) => {
  return (
    <Card
      className='flex flex-col justify-between gap-2 pt-6'
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <CardHeader>
        <CardTitle className='text-xl font-bold text-primary-500'>
          {quote.quote}
        </CardTitle>
      </CardHeader>
      <p className='px-6 font-bold text-secondary-700'>{quote.reference}</p>
      <CardFooter>
        <p className='text-sm text-gray-500'>{quote.author}</p>
      </CardFooter>
    </Card>
  );
};

export default QuoteCard;
