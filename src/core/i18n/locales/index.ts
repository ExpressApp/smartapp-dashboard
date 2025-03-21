import { ruLocale } from './ru'
import { enLocale } from './en'

export const localeResources = {
  en: enLocale,
  ru: ruLocale,
}

const temp = Object.entries(ruLocale.translation).map(([key]) => [key, key])

type LocaleKeys = typeof ruLocale.translation
export const languageKeys: LocaleKeys = Object.fromEntries(temp)
