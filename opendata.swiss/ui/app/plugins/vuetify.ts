// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css';

import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'


import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'


const odsTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#FEFEFE",
    primary: "#009688", //ods green #009688
    "primary-darken-1": "#026b60", // osd green darker #026b60
    secondary: "#e73600", // ods orange #e73600
    "secondary-darken-1": "#952300", // ods orange #952300
    error: "#952300",
    info: "#000000",
    success: "#000000",
    warning: "#000000",
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        fa,
        mdi,
      },
    },
    theme: {
      defaultTheme: "odsTheme",
      themes: {
        odsTheme,
      },
    },
    ssr: true,
  })
  app.vueApp.use(vuetify)
})
