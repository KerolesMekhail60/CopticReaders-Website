'use client';

import { useEffect } from 'react';

import { useLocale } from 'next-intl';

export default function HtmlAttributes() {
  const locale = useLocale();

  useEffect(() => {
    // Set html lang and dir attributes based on locale
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  return null;
}
