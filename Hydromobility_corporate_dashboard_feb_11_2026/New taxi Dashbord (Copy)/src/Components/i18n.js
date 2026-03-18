import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../Components/Language/en.json";
import sw from "../Components/Language/sw.json";

const getSavedLanguage = () => {
  try {
    return localStorage.getItem("language") || "en";
  } catch (error) {
    return "en";
  }
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    sw: { translation: sw },
  },
  lng: getSavedLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
  localStorage.setItem("language", lng);
};

export default i18n;
