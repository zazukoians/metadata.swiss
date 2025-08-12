<template>
  <ul v-if="props.dataset && props.dataset.getDistributions" class="download-items">
    <li v-for="distribution in props.dataset.getDistributions" :key="distribution.id" >
      <a v-for="link in distribution.downloadUrls" :key="link" :href="link"  class="download-item"  target="_blank">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--xl icon--Download download-item__icon">
            <path xmlns="http://www.w3.org/2000/svg" d="m19.419 13.698-.375-.649-6.294 3.634v-12.228h-.75v12.228l-6.294-3.634-.375.649 7.044 4.067z" />
            <path xmlns="http://www.w3.org/2000/svg" d="m6.00576 19.91649h12.76855v.75h-12.76855z"/>
          </svg>
          <div>
            <h2 class="download-item__title">{{ distribution.title }}</h2>
            <!---->
            <p class="meta-info download-item__meta-info"><span class="meta-info__item">{{ distribution.format ? distribution.format : distribution.title }}</span><span class="meta-info__item">{{ distribution.languages.join(', ') }}</span></p>
          </div>
      </a>
<NuxtLink :to="`${props.dataset.getId}/distribution/${distribution.id}`">ocho</NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Dataset } from '~/model/dataset';

interface Props {
  dataset: Dataset
}

const props = defineProps<Props>();


</script>
