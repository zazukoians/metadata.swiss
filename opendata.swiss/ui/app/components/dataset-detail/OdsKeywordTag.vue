<template>
<a :href="props.link" type="false" class="tag-item tag-item--base" aria-label="false">
  <span class="tag-item__inner">
    <span class="tag-item__text">{{ props.label }}</span>
  </span>
</a>
</template>


<script setup lang="ts">

const props = defineProps<{
  link: string
  label: string
}>()
</script>
