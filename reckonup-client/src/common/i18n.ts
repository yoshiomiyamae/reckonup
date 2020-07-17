import i18next, { TFunction, i18n } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import ja from '../locales/ja.json';

i18next.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ja: {
      translation: ja,
    },
  },
  fallbackLng: 'en',
});

export interface LocalizationProps {
  t?: TFunction;
  i18n?: i18n;
  tReady?: boolean;
}