import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from "../src/locales/en/trans.json"
import hiTranslation from './../src/locales/hi/trans.json';
import odTranslation from "./../src/locales/od/trans.json"; 

i18n
.use(LanguageDetector) 
.use(initReactI18next)
.init({
  resources: {
    en: { translation: enTranslation },
    hi: { translation: hiTranslation },
    od: { translation: odTranslation }
  },
  fallbackLng: localStorage.getItem('language') || 'en', 
  interpolation: {
    escapeValue: false
  }
});

export default i18n;