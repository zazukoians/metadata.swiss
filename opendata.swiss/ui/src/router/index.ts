import { createRouter, createWebHistory } from 'vue-router'
import DatasetDetailsView from '../views/DatasetDetailsView.vue'
import DatasetSearchView from '../views/DatasetSearchView.vue'
import LandingPageView from '../views/LandingPageView.vue'
import AboutOpendataSwiss from '../views/AboutOpendataSwiss.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-page-view',
      component: LandingPageView
    },
    {
      path: '/datasets',
      name: 'dataset-search-view',
      component: DatasetSearchView,
    },
    {
      path: '/datasets/:datasetId',
      name: 'dataset-details-view',
      component: DatasetDetailsView,
    },
    {
      path: '/about/open-data-swiss',
      name: 'about-opendata-swiss',
      component: AboutOpendataSwiss,
    }
  ],
})

export default router
