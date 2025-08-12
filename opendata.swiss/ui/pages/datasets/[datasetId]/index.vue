<script setup lang="ts">
import { definePropertyNode } from '@piveau/sdk-vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDatasetsSearch } from '../../../app/piveau/search'
import { homePageBreadcrumb } from "../../../app/composables/breadcrumbs";
import OdsBreadcrumbs from "../../../app/components/OdsBreadcrumbs.vue";
import OdsDetailTermsOfUse from '../../../app/components/dataset-detail/OdsDetailTermsOfUse.vue'
import OdsDetailsTable from '../../../app/components/dataset-detail/OdsDetailsTable.vue'
import OdsTagList from '../../../app/components/dataset-detail/OdsTagList.vue'
import OdsDownloadsList from '../../../app/components/dataset-detail/OdsDownloadsList.vue'
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
const route = useRoute()
const router = useRouter()
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
  <div>
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
                  <OdsDownloadsList :dataset="resultEnhanced" />
               </div>
               <div class="box">
                  <h2 class="h5">{{ t(`message.header.navigation.terms_of_use`) }}</h2>
                  <OdsDetailTermsOfUse v-for="value in resultEnhanced?.getLicenses" :key="value" :name="value" />
               </div>
            </div>
            <h2 class="h2">{{ t('message.dataset_detail.additional_information') }}</h2>
            <OdsDetailsTable :root-node="node"/>
            <div>
               <h2 class="h2">{{ t('message.dataset_detail.categories') }}</h2>
               <div>
                  <OdsTagList :tags="resultEnhanced?.getCategories ?? []" />
               </div>
            </div>
         </div>
         <div class="hidden container__aside md:block">
            <div id="aside-content" class="sticky sticky--top">
               <div class="box">
                  <h2 class="h5">{{ t('message.dataset_detail.go_to_resource') }}</h2>
                  <OdsDownloadsList :dataset="resultEnhanced"/>
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
                        <a class="btn btn--outline btn--icon-only" aria-label="false" @click="router.back()" >
                           <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--ArrowRight btn__icon">
                              <path xmlns="http://www.w3.org/2000/svg" d="m16.444 19.204 4.066-7.044-4.066-7.044-.65.375 3.633 6.294h-15.187v.75h15.187l-3.633 6.294z" />
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
   <pre>{{ resultEnhanced }}</pre>
  </main>
</div>

</template>

<style lang="scss" scoped>

</style>
