
<script setup lang="ts">
import type { Dataset } from '../../model/dataset'
import OdsDatasetCardListItem from './OdsDatasetCardListItem.vue'
import OdsDatasetListItem from './OdsDatasetListItem.vue'
import type { LocationQueryRaw } from "#vue-router"

interface Props {
  items: Dataset[] | undefined,
  listType: 'card' | 'list'
  searchParams?: LocationQueryRaw
}
const props = defineProps<Props>()

const searchParamsEncoded = computed(() => {
  const params = new URLSearchParams(props.searchParams || {})
  return {
    search: params.toString(),
  }
})
</script>

<template>
  <div  v-if="props.items && props.listType === 'card'" class="ods-card-list">
    <ul class="search-results-list">
      <li  v-for="dataset in props.items" :key="dataset.getId">
        <OdsDatasetCardListItem :item="dataset" :search-params="searchParamsEncoded" />
      </li>
    </ul>
  </div>

  <ul v-if="props.items && props.listType === 'list'" >
    <li  v-for="dataset in props.items" :key="dataset.getId">
      <OdsDatasetListItem :item="dataset" :search-params="searchParamsEncoded" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ol, ul {
    list-style: none !important;
    margin: 0 !important;
    padding: 0 !important;
}

.ods-card-list {
        margin-top: 2.5rem !important;
}

@media (min-width: 1024px) {
  .ods-card-list {
        margin-top: 3rem !important;
  }
}
@media (min-width: 640px) {
  .ods-card-list {
        margin-top: 2.25rem !important;
  }
}
@media (min-width: 480px) {
    .ods-card-list {
        margin-top: 1.75rem !important;
  }
}
</style>
