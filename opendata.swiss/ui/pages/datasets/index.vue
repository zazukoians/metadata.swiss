<script setup lang="ts">
import type { SearchParamsBase } from '@piveau/sdk-core'
import { computed, reactive, ref, toRefs } from 'vue'
import { useDatasetsSearch } from '../../app/piveau/search.js'

const { locale } = useI18n();

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
</script>

<template>
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
