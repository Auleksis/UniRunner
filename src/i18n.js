import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import * as ruCommon from "./locales/ru/common.json";
import * as enCommon from "./locales/en/common.json";

i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .init({
    resources: {
      ru: {
        common: ruCommon,
      },
      en: {
        common: enCommon,
      },
    },
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
