<template>
<div>
  <template v-for="row in tableEntries" :key="row.id">
     <div class="info-block border-t" style="display: flex; flex-direction: column;">
      <h3 class="info-block__title">{{ row.label }}</h3>
      <div>
         <div v-if="row.type === 'value'">{{ row.value }}</div>
         <div v-if="row.type === 'href'">
            <OdsExternalLink v-if="row.href && row.href.startsWith('http')" :href="row.href">{{ row.value }}</OdsExternalLink>
            <a v-if="row.href && !row.href.startsWith('http')" :href="row.href">{{ row.value }}</a>
         </div>
      </div>
   </div>
  </template>
</div>


</template>

<script setup lang="ts">

import type { PropertyTableEntry } from '@piveau/sdk-vue';
import OdsExternalLink from '@/components/ExternalLink.vue'
import { definePropertyNode } from '@piveau/sdk-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'


import { useDatasetsSearch } from '../../piveau/search'

interface TableEntry {
  id: string;
  label: string;
  value: string;
  href?: string;
  type: 'value' | 'href';
}

const route = useRoute()
const datasetId = computed(() => route.params.datasetId as string)

const { useResource } = useDatasetsSearch()
const { resultEnhanced } = useResource(datasetId)



const tableEntries = computed(() => {
  const nodeTree = definePropertyNode({ id: 'root', data: resultEnhanced.value?.getPropertyTable }, { compact: true, maxDepth: 5 })
  const flattenedNodes = flattenNode(nodeTree);
  return flattenedNodes;
})

function flattenNode(node: PropertyTableEntry): TableEntry[] {
  if (node.type === 'node') {
    const valueNodes = node.data?.filter(n => n.type === 'value') ?? [];
    const hrefNodes = node.data?.filter(n => n.type === 'href') ?? [];
    const nestedNodes = node.data?.filter(n => n.type === 'node') ?? [];

    const valueEntries: TableEntry[] = valueNodes.map(n => ({
      id: n.id,
      label: node.label || '',
      value: n.data || '',
      type: 'value'
    }));

    const hrefEntries: TableEntry[] = hrefNodes.map(n => ({
      id: n.id,
      label: node.label || '',
      value: n.data.label || '',
      href: n.data.href || '',
      type: 'href'
    }));
    const nestedEntries: TableEntry[] = nestedNodes.flatMap(n => flattenNode(n));
    return [...valueEntries, ...hrefEntries, ...nestedEntries];
  }

  return [];

}
</script>

<style lang="scss">

</style>
