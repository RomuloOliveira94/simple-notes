import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./app/javascript', import.meta.url)),
      '@app': fileURLToPath(new URL('./app/javascript/app', import.meta.url)),
      '@shared': fileURLToPath(new URL('./app/javascript/shared', import.meta.url)),
      '@modules': fileURLToPath(new URL('./app/javascript/modules', import.meta.url))
    }
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['spec/javascript/**/*.spec.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: 'coverage/frontend'
    }
  }
})
