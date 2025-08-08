<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
    <v-icon
      icon="mdi:mdi-open-in-new"
      aria-hidden="true"
      size="18"
    />
  </a>
</template>

<script setup lang="ts">

interface Props {
  href: string
  ariaLabel?: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>

</style>
