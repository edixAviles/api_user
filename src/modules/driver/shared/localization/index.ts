import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import es from "./locales/es.json"
import en from "./locales/en.json"

const resources = {
    es,
    en
}

i18n.use(initReactI18next).init({
    lng: "en",
    resources,
    interpolation: {
        escapeValue: false
    }
})

export default i18n
