<script setup lang="ts">
import { definePropertyNode, PropertyTable, PropertyTableNode } from '@piveau/sdk-vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDatasetsSearch } from '../../app/piveau/search.js'
import { homePageBreadcrumb } from "../../app/composables/breadcrumbs";
import OdsBreadcrumbs from "../../app/components/OdsBreadcrumbs.vue";
import OdsDetailTermsOfUse from '../../app/components/dataset-detail/OdsDetailTermsOfUse.vue'
import OdsDetailsTable from '../../app/components/dataset-detail/OdsDetailsTable.vue'
import OdsTagList from '../../app/components/dataset-detail/OdsTagList.vue'
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
  {
    title: resultEnhanced.value?.getTitle,
    path: route.path,
  }
]
</script>

<template>
  <header id="main-header">
    <OdsBreadcrumbs :breadcrumbs="breadcrumbs" />
  </header>
  <main v-if="isSuccess" id="main-content">
   <section class="hero hero--default">
      <div class="container container--grid gap--responsive">
         <div class="hero__content">
            <p class="meta-info"><span class="meta-info__item">{{ t('message.dataset_detail.dataset') }}</span><span class="meta-info__item">{{ t('message.dataset_detail.published_on') }} {{ resultEnhanced?.getCreated }} </span><span class="meta-info__item">{{ t('message.dataset_detail.modified_on') }} {{ resultEnhanced?.getModified }} </span></p>
            <h1 class="hero__title"> {{ resultEnhanced?.getTitle }} </h1>
            <h2 class="hero__subtitle"> {{ resultEnhanced?.getDescription }} </h2>
            <!----><!---->
            <aside class="authors">
               <div class="disc-images" aria-hidden="true">
                  <div class="disc-image"><img src="https://picsum.photos/120/120/?image=29" :title="resultEnhanced?.getPublisher?.name ?? ''"></div>
               </div>
               <address class="authors__names">
                <a class="link author__name" href="#">{{ resultEnhanced?.getPublisher?.name }}</a>
              </address>
            </aside>
         </div>
         <!---->
      </div>
   </section>
   <section class="section">
      <div class="container container--grid gap--responsive">
         <div class="container__main vertical-spacing">

            <div class="container__mobile">
               <div class="box">
                  <h2 class="h5">Download</h2>
                  <ul class="download-items">
                     <li>
                        <a class="download-item" href="/documents/dummy.pdf" download="dummy.pdf">
                           <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--xl icon--Download download-item__icon">
                              <path xmlns="http://www.w3.org/2000/svg" d="m19.419 13.698-.375-.649-6.294 3.634v-12.228h-.75v12.228l-6.294-3.634-.375.649 7.044 4.067z"></path>
                              <path xmlns="http://www.w3.org/2000/svg" d="m6.00576 19.91649h12.76855v.75h-12.76855z"></path>
                           </svg>
                           <div>
                              <h2 class="download-item__title">Deutsch</h2>
                              <!---->
                              <p class="meta-info download-item__meta-info"><span class="meta-info__item">PDF</span><span class="meta-info__item">524 kB</span></p>
                           </div>
                        </a>
                     </li>
                     <li>
                        <a class="download-item" href="/documents/dummy.pdf" download="dummy.pdf">
                           <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--xl icon--Download download-item__icon">
                              <path xmlns="http://www.w3.org/2000/svg" d="m19.419 13.698-.375-.649-6.294 3.634v-12.228h-.75v12.228l-6.294-3.634-.375.649 7.044 4.067z"></path>
                              <path xmlns="http://www.w3.org/2000/svg" d="m6.00576 19.91649h12.76855v.75h-12.76855z"></path>
                           </svg>
                           <div>
                              <h2 class="download-item__title">Französisch</h2>
                              <!---->
                              <p class="meta-info download-item__meta-info"><span class="meta-info__item">PDF</span><span class="meta-info__item">524 kB</span></p>
                           </div>
                        </a>
                     </li>
                     <li>
                        <a class="download-item pb-0 border-b-0" href="/documents/dummy.pdf" download="dummy.pdf">
                           <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--xl icon--Download download-item__icon">
                              <path xmlns="http://www.w3.org/2000/svg" d="m19.419 13.698-.375-.649-6.294 3.634v-12.228h-.75v12.228l-6.294-3.634-.375.649 7.044 4.067z"></path>
                              <path xmlns="http://www.w3.org/2000/svg" d="m6.00576 19.91649h12.76855v.75h-12.76855z"></path>
                           </svg>
                           <div>
                              <h2 class="download-item__title">English</h2>
                              <!---->
                              <p class="meta-info download-item__meta-info"><span class="meta-info__item">PDF</span><span class="meta-info__item">524 kB</span></p>
                           </div>
                        </a>
                     </li>
                  </ul>
               </div>
               <div class="box">
                  <h2 class="h5">{{ t(`message.header.navigation.terms_of_use`) }}</h2>
                  <OdsDetailTermsOfUse v-for="value in resultEnhanced?.getLicenses" :key="value" :name="value" />
               </div>
            </div>
            <h2 class="h2">Details</h2>
            <OdsDetailsTable />
            <div>
               <h2 class="h2">Categories</h2>
               <div>
                  <OdsTagList :tags="resultEnhanced?.getCategories ?? []" />

               </div>
            </div>
         </div>
         <div class="hidden container__aside md:block">
            <div id="aside-content" class="sticky sticky--top">
               <div class="box">
                  <h2 class="h5">Download</h2>
                  <ul class="download-items">
                     <li>
                        <a class="download-item" href="/documents/dummy.pdf" download="dummy.pdf">
                           <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--xl icon--Download download-item__icon">
                              <path xmlns="http://www.w3.org/2000/svg" d="m19.419 13.698-.375-.649-6.294 3.634v-12.228h-.75v12.228l-6.294-3.634-.375.649 7.044 4.067z"></path>
                              <path xmlns="http://www.w3.org/2000/svg" d="m6.00576 19.91649h12.76855v.75h-12.76855z"></path>
                           </svg>
                           <div>
                              <h2 class="download-item__title">Deutsch</h2>
                              <!---->
                              <p class="meta-info download-item__meta-info"><span class="meta-info__item">PDF</span><span class="meta-info__item">524 kB</span></p>
                           </div>
                        </a>
                     </li>
                     <li>
                        <a class="download-item" href="/documents/dummy.pdf" download="dummy.pdf">
                           <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--xl icon--Download download-item__icon">
                              <path xmlns="http://www.w3.org/2000/svg" d="m19.419 13.698-.375-.649-6.294 3.634v-12.228h-.75v12.228l-6.294-3.634-.375.649 7.044 4.067z"></path>
                              <path xmlns="http://www.w3.org/2000/svg" d="m6.00576 19.91649h12.76855v.75h-12.76855z"></path>
                           </svg>
                           <div>
                              <h2 class="download-item__title">Französisch</h2>
                              <!---->
                              <p class="meta-info download-item__meta-info"><span class="meta-info__item">PDF</span><span class="meta-info__item">524 kB</span></p>
                           </div>
                        </a>
                     </li>
                     <li>
                        <a class="download-item pb-0 border-b-0" href="/documents/dummy.pdf" download="dummy.pdf">
                           <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--xl icon--Download download-item__icon">
                              <path xmlns="http://www.w3.org/2000/svg" d="m19.419 13.698-.375-.649-6.294 3.634v-12.228h-.75v12.228l-6.294-3.634-.375.649 7.044 4.067z"></path>
                              <path xmlns="http://www.w3.org/2000/svg" d="m6.00576 19.91649h12.76855v.75h-12.76855z"></path>
                           </svg>
                           <div>
                              <h2 class="download-item__title">English</h2>
                              <!---->
                              <p class="meta-info download-item__meta-info"><span class="meta-info__item">PDF</span><span class="meta-info__item">524 kB</span></p>
                           </div>
                        </a>
                     </li>
                  </ul>
               </div>
               <div class="box">
                  <h2 class="h5">{{ t(`message.header.navigation.terms_of_use`) }}</h2>
                  <OdsDetailTermsOfUse v-for="value in resultEnhanced?.getLicenses" :key="value" :name="value" />
               </div>
            </div>
         </div>
      </div>
   </section>
   <section class="section publication-back-button-section">
      <div class="container">
         <a href="/" type="false" class="btn btn--outline btn--sm btn--icon-left btn--back" aria-label="false">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--ArrowLeft btn__icon">
               <path xmlns="http://www.w3.org/2000/svg" d="m8.306 5.116-4.066 7.044 4.066 7.044.65-.375-3.633-6.294h15.187v-.75h-15.187l3.633-6.294z"></path>
            </svg>
            <span class="btn__text">Zurück</span>
         </a>
      </div>
   </section>
   <section class="section bg--secondary-50">
      <div class="container">
         <h2 class="section__title">Das könnte Sie auch interessieren</h2>
         <div class="grid grid--responsive-cols-3 gap--responsive">
            <div class="card card--universal card--clickable">
               <!----><!---->
               <div class="card__content">
                  <div class="card__body">
                     <p class="meta-info"><span class="meta-info__item">Bericht</span><span class="meta-info__item">03. März 2000</span></p>
                     <div class="card__title">
                        <h3>Auswirkungen von Corona auf die Schweizer Gesellschaft</h3>
                     </div>
                     <p> Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
                     <div class="card__image"><img src="https://swiss.github.io/designsystem/images/publication-cover.png" alt="cat"></div>
                     <p class="meta-info"><span class="meta-info__item">PDF</span><span class="meta-info__item">3.8 Mb</span><span class="meta-info__item">102 Seiten</span><span class="meta-info__item">Deutsch</span></p>
                  </div>
                  <div class="card__footer card__footer--icon-only">
                     <!---->
                     <div class="card__footer__action">
                        <a href="#" type="false" class="btn btn--outline btn--icon-only" aria-label="false">
                           <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--ArrowRight btn__icon">
                              <path xmlns="http://www.w3.org/2000/svg" d="m16.444 19.204 4.066-7.044-4.066-7.044-.65.375 3.633 6.294h-15.187v.75h15.187l-3.633 6.294z"></path>
                           </svg>
                           <span class="btn__text">Weiterlesen</span>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
            <div class="card card--universal card--clickable">
               <!----><!---->
               <div class="card__content">
                  <div class="card__body">
                     <p class="meta-info"><span class="meta-info__item">Bericht</span><span class="meta-info__item">03. März 2000</span></p>
                     <div class="card__title">
                        <h3>Auswirkungen von Corona auf die Schweizer Gesellschaft</h3>
                     </div>
                     <p> Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
                     <div class="card__image"><img src="https://swiss.github.io/designsystem/images/publication-cover.png" alt="cat"></div>
                     <p class="meta-info"><span class="meta-info__item">PDF</span><span class="meta-info__item">3.8 Mb</span><span class="meta-info__item">102 Seiten</span><span class="meta-info__item">Deutsch</span></p>
                  </div>
                  <div class="card__footer card__footer--icon-only">
                     <!---->
                     <div class="card__footer__action">
                        <a href="#" type="false" class="btn btn--outline btn--icon-only" aria-label="false">
                           <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--ArrowRight btn__icon">
                              <path xmlns="http://www.w3.org/2000/svg" d="m16.444 19.204 4.066-7.044-4.066-7.044-.65.375 3.633 6.294h-15.187v.75h15.187l-3.633 6.294z"></path>
                           </svg>
                           <span class="btn__text">Weiterlesen</span>
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</main>
<pre>{{ resultEnhanced }}</pre>
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

<style lang="scss" scoped>

</style>
