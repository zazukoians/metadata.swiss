<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot></slot>
    <v-icon
      icon="mdi:mdi-open-in-new"
      aria-hidden="true"
      size="18"
    />
  </a>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  href: string
  ariaLabel?: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
   
</style>