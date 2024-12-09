import { initReactI18next } from "react-i18next";
import i18n, { setDefaultNamespace } from "i18next";
import LanguageDetector from "i18next-browser-languageDetector";
import HttpBackend from "i18next-http-backend";
import { TRANSLATIONS_NAMESPACES, SUPPORTED_LANGUAGES, TRANSLATIONS_DEFAULT_NAMESPACE } from "./config"

import Resources from "./resources.d";

declare module "i18next" {
    interface CustomTypeOptions {
        resources: Resources;
    }
}

i18n.use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: SUPPORTED_LANGUAGES[0],
        ns: [TRANSLATIONS_NAMESPACES.SHARED, TRANSLATIONS_NAMESPACES.AUTH, TRANSLATIONS_NAMESPACES.SETTNGS],
        defaultNS: TRANSLATIONS_DEFAULT_NAMESPACE,
        // debug: true,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: "/i18n/translations/{{lng}}/{{ns}}.json",
        },
        // detection: {
        //     order: ["navigator", "htmlTag", "cookie", "localStorage", "sessionStorage", "path", "subdomain"],
        //     caches: ["cookie"], // Cache metódy na uloženie jazyka (voliteľné)
        // },
    });




export default i18n;
