<template>


    <main id="main-content">
      <NuxtLayout>
      <NuxtPage :page-key="route => route.fullPath" />
      </NuxtLayout>
    </main>

</template>
