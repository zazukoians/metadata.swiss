<script setup lang="ts">
import type { SearchParamsBase } from '@piveau/sdk-core'
import { computed, reactive, ref, toRefs } from 'vue'
import { useDatasetsSearch } from '../../app/piveau/search.js'
import OdsBreadcrumbs from "../../app/components/OdsBreadcrumbs.vue";
import {homePageBreadcrumb} from "../../app/composables/breadcrumbs";

const { locale, t } = useI18n();
const localePath = useLocalePath()

// 👇 Query parameters

const categories = ref<string[]>([]);
const publisher = ref<string[]>([]);
const queryParams: SearchParamsBase = reactive({
  limit: 10,
  page: 0,
  q: '',
})

// 👇 Create hub-search asynchronous state
const { useSearch } = useDatasetsSearch()
const {
  isFetching,
  getSearchResultsEnhanced,
  getSearchResultsCount,
  nextPage,
  previousPage,
  getSearchResultsPagesCount,
  getAvailableFacetsLocalized
} = useSearch({
  queryParams: toRefs(queryParams),
  selectedFacets: {
    categories,
    publisher,
  },
})

const availableFacetsEn = getAvailableFacetsLocalized(locale.value);
const availableCategories = computed(() =>
  availableFacetsEn.value.find((f) => f.id === 'categories')
);

const availablePublisher = computed(() =>
  availableFacetsEn.value.find((f) => f.id === 'publisher')
);

const searchInput = ref('')
const onSearch = () => queryParams.q = searchInput.value

const breadcrumbs = [
  await homePageBreadcrumb(locale),
  {
    title: t('message.header.navigation.datasets'),
    path: '/datasets',
  }
]
</script>

