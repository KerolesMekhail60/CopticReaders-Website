'use client';

import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { FAQ } from '@/types';

import { Locale } from '@/i18n/i18n.config';

const Faqs = ({ faqs, locale }: { faqs: FAQ[]; locale: Locale }) => {
  const isArabic = locale === 'ar';

  return (
    <div className='container space-y-6 px-4 pt-10 md:pt-14'>
      <h2 className='text-center text-[36px] font-bold text-primary-500'>
        {isArabic ? 'الأسئلة الشائعة' : 'FAQs'}
      </h2>

      <Accordion
        type='single'
        collapsible
        className='w-full'
        defaultValue={faqs[0].id}
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={faq.id ?? index}
            value={faq.id ?? index}
          >
            <AccordionTrigger className='text-start text-[24px] font-bold data-[state=closed]:text-neutral-900 data-[state=open]:text-primary-500'>
              {faq.question}
            </AccordionTrigger>

            <AccordionContent className='text-[20px] text-[#161616]'>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faqs;
