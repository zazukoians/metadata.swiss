<template>
  <div class="pagination" :class="!field ? 'pagination--extended' : ''">
    <div v-if="field" class="pagination__text">
      {{ pageLabel }}
    </div>
    <input
      v-if="field"
      v-model="currentPage"
      class="pagination__input"
      pattern="\d+"
      :class="computedClasses"
      aria-label="pagination input"
      @input="$emit('pageChange', currentPage)"
    >
    <div v-if="field" class="pagination__text">
      {{ totalPagesLabel }}
    </div>
    <ul class="pagination_items">
      <li v-for="(item, index) in paginationItems" :key="`item-${index}`">
        <PaginationItem
          :icon="item.icon"
          :label="item.label"
          :link="item.link"
          :type="type"
          :disabled="(index === 0 && currentPage === 1) || (index === paginationItems.length - 1 && currentPage === totalPages)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import PaginationItem from './OdsPaginationItem.vue'
import { computed } from 'vue'

const currentPage = defineModel('currentPage', {
  type: Number,
  required: true,
})

defineEmits({
  pageChange: (_page: number) => true,
})

const props = defineProps({
  type: {
    type: String,
    default: () => 'outline',
    validator: (prop) =>
      ['outline', 'outline-negative'].includes(prop as string),
  },
  field: {
    type: Boolean,
    default: () => true,
  },
  totalPagesLabel: {
    type: String,
    default: () => '',
  },
  totalPages: {
    type: Number,
    default: () => Infinity,
  },
  pageLabel: {
    type: String,
    default: () => '',
  },
  paginationItems: {
    type: Array<{ icon?: string; label?: string; link?: any }>,
    default: () => [],
  },
})
console.log(props)
const computedClasses = computed(() => {
  let base = 'input input--base '
  if (props.type) base += `input--${props.type} `
  return base
})
</script>
