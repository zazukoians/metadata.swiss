<template>
    <main id="main-content">
      <NuxtLayout>
        <v-app>
          <v-app-bar app>
            <v-toolbar-title>Linda's Next Piveau</v-toolbar-title>
            <v-spacer />
            <v-btn text to="/">Home</v-btn>
            <v-btn text to="/datasets">Datasets</v-btn>
            <v-btn text to="/about">About</v-btn>
          </v-app-bar>
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

import './assets/main.css'
import OdsBottomFooter from '@/components/footer/OdsBottomFooter.vue'
import OdsFooter from './components/footer/OdsFooter.vue';

</script>
