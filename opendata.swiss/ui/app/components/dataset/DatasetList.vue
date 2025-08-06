
<script setup lang="ts">
import type { Dataset } from '../../model/dataset'
import OdsDatasetCardListItem from './DatasetCardListItem.vue'
import OdsDatasetListItem from './DatasetListItem.vue'

interface Props {
  items: Dataset[] | undefined,
  listType: 'card' | 'list'
}
const props = defineProps<Props>()


</script>

<template>
  <ul  v-if="props.items && props.listType === 'card'" class="search-results-list">
    <li  v-for="dataset in props.items" :key="dataset.getId">
      <OdsDatasetCardListItem :item="dataset" />
    </li>
  </ul>

  <ul v-if="props.items && props.listType === 'list'" >
    <li  v-for="dataset in props.items" :key="dataset.getId">
      <OdsDatasetListItem :item="dataset" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ol, ul {
    list-style: none !important;
    margin: 0 !important;
    padding: 0 !important;
}
</style>
