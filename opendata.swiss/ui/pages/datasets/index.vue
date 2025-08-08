<script setup lang="ts">
import type { SearchParamsBase } from '@piveau/sdk-core'
import { computed, reactive, ref, toRefs, watch } from 'vue'
import { useDatasetsSearch } from '../../app/piveau/search'
import OdsBreadcrumbs from "../../app/components/OdsBreadcrumbs.vue";
import OdsPagination from "../../app/components/OdsPagination.vue";
import OdsDatasetList from "../../app/components/dataset/OdsDatasetList.vue";
import OdsFilterButton from "../../app/components/dataset/OdsFilterButton.vue";
import OdsListCardToggle from "../../app/components/dataset/list-card-toggle/OdsListCardToggle.vue";
import OdsSearchIconButton from "../../app/components/OdsSearchIconButton.vue"
import {homePageBreadcrumb} from "../../app/composables/breadcrumbs";
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()

const { locale, t} = useI18n();
const localePath = useLocalePath()

// 👇 Query parameters

const categories = ref<string[]>([]);
const publisher = ref<string[]>([]);
const queryParams: SearchParamsBase = reactive({
  limit: 10,
  page: route.query.page ? Number(route.query.page) - 1 : 0,
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

const LIST_TYPE_KEY = 'datasets-list-type';
const getInitialListType = () => {
  const stored = typeof window !== 'undefined' ? window.localStorage.getItem(LIST_TYPE_KEY) : null;
  return stored === 'list' ? 'list' : 'card';
};
const listType = ref<'card' | 'list'>(getInitialListType());

watch(listType, (newType) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LIST_TYPE_KEY, newType);
  }
});

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


watch(
  () => route.query.page,
  (newPage) => {
    queryParams.page = newPage ? Number(newPage) - 1 : 0
  }
)
</script>

<template>
  <div>
<!--
  <header id="main-header">
    <OdsBreadcrumbs :breadcrumbs="breadcrumbs" />
  </header>
-->
 <main id="main-content">

  <!-- search panel -->
   <section class="section section--default bg--secondary-50">

      <div class="container">

         <h1 class="h1">{{ t('message.dataset_search.search_results') }}</h1>
         <div class="search search--large search--page-result">
            <div class="search__group">
               <input
                id="search-input"
                v-model="searchInput"
                :placeholder="t('message.dataset_search.search_placeholder')"
                type="search"
                :label="t('message.dataset_search.search_placeholder')"
                autocomplete="off"
                class="search"
                @keyup.enter="onSearch"
              >
              <OdsSearchIconButton @click="onSearch" />
            </div>
         </div>
         <div class="search__filters">
           <OdsFilterButton />
         </div>
         <div class="filters__active" />
      </div>
   </section>
   <!-- results -->

   <section id="search-results" class="section section--default">
      <div class="container gap--responsive">
         <div class="search-results search-results--grid" aria-live="polite" aria-busy="false">
            <div class="search-results__header">
               <div class="search-results__header__left"><strong>{{ getSearchResultsCount }}</strong>{{ t('message.dataset_search.search_results') }} </div>
               <div class="search-results__header__right">
                  <div class="form__group__select">
                     <!---->
                     <div class="select select--bare">
                        <select id="select-6" class="input--outline input--sm" name="select-name">
                           <option :disabled="true" :selected="true">{{ t('message.dataset_search.sort') }}</option>
                           <option>nach Relevanz</option>
                           <option>by date (increasing)</option>
                           <option>by date (decreasing)</option>
                           <option>...</option>
                        </select>
                        <div class="select__icon">
                           <svg role="presentation" aria-hidden="true" viewBox="0 0 24 24">
                              <path d="m5.706 10.015 6.669 3.85 6.669-3.85.375.649-7.044 4.067-7.044-4.067z" />
                           </svg>
                        </div>
                     </div>
                  </div>
                  <div class="separator separator--vertical" />
                  <OdsListCardToggle v-model="listType" />
               </div>
            </div>
            <h2 class="sr-only">Results list</h2>
            <div v-if="isFetching" class="is-fetching">
              Fetching...
            </div>
            <OdsDatasetList v-else :items="getSearchResultsEnhanced" :list-type="listType" />
            <div class="pagination pagination--right">
              <OdsPagination
                :current-page="(queryParams.page ?? 0) + 1"
                :total-pages="getSearchResultsPagesCount"
                :page-label="t('message.ods-pagination.page')"
                :total-pages-label="t('message.ods-pagination.of') + getSearchResultsPagesCount"
                :pagination-items="[
                {
                  icon: 'ChevronLeft',
                  label: t('message.ods-pagination.previous'),
                  link: { path:  `/` +  route.path.split('/').slice(2).join('/'), query: { ...route.query, page: (queryParams.page ?? 1), hash: '#search-results' } },
                },
                {
                  icon: 'ChevronRight',
                  label: t('message.ods-pagination.next'),
                  link: { path: `/` + route.path.split('/').slice(2).join('/'), query: { ...route.query, page: (queryParams.page ?? 1) + 2 }, hash: '#search-results' }
                }
              ]"
                @page-change="(newPage) => { queryParams.page = newPage ? Number(newPage) - 1 : 0 }"
                />
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
            </div>

         </div>
      </div>
   </section>
</main>



<!--

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
-->
</div>

</template>

<style lang="scss" scoped>

.two-column-layout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

</style>
