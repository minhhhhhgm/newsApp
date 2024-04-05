
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en , enTrsl} from "./en";
import { vi , viTrsl} from "./vi";

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: en
      },
      vi: {
        translation: vi
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });