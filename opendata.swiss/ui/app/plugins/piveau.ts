import { piveauKitPlugin } from '@piveau/sdk-vue'

export default defineNuxtPlugin(nuxt => {
  nuxt.vueApp.use(piveauKitPlugin)
})
