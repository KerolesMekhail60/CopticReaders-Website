import { PageLink } from '@/types';
import { FormFilterFields } from '@/types/global';

export const PAGES: PageLink[] = [
  { labelEn: 'Home', labelAr: 'الرئيسية', href: '/' },
  { labelEn: 'Books', labelAr: 'الكتب', href: '/books' },
  { labelEn: 'About Us', labelAr: 'معلومات عنا', href: '/about' },
  { labelEn: 'Donation', labelAr: 'التبرع', href: '/donation' },
  { labelEn: 'Contact Us', labelAr: 'تواصل معنا', href: '/contact' },
];

export const defaultValues: FormFilterFields = {
  AuthorId: '',
  CategoryId: '',
  Search: '',
};
