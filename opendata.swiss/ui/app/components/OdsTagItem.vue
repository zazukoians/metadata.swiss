<template>
  <span class="tag-item tag-item--base" aria-label="false">
    <span class="tag-item__inner">
      <span class="tag-item__text">{{ label }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
const { label } = defineProps<{
  label: string
}>();
</script>
