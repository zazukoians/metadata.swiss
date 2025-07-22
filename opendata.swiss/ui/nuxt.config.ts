import {resolve} from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/ui-pro',
  ],
  css: [
    '~/assets/main.css',
  ],
  dir:{
    pages: resolve(import.meta.dirname, 'pages'),
  },
  pages: {
    enabled: true,
  },
  routeRules: {
    '**': { ssr: false }
  },
  i18n: {
    defaultLocale: 'de',
    strategy: 'prefix',
    locales: [
      { code: 'de', name: 'English', file: 'de.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' },
      { code: 'it', name: 'Italiano', file: 'it.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ]
  },
})
