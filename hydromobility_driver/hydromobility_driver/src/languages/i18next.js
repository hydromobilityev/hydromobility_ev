import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en.json';
import sw from './sw.json';

export const i18nInitPromise = (async () => {
  const savedLang = await AsyncStorage.getItem('language');
  const selectedLanguage = savedLang || 'en';

  await i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
      en: {translation: en},
      ar: {translation: sw},
    },
    lng: selectedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  return true;
})();

export default i18n;
