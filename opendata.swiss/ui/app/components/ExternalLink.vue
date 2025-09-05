<template>
  <OdsButton icon="External" variant="link" size="sm" icon-right>
    <a
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
    >
      <slot />
    </a>
  </OdsButton>
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
