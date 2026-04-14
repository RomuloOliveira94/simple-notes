import { createApp } from 'vue'
import App from './vue/App.vue'

document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('vue-app')
  if (element) {
    createApp(App).mount(element)
  }
})