<template>

  <header id="main-header">
    <OdsBreadcrumbs :breadcrumbs="breadcrumbs" />
  </header>
 <main id="main-content">
  <!-- search panel -->
   <section class="section section--default bg--secondary-50">
      <div class="container">
         <h1 class="h1">Search Results</h1>
         <div class="search search--large search--page-result">
            <div class="search__group">
               <input id="search-input"  v-model="searchInput" class="search" placeholder="Search datasets" @keyup.enter="onSearch" type="search" label="Ämter filtern" autocomplete="off" >
               <button href="false" type="button" class="btn btn--bare btn--lg btn--icon-only" aria-label="Search datasets" @click="onSearch">
                  <svg viewBox="0 0 24 24" enable-background="new 0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--Search btn__icon">
                     <path xmlns="http://www.w3.org/2000/svg" d="m13.3 12.8c1.9-2.2 1.7-5.6-.5-7.5s-5.6-1.7-7.5.5-1.7 5.6.5 7.5c2 1.7 4.9 1.7 6.9 0l6 6 .5-.5zm-4 1c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"></path>
                  </svg>
                  <span class="btn__text">Ämter filtern</span>
               </button>
            </div>
         </div>
         <div class="search__filters">
            <button href="false" type="button" class="btn btn--bare btn--sm btn--icon-left" aria-label="false">
               <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--ChevronDown btn__icon">
                  <path xmlns="http://www.w3.org/2000/svg" d="m5.706 10.015 6.669 3.85 6.669-3.85.375.649-7.044 4.067-7.044-4.067z"></path>
               </svg>
               <span class="btn__text">Filter anzeigen</span>
            </button>
            <!---->
         </div>
         <div class="filters__active"></div>
      </div>
   </section>
   <!-- results -->

   <section class="section section--default">
      <div class="container gap--responsive">
         <div class="search-results search-results--grid" aria-live="polite" aria-busy="false">
            <div class="search-results__header">
               <div class="search-results__header__left"><strong>{{ getSearchResultsCount }}</strong>Suchergebnisse </div>
               <div class="search-results__header__right">
                  <div class="form__group__select">
                     <!---->
                     <div class="select select--bare">
                        <select id="select-6" class="input--outline input--sm" name="select-name">
                           <option disabled="" selected="">Sortieren</option>
                           <option>nach Relevanz</option>
                           <option>by date (increasing)</option>
                           <option>by date (decreasing)</option>
                           <option>...</option>
                        </select>
                        <div class="select__icon">
                           <svg role="presentation" aria-hidden="true" viewBox="0 0 24 24">
                              <path d="m5.706 10.015 6.669 3.85 6.669-3.85.375.649-7.044 4.067-7.044-4.067z"></path>
                           </svg>
                        </div>
                     </div>
                     <!---->
                  </div>
                  <div class="separator separator--vertical"></div>
                  <button href="false" type="button" class="btn btn--bare btn--sm btn--icon-only" aria-label="Display as list">
                     <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--List btn__icon">
                        <circle xmlns="http://www.w3.org/2000/svg" cx="5.20794" cy="7.78174" r=".875"></circle>
                        <circle xmlns="http://www.w3.org/2000/svg" cx="5.20794" cy="12.37549" r=".875"></circle>
                        <circle xmlns="http://www.w3.org/2000/svg" cx="5.20794" cy="16.96826" r=".875"></circle>
                        <path xmlns="http://www.w3.org/2000/svg" d="m7.76556 7.40674h11.74463v.75h-11.74463z"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="m7.76556 12.00049h11.74463v.75h-11.74463z"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="m7.76556 16.59326h11.74463v.75h-11.74463z"></path>
                     </svg>
                     <span class="btn__text">Display as list</span>
                  </button>
                  <button href="false" type="button" class="btn btn--bare btn--sm btn--icon-only" aria-label="Display as grid">
                     <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--Apps btn__icon">
                        <path xmlns="http://www.w3.org/2000/svg" d="m12.375 14.66691a2.29187 2.29187 0 1 1 2.2915-2.292 2.2946 2.2946 0 0 1 -2.2915 2.292zm0-3.83374a1.54187 1.54187 0 1 0 1.5415 1.54175 1.54373 1.54373 0 0 0 -1.5415-1.54175z"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="m7.14111 9.433a2.29175 2.29175 0 1 1 2.292-2.29175 2.29414 2.29414 0 0 1 -2.292 2.29175zm0-3.8335a1.54175 1.54175 0 1 0 1.542 1.54175 1.54332 1.54332 0 0 0 -1.542-1.54172z"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="m12.375 9.433a2.29175 2.29175 0 1 1 2.292-2.29175 2.29456 2.29456 0 0 1 -2.292 2.29175zm0-3.8335a1.54175 1.54175 0 1 0 1.542 1.54175 1.54373 1.54373 0 0 0 -1.542-1.54172z"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="m17.60889 9.433a2.29175 2.29175 0 1 1 2.2915-2.29175 2.29456 2.29456 0 0 1 -2.2915 2.29175zm0-3.8335a1.54175 1.54175 0 1 0 1.5415 1.54175 1.54374 1.54374 0 0 0 -1.5415-1.54172z"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="m7.14111 14.66691a2.29187 2.29187 0 1 1 2.292-2.292 2.29418 2.29418 0 0 1 -2.292 2.292zm0-3.83374a1.54187 1.54187 0 1 0 1.542 1.54175 1.54332 1.54332 0 0 0 -1.542-1.54175z"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="m17.60889 14.66691a2.29187 2.29187 0 1 1 2.2915-2.292 2.2946 2.2946 0 0 1 -2.2915 2.292zm0-3.83374a1.54187 1.54187 0 1 0 1.5415 1.54175 1.54374 1.54374 0 0 0 -1.5415-1.54175z"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="m7.14111 19.90056a2.29188 2.29188 0 1 1 2.292-2.29175 2.29414 2.29414 0 0 1 -2.292 2.29175zm0-3.83375a1.54188 1.54188 0 1 0 1.542 1.542 1.54338 1.54338 0 0 0 -1.542-1.542z"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="m12.375 19.90056a2.29188 2.29188 0 1 1 2.292-2.29175 2.29456 2.29456 0 0 1 -2.292 2.29175zm0-3.83375a1.54188 1.54188 0 1 0 1.542 1.542 1.54379 1.54379 0 0 0 -1.542-1.542z"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="m17.60889 19.90056a2.29188 2.29188 0 1 1 2.2915-2.29175 2.29456 2.29456 0 0 1 -2.2915 2.29175zm0-3.83375a1.54188 1.54188 0 1 0 1.5415 1.542 1.5438 1.5438 0 0 0 -1.5415-1.542z"></path>
                     </svg>
                     <span class="btn__text">Display as grid</span>
                  </button>
               </div>
            </div>
            <h2 class="sr-only">Results list</h2>
            <div v-if="isFetching" class="is-fetching">
              Fetching...
            </div>
            <ul v-else class="search-results-list">
               <li  v-for="dataset in getSearchResultsEnhanced" :key="dataset.getId">
                  <OdsCard :title="dataset.getTitle">
                    <template #top-meta>
                      <span class="meta-info__item">{{ dataset.getPublisher?.name }}</span><span class="meta-info__item">{{ dataset.getModified ? dataset.getModified  : '' }}</span>
                    </template>
                    <p>{{ dataset.getDescription }}</p>
                    <template #bottom-meta>
                      <span class="meta-info__item">Specifications related to content type (Author, PDF specs etc)</span>
                    </template>
                    <template #icons>
                      <svg viewBox="0 0 24 24" enable-background="new 0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--xl icon--Youtube">
                        <path xmlns="http://www.w3.org/2000/svg" d="m12.04 18.2c-.21 0-5.1 0-6.38-.35-.4-.11-.77-.32-1.06-.61s-.5-.66-.61-1.06c-.56-2.22-.4-5.65-.02-7.9.12-.43.33-.8.62-1.09s.66-.51 1.06-.61c1.28-.35 6.17-.36 6.38-.36s5.1 0 6.38.35c.4.11.77.32 1.06.61s.51.66.61 1.06c.55 2.21.42 5.65.02 7.91-.12.43-.33.8-.62 1.09s-.66.51-1.06.61c-1.28.34-6.17.35-6.38.35zm-.01-11.3c-.05 0-5.01.01-6.2.34-.28.08-.54.23-.75.43-.21.21-.36.47-.43.75-.38 2.21-.5 5.55.01 7.57.08.28.23.54.43.74.21.21.47.36.75.43 1.19.33 6.15.33 6.2.33s5.01 0 6.2-.33c.28-.08.54-.23.75-.43.21-.21.36-.46.43-.75.39-2.16.51-5.48-.01-7.58-.07-.28-.22-.53-.43-.74-.21-.21-.46-.36-.75-.43-1.2-.33-6.15-.33-6.2-.33zm-1.6 8.07c-.06 0-.12-.02-.17-.05-.11-.06-.18-.18-.18-.3v-4.84c0-.12.07-.24.18-.3s.24-.06.35 0l4.18 2.42c.11.06.17.18.17.3s-.07.24-.17.3l-4.18 2.42c-.06.03-.12.05-.18.05zm.35-4.59v3.63l3.13-1.81z"></path>
                      </svg>
                      <svg viewBox="0 0 120 120" enable-background="new 0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="icon icon--xl icon--EasyLanguage">
                        <path xmlns="http://www.w3.org/2000/svg" d="m60 26.6-41.5-8.3v62l14.3 2.9c.1-1 .2-2 .4-2.9l-11.7-2.3v-56l37 7.4v42.5c.3 0 .5-.2.6-.5l2.4-4.6v-37.5l37-7.4v55.9l-3.2.6c.5.9.9 1.9 1 3l5.2-1v-62.1z"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="m93.3 82c-.2-1.5-1-2.9-2.2-3.8 2.6-3.1.9-8.8-3.3-9.4h-.1l-8.8.5c0-3 .5-5.8.3-8.3-.3-5.1-3.2-8.6-7.7-9.5-1.6-.2-3.3 1-3.2 2.6v4.7c0 .9-.2 1.8-.6 2.6l-5.7 11.3c-.6 1.3-2 2.1-3.5 2.1h-16.8c-2.3 0-4.3 1.5-4.9 3.7-.7 2.6-1.1 5.4-1.1 8.1 0 3.1.5 6.2 1.4 9.1.7 2.1 2.6 3.5 4.8 3.5h13.5c1.9 0 3.7.3 5.5 1 0 0 6.3 2.9 6.9 3.2s1.6.6 3.2.6h11c3.5-.4 5.7-4.7 4.2-7.9 4.1.1 6.5-5.2 4.3-8.5 1.8-.9 3.1-3.3 2.8-5.6zm-3 .9c-.1 1.3-1.1 2-2.1 2.6-1.9.9-.3 2.8 0 4.2.3 1.1-.2 2.6-1.2 3.1s-3 .3-3.5 1.6c-.5.9-.5 1.8-.2 2.7.2.5.4 1 .3 1.6-.1 1-1.1 2.2-1.9 2.2s-9.2 0-10.6 0c0 0-1.4 0-2.1-.3 0 0-7-3.3-7-3.3-2.1-.8-4.3-1.2-6.6-1.2h-13.5c-.8 0-1.6-.6-1.9-1.4-.9-2.6-1.3-5.4-1.3-8.2 0-2.5.3-4.9 1-7.3.3-.9 1.1-1.5 2-1.5h16.8c2.6 0 5-1.4 6.2-3.7 0 0 5.6-11.1 5.6-11.1.6-1.3.9-2.6.9-4v-4.3c2.9.7 4.7 3.1 4.9 6.6.3 2.6-.5 5.4-.4 8.4-.1 1.9-.1 2.7 2.6 2.8 0 0 8.5-.5 8.5-.5h.7c1.2.3 1.9 1.6 1.9 2.8.1 1.6-1.4 2.5-1.5 3.9.1.5.5.9 1 1.3.9.9 1.5 1.8 1.4 3z"></path>
                      </svg>
                      <svg viewBox="0 0 120 120" enable-background="new 0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="icon icon--xl icon--SignLanguage">
                        <path xmlns="http://www.w3.org/2000/svg" d="m38.3 46c-.2 4.8.4 9 1.8 12.8.3.8-.4 2.1-1.9 3.7l-9.2 10.6h4l7.5-8.6c1.5-1.6 3.4-4.1 2.5-6.8-1.3-3.5-1.8-7.3-1.6-11.8 0-.1 0-.2 0-.3l-2.9-18.1c1.6-.5 3.3-.1 4.6 1 .7.6 1.2 1.3 1.5 2.2.3 1 .5 2.1.7 3.2s.4 2.3.7 3.4c.7 2.7 2.5 4.4 4.7 4.5 2 .1 3.8-1.1 4.6-3l1.4-3.8c1.6-4.4 7.6-20.8 7.6-20.8.2-.6.6-.9.9-1 .5-.2 1-.2 1.5-.1.8.3 1.4 1.3 1.1 2.3 0 .1 0 .2-.1.3l-2.2 13.1c-.1.7.3 1.4 1 1.7.2.1.5.2.8.4s.6.3.8.4c.6.2 1.3.1 1.8-.5l9.5-12.5c.6-.9 1.8-1.1 2.7-.5.8.7 1 1.8.5 2.7 0 0 0 .1-.1.1l-7.5 13.9c-.3.6-.2 1.4.4 1.9.2.2.4.3.5.5.2.2.5.5.8.7.5.4 1.3.4 1.8.1l11.7-8.3s.1-.1.1-.1c.5-.4 1-.4 1.3-.4.5.1 1 .3 1.3.7.6.8.4 1.9-.4 2.7l-10.2 10c-.5.5-.6 1.4-.1 2 .1.1.2.3.4.6s.4.7.6 1c.4.5 1 .7 1.6.5l8.5-2.5c.1 0 .1 0 .2-.1.6-.3 1.5.2 1.8.8.3.7 0 1.5-.7 1.9l-14.5 7.2-2.7 1.3c-.3.2-.6.4-.7.8-1.1 2.5-2.6 5-4.7 7.4-.5.6-1 1.2-1.6 1.7 1.7-.6 3.7-1.4 5.7-2.1 1.3-1.8 2.3-3.6 3.2-5.4l2.3-1.1 14.4-7.1c2.1-1.1 3-3.6 2.1-5.7-.9-2.2-3.6-3.3-5.7-2.4l-6.4 1.9 8.7-8.6c1.9-1.8 2.2-4.6.7-6.7 0 0 0-.1-.1-.1-.8-1-2-1.6-3.3-1.7-1.3-.2-2.6.2-3.6 1l-9.6 6.8 6.1-11.7c1.3-2.2.8-5-1.3-6.7-2.2-1.5-5.3-1-6.8 1.1l-8.2 10.8 1.8-10.9c.8-2.4-.6-5.1-3-6-1.2-.4-2.6-.4-3.7.2-1.2.5-2.1 1.5-2.5 2.8 0 0-6 16.4-7.6 20.8l-1.4 3.8c-.3.7-.9 1.1-1.6 1-.9 0-1.6-.9-2-2.3-.3-1-.5-2.1-.7-3.2s-.4-2.3-.8-3.5c-.5-1.6-1.3-2.8-2.4-3.6-2.4-2.1-6-2.5-8.9-1-.6.3-.9.9-.8 1.6z"></path>
                        <path xmlns="http://www.w3.org/2000/svg" d="m84.5 111.8c-.6 0-1.2-.1-1.7-.4l-17.2-7.4c-7.1 1.9-13.4 1.7-20.8-1.1-3.1-1.1-6.5-1.3-9.7-1.3l-15.3-.1c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5l15.2.2c3.5 0 7.2.2 10.7 1.5 3.8 1.4 7.3 2.1 10.8 2.1 2.8 0 5.7-.4 8.7-1.2.3-.1.7-.1 1 .1l17.7 7.6c.7.3 1.5 0 1.9-.7.3-.7 0-1.6-.7-2l-8.4-5.4c-.6-.4-.8-1.1-.6-1.7l.6-1.8c.2-.7.9-1.1 1.6-1l15.3 1.4c1.1.1 2-.6 2.2-1.6.1-.5 0-1-.2-1.4-.3-.5-.8-.8-1.4-.9h-.1l-14-4.2c-.6-.2-1.1-.8-1.1-1.4 0-.7 0-1.3.1-2 .1-.6.6-1.1 1.2-1.2l15.5-2.9c1.1-.1 1.8-1 1.8-2.1 0-.6-.4-1-.6-1.2-.4-.3-1-.5-1.5-.5l-16.5.4c-.7 0-1.4-.5-1.5-1.3-.1-.5-.2-1-.4-1.4-.4-.7-.1-1.6.7-2l12-6.1s.1 0 .1-.1c.9-.4 1.4-1.4 1.1-2.4-.4-1.1-1.6-1.4-2.5-1.1-.1 0-16.4 6.1-20.8 7.7l-3.8 1.4c-1.7.7-3.8.2-5.1-1.3-1.5-1.8-1.4-4.3.3-6.8.6-.8 1.2-1.5 1.7-2.2.9-1.1 1.7-2 2.3-3.1.6-1 .9-1.9.9-2.7 0-1.7-.8-3.2-2.1-4.1l-11.9 14.2c-.1.1-.2.2-.3.2-3.2 2.4-5.9 5.3-7.9 8.7-1.4 2.3-4.4 2.5-6.6 2.5l-15.6-.1c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5l15.6.1c2.8 0 3.7-.6 4-1.1 2.1-3.7 5-6.9 8.5-9.5l12.6-14.9c.4-.5 1.1-.7 1.7-.4 3 1.3 4.9 4.1 4.9 7.4 0 1.4-.4 2.8-1.3 4.3-.8 1.2-1.7 2.3-2.5 3.4-.6.7-1.1 1.4-1.6 2.1-.9 1.3-1 2.4-.4 3.2.4.5 1.1.6 1.6.4l3.9-1.4c4.3-1.6 20.6-7.6 20.8-7.7 2.7-.9 5.5.4 6.3 2.9.9 2.4-.3 5.1-2.7 6.1l-9.8 5 13.9-.3c1.3-.1 2.5.3 3.5 1.1s1.7 2.1 1.7 3.4c.1 2.7-1.7 5-4.3 5.3l-13 2.2 11.6 3.5c1.4.3 2.5 1.1 3.2 2.2s.9 2.4.7 3.6c-.4 2.5-2.8 4.3-5.4 4l-13.2-1.2 6.5 4.3c2 1.2 2.9 3.8 1.8 5.9-.5 1.4-2.1 2.3-3.7 2.3z"></path>
                      </svg>
                    </template>
                    <template #footer-info>
                      <span class="meta-info__item">Topic one</span><span class="meta-info__item">Topic two</span>
                    </template>
                    <template #footer-action>
                      <NuxtLink :to="localePath({ name: 'datasets-datasetId', params: { datasetId: dataset.getId } })" type="false" class="btn btn--outline btn--icon-only" aria-label="false">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--ArrowRight btn__icon">
                          <path xmlns="http://www.w3.org/2000/svg" d="m16.444 19.204 4.066-7.044-4.066-7.044-.65.375 3.633 6.294h-15.187v.75h15.187l-3.633 6.294z"></path>
                        </svg>
                        <span class="btn__text">Weiterlesen</span>
                      </NuxtLink>
                    </template>
                  </OdsCard>
               </li>
            </ul>
            <!----><!---->
            <div class="pagination pagination--right">
               <input class="pagination__input input input--base input--outline" aria-label="pagination input" :value="queryParams.page ? queryParams.page + 1 : 1">
               <div class="pagination__text">von {{ getSearchResultsPagesCount }} Seiten</div>
               <ul class="pagination_items">
                  <li>
                     <button type="button" class="btn btn--outline btn--icon-only" aria-label="Previous Page" :disabled="queryParams.page === 0" @click="previousPage">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--ChevronLeft btn__icon">
                           <path xmlns="http://www.w3.org/2000/svg" d="m14.733 5.704-3.85 6.669 3.85 6.669-.649.375-4.067-7.044 4.067-7.044z"></path>
                        </svg>
                        <span class="btn__text">Previous Page</span>
                     </button>
                  </li>
                  <li>
                     <button type="button" class="btn btn--outline btn--icon-only" aria-label="Next Page" :disabled="queryParams.page ? (queryParams.page >= getSearchResultsPagesCount - 1) : false" @click="nextPage" >
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--ChevronRight btn__icon">
                           <path xmlns="http://www.w3.org/2000/svg" d="m10.017 19.042 3.85-6.669-3.85-6.669.649-.375 4.067 7.044-4.067 7.044z"></path>
                        </svg>
                        <span class="btn__text">Next Page</span>
                     </button>
                  </li>
               </ul>
            </div>
            <div class="notification notification--info">
               <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--InfoCircle notification__icon">
                  <path xmlns="http://www.w3.org/2000/svg" d="m11.8042 10.05464h1.24121v7.26074h-1.24121z"></path>
                  <path xmlns="http://www.w3.org/2000/svg" d="m12.43506 7.41108a.69272.69272 0 0 0 -.54688.208.74063.74063 0 0 0 -.18457.50977.71511.71511 0 0 0 .18457.50293.70351.70351 0 0 0 .54688.20214.6722.6722 0 0 0 .73779-.70507.73376.73376 0 0 0 -.1875-.50977.70459.70459 0 0 0 -.55029-.208z"></path>
                  <path xmlns="http://www.w3.org/2000/svg" d="m12.375 4.079a8.29151 8.29151 0 1 0 8.291 8.292 8.30132 8.30132 0 0 0 -8.291-8.292zm0 15.833a7.54151 7.54151 0 1 1 7.5415-7.541 7.55 7.55 0 0 1 -7.5415 7.54106z"></path>
               </svg>
               <div class="notification__content">
                  <div class="text--bold">Haben Sie nicht gefunden wonach Sie suchen?</div>
                  <div>Gerne geben wir Ihnen auch persönlich Auskunft. Bitte melden Sie sich
                     via Kontaktformular bei uns.
                  </div>
                  <a href="#" class="link">Kontaktformular</a>
               </div>
               <!---->
            </div>
         </div>
      </div>
   </section>
