import localizer from "i18next"
import backend from "i18next-fs-backend"
import middleware from "i18next-http-middleware"

const en = require("./locales/en.json")
const es = require("./locales/es.json")

const resources = {
    en,
    es
}

const preload = Object.entries(resources).map(resource => resource[1].culture)

localizer.use(backend).use(middleware.LanguageDetector).init({
    fallbackLng: "en",
    preload,
    resources
})

export default localizer
