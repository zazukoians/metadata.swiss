import {resolve} from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/content', '@pinia/nuxt'],
  dir:{
    pages: resolve(import.meta.dirname, 'pages'),
  },
  pages: {
    enabled: true,
  },
  routeRules: {
    '/datasets/**': { ssr: false }
  },
})
