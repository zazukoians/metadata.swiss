import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/content', '@pinia/nuxt',
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
    '/datasets/**': { ssr: false }
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
})
