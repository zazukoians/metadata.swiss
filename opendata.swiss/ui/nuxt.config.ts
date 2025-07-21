import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/content', '@pinia/nuxt', '@nuxtjs/i18n',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true }))
      })
    },
  ],
  dir: {
    pages: resolve(import.meta.dirname, 'pages'),
  },
  pages: {
    enabled: true,
  },
  routeRules: {
    '/datasets/**': { ssr: false },
    '/en/datasets/**': { ssr: false },
    '/de/datasets/**': { ssr: false },
    '/fr/datasets/**': { ssr: false },
    '/it/datasets/**': { ssr: false },
  },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  plugins: [
    { src: '~/plugins/piveau', mode: 'client' },
  ],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', name: 'Francais', file: 'fr.json' },
      { code: 'it', name: 'Itlaliano', file: 'it.json' },
    ]
  }
})
