import i18n, { InitOptions } from 'i18next';
import LanguageDetector, {
  DetectorOptions,
} from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { currency, datetime, number } from './formatters';

export const supportedLngs: Record<string, string> = {
  en: 'English',
  ar: 'Arabic',
};

const options: InitOptions = {
  fallbackLng: 'en',
  supportedLngs: Object.keys(supportedLngs),

  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
    lookupLocalStorage: 'i18nextLng',

    checkSupportedLngs: true,
  } as DetectorOptions,

  debug: process.env.NODE_ENV === 'development',

  interpolation: {
    escapeValue: false,
  },
};

i18n.use(HttpApi).use(LanguageDetector).use(initReactI18next).init(options);

if (i18n.services.formatter) {
  i18n.services.formatter.add('number', number);
  i18n.services.formatter.add('currency', currency);
  i18n.services.formatter.add('datetime', datetime);
}

const storedLang = localStorage.getItem('i18nextLng');
if (storedLang && !Object.keys(supportedLngs).includes(storedLang)) {
  localStorage.removeItem('i18nextLng');
  i18n.changeLanguage('en');
}

export default i18n;
