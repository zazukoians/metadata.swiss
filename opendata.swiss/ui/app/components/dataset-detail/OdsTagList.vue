<template>
<ul class="list list--flex list--wrap">
  <li v-for="(c, index) in props.tags" :key="index">
    <OdsKeywordTag :link="c.resource" :label="c.label.en ?? ''" />
  </li>
</ul>
</template>

<script setup lang="ts">

import OdsKeywordTag from '@/components/dataset-detail/OdsKeywordTag.vue'

import type { Category } from '@piveau/sdk-core';
const props = defineProps<{
  tags: Category[]
}>()
</script>
