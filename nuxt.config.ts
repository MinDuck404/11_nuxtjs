import { resolve } from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  pages: true,
  srcDir: 'src/',
  alias: {
    '@': resolve(__dirname, './src')
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || ''
    }
  },
  modules: [
    // '@nuxtjs/supabase',
    '@pinia/nuxt',
    
  ],
  pinia: {},
  plugins: ['~/plugins/fontawesome.js'],

  css: [
    '@/assets/css/plugins.css',
    '@/assets/css/style.css',
    '@/assets/css/sky.css',
    '@/assets/css/urbanist.css',
    '@fortawesome/fontawesome-free/css/all.min.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unicons.iconscout.com/release/v4.0.8/css/line.css'
        }
      ]
    }
  }
});
