import { Metadata } from 'next';
import { Open_Sans, Tajawal } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import TokenHandler from '@/components/Auth/TokenHandler';
import Footer from '@/components/layout/Footer';
import HtmlAttributes from '@/components/layout/HtmlAttributes';
import Navbar from '@/components/layout/Navbar';
import SocialMedia from '@/components/layout/SoicalMedia';
import ToasterWrapper from '@/components/shared/ToasterWrapper';

import { AuthProvider } from '@/contexts/AuthContext';

import { Params } from '@/types';

import './../globals.css';

import { Locale } from '@/i18n/i18n.config';
import { routing } from '@/i18n/routing';
import ReactQueryProvider from '@/providers/react-query-provider';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

const tajawal = Tajawal({
  variable: '--font-tajawal',
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Coptic Readers',
  description: 'Coptic Readers',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlAttributes />
      <div
        className={`${openSans.variable} ${tajawal.variable} antialiased`}
        style={{
          fontFamily:
            locale === 'ar' ? 'var(--font-tajawal)' : 'var(--font-open-sans)',
        }}
      >
        <ReactQueryProvider>
          <AuthProvider>
            <TokenHandler />
            <Navbar />
            {children}
            <SocialMedia locale={locale as Locale} />
            <Footer />
            <ToasterWrapper />
          </AuthProvider>
        </ReactQueryProvider>
      </div>
    </NextIntlClientProvider>
  );
}
