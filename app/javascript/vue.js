import { createApp } from 'vue'
import App from './app/App.vue'
import { i18n } from './app/plugins/i18n'

document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('vue-app')
  if (element) {
    createApp(App).use(i18n).mount(element)
  }
})
