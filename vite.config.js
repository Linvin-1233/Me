import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@public': fileURLToPath(new URL('./public', import.meta.url))
    },
  },
  server: {
    host: true,
    port: 4000,
    proxy: {
      '/api-analyzer': {
        target: 'https://github-analyzer.linvin.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-analyzer/, '')
      }
    },
  }
})