</main>





  <section class="two-column-layout">
    <div class="search-results">
      <input v-model="searchInput" class="search" type="text" placeholder="Search datasets" @keyup.enter="onSearch">
      <div v-if="isFetching" class="is-fetching">
        Fetching...
      </div>
      <div v-else>
        Found {{ getSearchResultsCount }} datasets
        <hr>
        <ul class="dataset-list">
          <li v-for="dataset in getSearchResultsEnhanced" :key="dataset.getId">
            <NuxtLinkLocale :to="{ name: 'datasets-datasetId', params: { datasetId: dataset.getId } }">
              <div class="search-result-summary">
                <small>{{ dataset.getPublisher?.name }}</small>
                <h4>{{ dataset.getTitle }}</h4>
                <p>{{ dataset.getDescription }}</p>
              </div>
            </NuxtLinkLocale>
          </li>
        </ul>
        <hr>
      </div>
    </div>
    <div class="facets">
      <ul>
        <li
          v-for="facet in availableCategories?.items || []"
          :key="facet.id"
          class=""
        >
          <label class="facet-group-item">
            <span>{{ facet.title }}</span>
            <span>{{ facet.count }}</span>
            <input
              type="checkbox"
              :value="facet.id"
              class=""
              v-model="categories"
            />
          </label>
        </li>
      </ul>
      <hr />
      <ul>
        <li
          v-for="facet in availablePublisher?.items || []"
          :key="facet.id"
          class=""
        >
          <label class="facet-group-item">
            <span>{{ facet.title }}</span>
            <span>{{ facet.count }}</span>
            <input
              type="checkbox"
              :value="facet.id"
              class=""
              v-model="publisher"
            />
          </label>
        </li>
      </ul>
    </div>
  </section>
  <section class="pagination">
    <button @click="previousPage">
      Decrement page
    </button>
    <span>Page {{ queryParams.page }} of {{ getSearchResultsPagesCount }}</span>
    <button @click="nextPage">
      Increment page
    </button>
  </section>
</template>

<style lang="scss" scoped>

.two-column-layout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

</style>
