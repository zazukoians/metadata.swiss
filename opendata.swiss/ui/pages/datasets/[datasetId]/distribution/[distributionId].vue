<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDatasetsSearch } from '../../../../app/piveau/search.js'
import { homePageBreadcrumb } from "../../../../app/composables/breadcrumbs.js";
import OdsDetailTermsOfUse from '../../../../app/components/dataset-detail/OdsDetailTermsOfUse.vue';
import OdsDetailsTable from '../../../../app/components/dataset-detail/OdsDetailsTable.vue'
import OdsBreadcrumbs from "../../../../app/components/OdsBreadcrumbs.vue";
import OdsButton from "../../../../app/components/OdsButton.vue";
import OdsDownloadList from '../../../../app/components/distribution/OdsDownloadList.vue'
import { DcatApChV2DatasetAdapter } from '../../../../app/components/dataset-detail/model/dcat-ap-ch-v2-dataset-adapter.js'
import { useSeoMeta } from 'nuxt/app';


const { locale, t } = useI18n();

const route = useRoute()
const router = useRouter()
const datasetId = computed(() => route.params.datasetId as string)
const distributionId = computed(() => route.params.distributionId as string)


const { useResource } = useDatasetsSearch()
const { isSuccess, resultEnhanced } = useResource(datasetId)

const dataset = computed(() => {
  if (!resultEnhanced.value) {
    return undefined
  }
  return new DcatApChV2DatasetAdapter(resultEnhanced.value)
})


const distribution = computed(() => {
  if (!dataset.value) {
    return undefined
  }
  const dists = dataset.value.distributions.find(d => d.id === distributionId.value) ?? undefined
  return dists
})


const breadcrumbs = [
  await homePageBreadcrumb(locale),
  {
    title: t('message.header.navigation.datasets'),
    path: '/datasets',
  },
  {
    title: resultEnhanced.value?.getTitle,
    path: {
      name: 'datasets-datasetId',
      params: { datasetId: datasetId.value },
    },
  },
  {
    title: distribution.value?.title
  }
]

useSeoMeta({
  title: `${distribution.value?.title} | ${resultEnhanced.value?.getTitle} | ${t('message.header.navigation.datasets')} | opendata.swiss`,
})
</script>

<template>
  <main v-if="isSuccess && distribution" id="main-content">
    <header id="main-header">
      <OdsBreadcrumbs :breadcrumbs="breadcrumbs" />
    </header>
    <section class="hero hero--default">
      <div class="container container--grid gap--responsive">
        <div class="hero__content">
          <p class="meta-info">
            <span class="meta-info__item">{{ t('message.dataset_detail.distribution') }}</span>
            <span class="meta-info__item">{{ t('message.dataset_detail.published_on') }} {{distribution.releaseDate }} </span>
            <span class="meta-info__item">{{ t('message.dataset_detail.modified_on') }} {{ distribution.modified }} </span></p>
          <h1 class="hero__title"> {{ distribution.title }} </h1>
          <MDC :value="distribution.description ?? ''" />
        </div>
      </div>
   </section>
   <section class="section publication-back-button-section">
      <div class="container">
       <pre style="overflow-x: hidden; text-overflow: hidden; word-break: break-all;">{{ distribution.downloadUrls }}</pre>
      </div>
    </section>
  <section class="section">
    <div class="container container--grid gap--responsive">
      <div class="container__main vertical-spacing">
        <div class="container__mobile">
          <div class="box">
            <h2 class="h5">Download</h2>
              <OdsDownloadList :download-urls="distribution.downloadUrls" :name="distribution.title" :format="distribution.format" :languages="distribution.languages" :byte-size="distribution.formattedByteSize"/>
            </div>
            <div class="box">
              <h2 class="h5">{{ t(`message.header.navigation.terms_of_use`) }}</h2>
              <OdsDetailTermsOfUse v-if="distribution.license" :name="distribution.license" />
            </div>
          </div>
          <h2 class="h2">{{ t('message.dataset_detail.additional_information') }}</h2>
          <OdsDetailsTable :table-entries="distribution.propertyTable"/>
        </div>
        <div class="hidden container__aside md:block">
          <div id="aside-content" class="sticky sticky--top">
            <div class="box">
              <h2 class="h5">Download</h2>
              <OdsDownloadList :download-urls="distribution.downloadUrls" :name="distribution.title" :format="distribution.format" :languages="distribution.languages" :byte-size="distribution.formattedByteSize"/>
            </div>
            <div class="box">
              <h2 class="h5">{{ t(`message.header.navigation.terms_of_use`) }}</h2>
              <OdsDetailTermsOfUse v-if="distribution.license" :name="distribution.license" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section publication-back-button-section">
      <div class="container">
        <OdsButton title="Zurück" icon="ArrowLeft" class="btn--back" @click="router.back()" />
      </div>
    </section>
    <pre>{{ resultEnhanced?.getDistributions.filter(d => d.id === distributionId) }}</pre>
  </main>
</template>

<style lang="scss" scoped>

</style>
