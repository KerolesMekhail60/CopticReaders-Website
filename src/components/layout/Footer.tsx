'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import Logo from '@/../public/Logo-Footer.svg';

const Footer = () => {
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const links = [
    { href: '/', label: isArabic ? 'الرئيسية' : 'Home' },
    { href: '/about', label: isArabic ? 'من نحن' : 'About' },
    { href: '/books', label: isArabic ? 'الكتب' : 'Books' },
    { href: '/contact', label: isArabic ? 'تواصل معنا' : 'Contact' },
  ];

  return (
    <footer
      className={`mt-10 rounded-t-3xl bg-primary-500 py-10 text-center text-secondary-200 ${
        isArabic ? 'font-[Tajawal]' : 'font-sans'
      }`}
    >
      <div className='container mx-auto flex flex-col items-center justify-center space-y-4'>
        {/* Logo */}
        <div className='relative h-16 w-20 sm:h-20 sm:w-24'>
          <Link href='/'>
            <Image
              src={Logo}
              alt='Logo'
              width={159}
              height={108}
              className='object-contain'
              priority
            />
          </Link>
        </div>

        {/* Links */}
        <nav className='flex flex-wrap justify-center text-white'>
          {links.map((link, idx) => (
            <span
              key={link.href}
              className='flex items-center'
            >
              <Link
                href={link.href}
                className='transition-colors hover:text-gray-50 hover:underline'
              >
                {link.label}
              </Link>
              {idx < links.length - 1 && (
                <span className='mx-2 text-white'> - </span>
              )}
            </span>
          ))}
        </nav>

        <p className='text-xs text-gray-300 sm:text-sm'>
          © {new Date().getFullYear()}{' '}
          {isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
