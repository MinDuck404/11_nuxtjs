import { resolve } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  alias: {
    '@': resolve(__dirname, './src')
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore']
        ]
      }
    ]
  ],
  css: [
    '@/assets/css/plugins.css',
    '@/assets/css/style.css',
    '@/assets/css/sky.css',
    '@/assets/css/urbanist.css',
    '@fortawesome/fontawesome-free/css/all.min.css',
  ],
})


