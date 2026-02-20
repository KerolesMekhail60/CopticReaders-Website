'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Languages, Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import UserMenu from './UserMenu';

import { useAuth } from '@/contexts/AuthContext';

import NavBackground from '@/../public/images/nav-background.png';
import Logo from '@/../public/Logo.svg';
import { usePathname as usePathnameRouting, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathnameRouting();
  const locale = useLocale();
  const t = useTranslations('navbar');
  const tPages = useTranslations('pages');
  const router = useRouter();
  const isArabic = locale === 'ar';
  const { isAuthenticated, isLoading } = useAuth();

  /* ---------------- Scroll Effect ---------------- */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ---------------- Language Switcher ---------------- */
  const handleLanguageChange = () => {
    // Toggle between 'ar' and 'en'
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    // Remove the current locale from pathname to avoid duplication
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.replace(pathnameWithoutLocale, { locale: newLocale });
  };

  /* ---------------- Helpers ---------------- */
  const withLocale = (href: string) => `/${locale}${href === '/' ? '' : href}`;

  const isActiveLink = (href: string) => {
    const fullPath = href === '/' ? `/${locale}` : `/${locale}${href}`;
    return pathname === fullPath;
  };

  /* ---------------- Render ---------------- */
  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-[100px] w-full items-center justify-between p-4 text-lg transition-all xl:px-[48px] 2xl:px-[120px]',
        isScrolled ? 'bg-secondary-100 shadow-sm' : 'bg-cover bg-no-repeat',
        isArabic && 'flex-row-reverse',
      )}
      style={{
        backgroundImage: !isScrolled ? `url(${NavBackground.src})` : 'none',
      }}
    >
      {/* ================= Mobile Bar (Logo + Menu) ================= */}
      <div
        className={cn(
          'flex w-full items-center justify-between md:hidden',
          isArabic && 'flex-row-reverse',
        )}
      >
        {/* Logo (mobile) */}
        <Link href={withLocale('/')} className='shrink-0'>
          <Image
            src={Logo}
            alt='Reads Coptic Logo'
            priority
            width={80}
            height={60}
          />
        </Link>

        {/* Mobile Menu (button) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='border text-primary-500 hover:text-primary-400'
            >
              <Menu className='h-8 w-8' />
            </Button>
          </SheetTrigger>

          <SheetContent
            side={isArabic ? 'right' : 'left'}
            className={cn(
              'flex w-[80vw] flex-col justify-between bg-secondary-50 p-6 sm:w-[60vw]',
              isArabic ? 'text-right' : 'text-left',
            )}
          >
            <div>
              <SheetHeader>
                <SheetTitle className='mb-1 text-2xl font-bold text-primary-600'>
                  {t('menu')}
                </SheetTitle>
                <SheetDescription>{t('menuDescription')}</SheetDescription>
              </SheetHeader>

              {/* Links */}
              <div className='mt-6 flex flex-col gap-3'>
                <Link
                  href={withLocale('/')}
                  className={cn(
                    'text-lg font-semibold transition hover:text-primary-600',
                    isActiveLink('/')
                      ? 'text-primary-600 underline underline-offset-4'
                      : 'text-secondary-700',
                  )}
                >
                  {tPages('home')}
                </Link>

                <Link
                  href={withLocale('/books')}
                  className={cn(
                    'text-lg font-semibold transition hover:text-primary-600',
                    isActiveLink('/books')
                      ? 'text-primary-600 underline underline-offset-4'
                      : 'text-secondary-700',
                  )}
                >
                  {tPages('books')}
                </Link>

                <Link
                  href={withLocale('/about')}
                  className={cn(
                    'text-lg font-semibold transition hover:text-primary-600',
                    isActiveLink('/about')
                      ? 'text-primary-600 underline underline-offset-4'
                      : 'text-secondary-700',
                  )}
                >
                  {tPages('about')}
                </Link>

                <Link
                  href={withLocale('/contact')}
                  className={cn(
                    'text-lg font-semibold transition hover:text-primary-600',
                    isActiveLink('/contact')
                      ? 'text-primary-600 underline underline-offset-4'
                      : 'text-secondary-700',
                  )}
                >
                  {tPages('contact')}
                </Link>

                <Link
                  href={withLocale('/donation')}
                  className={cn(
                    'text-lg font-semibold transition hover:text-primary-600',
                    isActiveLink('/donation')
                      ? 'text-primary-600 underline underline-offset-4'
                      : 'text-secondary-700',
                  )}
                >
                  {tPages('donation')}
                </Link>
              </div>

              {/* Language Switcher (inside sheet) */}
              <div className='mt-4 flex justify-center'>
                <Button variant='link' onClick={handleLanguageChange}>
                  <Languages className='ms-2 h-4 w-4' /> |{' '}
                  <span className='font-semibold'>
                    {locale === 'ar' ? 'العربية' : 'English'}
                  </span>
                </Button>
              </div>

              {/* Auth (inside sheet) */}
              <div className='mt-6 flex justify-center'>
                {!isLoading && isAuthenticated ? (
                  <UserMenu />
                ) : (
                  !isLoading && (
                    <Link href={withLocale('/sign-in')}>
                      <Button variant='secondary'>{t('login')}</Button>
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Sheet Footer Logo */}
            <div className='mt-10 flex justify-center'>
              <Link href={withLocale('/')}>
                <Image
                  src={Logo}
                  alt={t('logoAlt')}
                  width={100}
                  height={80}
                  className='opacity-90 transition hover:opacity-100'
                />
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* ================= Desktop Left Side ================= */}
      <div
        className={cn(
          'hidden md:flex items-center gap-4',
          isArabic && 'flex-row-reverse',
        )}
      >
        {/* Login Button or User Menu */}
        {!isLoading && isAuthenticated ? (
          <UserMenu className='hidden md:flex' />
        ) : (
          !isLoading && (
            <Link href={withLocale('/sign-in')} className='hidden md:block'>
              <Button variant='secondary'>{t('login')}</Button>
            </Link>
          )
        )}

        <nav className='hidden items-center gap-8 md:flex'>
          <Link
            href={withLocale('/')}
            className={cn(
              'relative font-bold text-secondary-700 transition hover:text-primary-500',
              isActiveLink('/') && 'text-primary-500 underline underline-offset-8',
            )}
          >
            {tPages('home')}
          </Link>

          <Link
            href={withLocale('/books')}
            className={cn(
              'relative font-bold text-secondary-700 transition hover:text-primary-500',
              isActiveLink('/books') &&
              'text-primary-500 underline underline-offset-8',
            )}
          >
            {tPages('books')}
          </Link>

          <Link
            href={withLocale('/about')}
            className={cn(
              'relative font-bold text-secondary-700 transition hover:text-primary-500',
              isActiveLink('/about') &&
              'text-primary-500 underline underline-offset-8',
            )}
          >
            {tPages('about')}
          </Link>

          <Link
            href={withLocale('/contact')}
            className={cn(
              'relative font-bold text-secondary-700 transition hover:text-primary-500',
              isActiveLink('/contact') &&
              'text-primary-500 underline underline-offset-8',
            )}
          >
            {tPages('contact')}
          </Link>

          <Link
            href={withLocale('/donation')}
            className={cn(
              'relative font-bold text-secondary-700 transition hover:text-primary-500',
              isActiveLink('/donation') &&
              'text-primary-500 underline underline-offset-8',
            )}
          >
            {tPages('donation')}
          </Link>
        </nav>
      </div>

      {/* ================= Desktop Center Logo ================= */}
      <div className='hidden items-center gap-4 md:flex ltr:flex-row-reverse'>
        <Link href={withLocale('/')}>
          <Image src={Logo} alt='Reads Coptic Logo' priority width={100} height={80} />
        </Link>

        <div className='flex items-center'>
          <Button variant='link' onClick={handleLanguageChange}>
            <Languages className='ms-2 h-4 w-4' /> |{' '}
            <span className='font-semibold'>
              {locale === 'ar' ? 'العربية' : 'English'}
            </span>
          </Button>
        </div>
      </div>
    </header>

  );
};

export default Navbar;
