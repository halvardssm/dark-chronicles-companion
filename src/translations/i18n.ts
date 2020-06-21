import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
// @ts-ignore
// import languageFiles from "./*.json";
const languageFiles = {};
export const languageOrder = ["en"];
const langResources = {};

languageOrder.forEach((lang) => {
  langResources[lang] = { translation: languageFiles[lang] };
});

i18next
  .use(LanguageDetector)
  .use(initReactI18next);
i18next.init({
  interpolation: {
    escapeValue: false,
  },
  debug: process.env.NODE_ENV !== "production",
  load: "languageOnly",
  fallbackLng: languageOrder,
  nsSeparator: ":::",
  keySeparator: "::",
  returnNull: false,
  returnEmptyString: false,
  resources: langResources,
  react: {
    wait: false,
    bindI18n: "languageChanged loaded",
    bindStore: "added removed",
    nsMode: "default",
    transSupportBasicHtmlNodes: true,
  },
});

export default i18next;
