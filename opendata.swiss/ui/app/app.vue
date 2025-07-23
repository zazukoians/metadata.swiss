<template>
    <main id="main-content">
      <NuxtLayout>
        <v-app>
          <OdsTopHeader :enable-authentication="true" :authenticated="false" :username="undefined" />
          <OdsHeader :navigation-items="navigationItems" />
         <!-- <v-app-bar app>
            <v-toolbar-title>Linda's Next Piveau</v-toolbar-title>
            <v-spacer />
            <v-btn text to="/">Home</v-btn>
            <v-btn text to="/datasets">Datasets</v-btn>
            <v-btn text to="/about">About</v-btn>
          </v-app-bar>-->
          <v-main>
            <v-container :style="'min-height: calc(100vh - 64px);'">
              <NuxtPage :page-key="route => route.fullPath" />
            </v-container>
          </v-main>
          <OdsFooter />
          <OdsBottomFooter />
        </v-app>
      </NuxtLayout>
    </main>

</template>

<script setup lang="ts">

import OdsTopHeader from './components/headers/OdsTopHeader.vue'
import OdsHeader from './components/headers/OdsHeader.vue';
import OdsBottomFooter from '@/components/footer/OdsBottomFooter.vue'
import OdsFooter from './components/footer/OdsFooter.vue';
import type { OdsNavTabItem } from './components/headers/model/ods-nav-tab-item';
import { APP_NAVIGATION_ITEMS } from './constants/navigation-items';

const navigationItems = ref<OdsNavTabItem[]>(APP_NAVIGATION_ITEMS);

useHead({
  bodyAttrs: {
    class: 'body--ods-brand'
  }
})
</script>
