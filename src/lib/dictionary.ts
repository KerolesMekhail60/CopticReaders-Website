import 'server-only';
import { Locale } from '@/i18n/i18n.config';

const dictionaries = {
  en: () => import('../../messages/en.json').then((module) => module.default),
  ar: () => import('../../messages/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
