import AboutUsSection from './_components/AboutUsSection';
import AboutVision from './_components/AboutVison';
import Faqs from './_components/Faqs';

import { Vision } from '@/types';

import { getAllDataParallel } from '@/utils/api';

import { Locale } from '@/i18n/i18n.config';

const About = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params;

  const [About, Visions, FAQs] = await getAllDataParallel(
    ['AboutUs/web', 'OurVisions/all', 'FAQs/all'],
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': locale,
      },
    },
  );
  const AboutData = About.result;
  const VisionList = Visions.result;
  const FAQList = FAQs.result;

  return (
    <section className='container space-y-24 px-4 pt-10 md:pt-14'>
      <AboutUsSection
        about={AboutData}
        locale={locale}
      />
      <div className='flex flex-col gap-4'>
        {VisionList.map((vision: Vision) => {
          return (
            <AboutVision
              key={vision.id}
              vision={vision}
            />
          );
        })}
      </div>
      <Faqs
        faqs={FAQList}
        locale={locale as Locale}
      />
    </section>
  );
};
export default About;
