import Image from 'next/image';

import { getAllDataParallel } from '@/utils/api';

import 'quill/dist/quill.core.css';

import { Locale } from '@/i18n/i18n.config';

const Donation = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;
  const [Donations] = await getAllDataParallel(['Donations/all'], {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
    },
  });

  const selectedDonation = Donations.result?.[0];
  if (!selectedDonation) {
    return (
      <section className='container py-20 text-center text-gray-500'>
        {locale === 'ar' ? 'لا توجد بيانات تبرعات' : 'No donation data found'}
      </section>
    );
  }

  return (
    <section className='container px-4 pt-10 md:pt-14'>
      <div className='grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10'>
        {/* Content */}
        <div
          className='ql-editor mx-auto max-w-none text-sm leading-relaxed sm:text-base'
          dangerouslySetInnerHTML={{
            __html: selectedDonation?.description,
          }}
        />

        <div className='flex justify-center md:justify-end'>
          <Image
            src={selectedDonation?.imageUrl ?? ''}
            alt='donation image'
            width={500}
            height={500}
            className='h-auto max-h-[300px] w-full rounded-lg object-contain md:max-h-[450px]'
            priority
          />
        </div>
      </div>
    </section>
  );
};
export default Donation;
