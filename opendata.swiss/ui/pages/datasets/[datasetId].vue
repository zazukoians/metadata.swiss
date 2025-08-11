<script setup lang="ts">
import { definePropertyNode, PropertyTable, PropertyTableNode } from '@piveau/sdk-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDatasetsSearch } from '../../app/piveau/search.js'
import { homePageBreadcrumb } from "../../app/composables/breadcrumbs";
import OdsBreadcrumbs from "../../app/components/OdsBreadcrumbs.vue";

const { locale, t } = useI18n();
const route = useRoute()
const datasetId = computed(() => route.params.datasetId as string)

const { useResource } = useDatasetsSearch()
const { isSuccess, resultEnhanced } = useResource(datasetId)

const node = computed(() => definePropertyNode({ id: 'root', data: resultEnhanced.value?.getPropertyTable }, { compact: true, maxDepth: 2 }))

const breadcrumbs = [
  await homePageBreadcrumb(locale),
  {
    title: t('message.header.navigation.datasets'),
    path: '/datasets',
  },
]

if(route.query.search || typeof route.query.search === 'string') {
  breadcrumbs.push({
    title: t('message.dataset_search.search_results'),
    route: {
      path: '/datasets',
      query: Object.fromEntries(new URLSearchParams(decodeURIComponent(route.query.search)))
    }
  })
}

breadcrumbs.push({
  title: resultEnhanced.value?.getTitle,
  path: route.path,
})
</script>

<template>
  <header id="main-header">
    <OdsBreadcrumbs :breadcrumbs="breadcrumbs" />
  </header>
  <div class="dataset-details-page">
    <div v-if="isSuccess">
      <h1>{{ resultEnhanced?.getTitle }}</h1>
      <section class="dataset-description">
        <hr>
        <p>{{ resultEnhanced?.getDescription }}</p>
        <hr>
      </section>
      <section class="dataset-distributions">
        <h2>Distributions</h2>
        <div class="distributions-list">
          <div v-for="distribution in resultEnhanced?.getDistributions" :key="distribution.id" class="distribution-card">
            <h3>{{ distribution.title }}</h3>
            <p>{{ distribution.description }}</p>
            <ul v-if="distribution.accessUrls.length > 0" class="distribution-access-urls">
              <li><a v-for="(link, i) in distribution.accessUrls" :key="`accessUrl@${i}`" :href="link" target="_blank">{{ link }}</a></li>
            </ul>
            <ul v-if="distribution.downloadUrls.length > 0" class="distribution-download-urls">
              <li><a v-for="(link, i) in distribution.downloadUrls" :key="`downloadUrl@${i}`" :href="link" target="_blank">{{ link }}</a></li>
            </ul>
          </div>
        </div>
      </section>
      <hr>
      <section class="dataset-distributions">
        <h2>More information</h2>
        <PropertyTable
          v-slot="{ nodes }"
          as="div"
          class="property-table"
          :node="node"
        >
          <PropertyTableNode :nodes="nodes">
            <template #title="{ title, depth }">
              <span :class="{ 'font-medium': depth <= 0 }"> {{ title }} </span>
            </template>
            <template #item="{ data, depth }">
              <div v-if="data.type === 'node' && depth >= 1" class="property-table-nested">
                <PropertyTableNode :nodes="data.data" :depth="depth + 1">
                  <template #title="{ title }">
                    <span class="font-small">{{ title }}</span>
                  </template>
                </PropertyTableNode>
              </div>
            </template>
          </PropertyTableNode>
        </PropertyTable>
      </section>
    </div>
  </div>
</template>

<style>
.dataset-details-page {
  max-width: 75ch;
}

.dataset-description {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin: 2.5rem 0;
}

.distributions-list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.dataset-distributions {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin: 2.5rem 0;
}

.property-table {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  font-size: .875rem;
}

.property-table-nested {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.font-medium {
  font-size: 1rem;
  font-weight: bold;
}

.font-small {
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
