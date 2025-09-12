<template>
<div>
  <template v-for="entry in props.tableEntries" :key="entry.id">
    <OdsInfoBlock :title="entry.label">
      <template v-for ="(data, index) in entry.value" :key="index">
        <span v-if="data.type === 'value'">{{ data.value }}</span>
        <span v-if="data.type === 'href'">
          <a :href="data.href" target="_blank" rel="noopener noreferrer" class="link--external">{{ data.value }}</a>
        </span>
        <span v-if="data.type === 'email'">
          <a :href="`mailto:${data.href}`">&lt;{{ data.value }}&gt;</a>
        </span>
        <span>&nbsp;</span>
      </template>
    </OdsInfoBlock>
  </template>
</div>


</template>

<script setup lang="ts">

import type { TableEntry } from './model/table-entry';

const props = defineProps({
  tableEntries: {
    type: Array as PropType<TableEntry[]>,
    required: true
  }
})

</script>

<style lang="scss">

</style>
