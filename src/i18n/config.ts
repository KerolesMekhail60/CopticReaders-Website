import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { currency, datetime, number } from './formatters';

export const supportedLngs = {
  en: 'English',
  ar: 'Arabic',
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Fallback locale used when a translation is
    // missing in the active locale. Again, use your
    // preferred locale here.
    fallbackLng: 'en',

    // Explicitly tell i18next our
    // supported locales.
    supportedLngs: Object.keys(supportedLngs),
    // Enables useful output in the browser’s
    // dev console.
    debug: true,

    // Normally, we want `escapeValue: true` as it
    // ensures that i18next escapes any code in
    // translation messages, safeguarding against
    // XSS (cross-site scripting) attacks. However,
    // React does this escaping itself, so we turn
    // it off in i18next.
    interpolation: {
      escapeValue: false,
    },
  });

i18n.services.formatter?.add('number', number);
i18n.services.formatter?.add('currency', currency);
i18n.services.formatter?.add('datetime', datetime);
export default i18n;
