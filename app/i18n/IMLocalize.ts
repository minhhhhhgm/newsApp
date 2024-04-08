
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { enTrsl } from "./en";
import { viTrsl } from "./vi";

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: enTrsl
      },
      vi: {
        translation: viTrsl
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });