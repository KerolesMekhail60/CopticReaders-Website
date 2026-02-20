export const i18n = {
  // A list of all locales that are supported
  locales: ['ar', 'en'],

  // Used when no locale matches
  defaultLocale: 'ar',
} as const;

export type Locale = (typeof i18n)['locales'][number];
