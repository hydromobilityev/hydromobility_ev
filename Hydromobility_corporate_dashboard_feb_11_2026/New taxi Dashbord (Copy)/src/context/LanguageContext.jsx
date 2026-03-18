import { createContext, useState, useContext, useEffect } from "react";
import i18n from "../Components/i18n";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const storedLang = localStorage.getItem("app_language");
    return storedLang === "sw" || storedLang === "en" ? storedLang : "en";
  });

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }

    const handleLanguageChange = (lng) => {
      if (lng === "en" || lng === "sw") {
        setLanguage(lng);
        localStorage.setItem("app_language", lng);
      } else {
        i18n.changeLanguage("en");
        setLanguage("en");
        localStorage.setItem("app_language", "en");
      }
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [language]);

  const changeLanguage = (lng) => {
    if (lng === "en" || lng === "sw") {
      i18n.changeLanguage(lng);
      setLanguage(lng);
      localStorage.setItem("app_language", lng);
    } else {
      i18n.changeLanguage("en");
      setLanguage("en");
      localStorage.setItem("app_language", "en");
    }
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "sw" : "en";
    changeLanguage(newLang);
  };

  const isSwahili = () => language === "sw";

  const isEnglish = () => language === "en";

  const value = {
    language,
    changeLanguage,
    toggleLanguage,
    isSwahili,
    isEnglish,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
