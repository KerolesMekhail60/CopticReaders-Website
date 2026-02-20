import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import thank from '@/../public/svgs/thank-you.svg';
const ThankYouDialog = ({
  name,
  open,
  setOpen,
  locale,
}: {
  name: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  locale: string;
}) => {
  const isEnglish = locale === 'en';
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className='flex flex-col items-center justify-center border-0 bg-primary-500 py-12 sm:max-w-[748px]'>
        <Image
          src={thank}
          alt='Thank you'
          width={135}
          height={80}
        />

        <DialogHeader>
          <DialogTitle className='mb-2 text-center text-3xl font-normal text-grayish-50'>
            {isEnglish ? `Thank you, ${name}!` : `شكراً لك يا ${name}!`}
          </DialogTitle>
          <DialogDescription className='text-center text-grayish-200'>
            {isEnglish
              ? 'Thanks for reaching out! Our expert will contact you soon to discuss your goals. Meanwhile, explore our services or follow us for more inspiration.'
              : 'شكرًا لتواصلك معنا! سيتواصل معك أحد خبرائنا قريبًا لمناقشة أهدافك. وفي هذه الأثناء، يمكنك استكشاف خدماتنا أو متابعتنا لمزيد من الإلهام.'}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default ThankYouDialog;
