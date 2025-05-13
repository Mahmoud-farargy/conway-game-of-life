import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'

let locale = 'en';
try {
  const savedLocale = localStorage.getItem('conway')
  if (savedLocale) {
    const parsed = JSON.parse(savedLocale)
    const userLang = parsed?.settings?.language
    if (typeof userLang === 'string') {
      locale = userLang
    }
  }
} catch (e) {
  console.warn('Failed to parse locale from localStorage:', e)
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: locale,
  fallbackLocale: 'en',
  messages: {
    en,
    de,
  },
})

export default i18n
