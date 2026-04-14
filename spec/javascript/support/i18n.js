import { i18n } from '../../../app/javascript/app/plugins/i18n'

export function setLocale(locale = 'pt-BR') {
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
  return i18n
}

export function mountWithI18n(locale = 'pt-BR') {
  return {
    plugins: [setLocale(locale)]
  }
}
