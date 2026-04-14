import { createApp } from 'vue'
import Home from './pages/Home.vue'

document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('vue-app')
  if (element) {
    createApp(Home).mount(element)
  }
})
