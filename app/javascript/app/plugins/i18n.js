import { createI18n } from 'vue-i18n'
import en from '../../shared/i18n/locales/en'
import ptBR from '../../shared/i18n/locales/pt-BR'

const SUPPORTED_LOCALES = ['pt-BR', 'en']

const messages = {
  'pt-BR': ptBR,
  en
}

function normalizeLocale(locale) {
  if (!locale) {
    return 'pt-BR'
  }

  if (locale.startsWith('pt')) {
    return 'pt-BR'
  }

  if (locale.startsWith('en')) {
    return 'en'
  }

  return 'pt-BR'
}

export function resolveInitialLocale(element) {
  const fromElement = element?.dataset?.locale
  const fromHtml = document.documentElement.lang
  const fromNavigator = navigator.language

  return normalizeLocale(fromElement || fromHtml || fromNavigator)
}

export const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'en',
  messages
})

export function translate(key, values = {}) {
  return i18n.global.t(key, values)
}

export { SUPPORTED_LOCALES }
