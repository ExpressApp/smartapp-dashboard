import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { localeResources } from './locales'

export const APP_LANGUAGES = {
  ru: 'ru',
  en: 'en',
}

i18n.use(initReactI18next).init({
  fallbackLng: APP_LANGUAGES.ru,
  returnNull: false,
  resources: localeResources,
})

export type APP_LANGUAGES_TYPE = keyof typeof APP_LANGUAGES
export const changeLanguage = (lang: APP_LANGUAGES_TYPE) => i18n.changeLanguage(lang)
export default i18n
