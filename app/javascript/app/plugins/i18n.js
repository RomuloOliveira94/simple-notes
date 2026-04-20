import { createI18n } from 'vue-i18n'
import ptBR from '../../shared/i18n/locales/pt-BR'

const messages = {
  'pt-BR': ptBR
}

export const i18n = createI18n({
  legacy: false,
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages
})

export function translate(key, values = {}) {
  return i18n.global.t(key, values)
}
