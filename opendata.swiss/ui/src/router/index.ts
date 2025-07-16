import { createRouter, createWebHistory } from 'vue-router'
import DatasetDetailsView from '../views/DatasetDetailsView.vue'
import DatasetSearchView from '../views/DatasetSearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dataset-search-view',
      component: DatasetSearchView,
    },
    {
      path: '/:datasetId',
      name: 'dataset-details-view',
      component: DatasetDetailsView,
    },
  ],
})

export default router
