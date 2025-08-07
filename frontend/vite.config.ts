import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { version } from './package.json'


import svgLoader from 'vite-plugin-svg-loader';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader()
  ],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  base: '/'
})
