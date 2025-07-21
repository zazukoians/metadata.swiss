<template>


    <main id="main-content">
      <NuxtLayout>
      <NuxtPage :page-key="route => route.fullPath" />
      </NuxtLayout>
    </main>

</template>

<script setup lang="ts">

import './assets/main.css'


</script>
