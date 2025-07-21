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
            <v-container>
              <NuxtPage :page-key="route => route.fullPath" />
            </v-container>
          </v-main>
          <OdsBottomFooter />
        </v-app>
      </NuxtLayout>
    </main>

</template>

<script setup lang="ts">

import './assets/main.css'
import OdsBottomFooter from '@/components/footer/OdsBottomFooter.vue'

</script>
