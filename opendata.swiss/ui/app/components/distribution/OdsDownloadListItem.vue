<template>
  <div>
    <a class="download-item" :href="props.downloadUrl" target="_blank">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--xl icon--Download download-item__icon">
       <path xmlns="http://www.w3.org/2000/svg" d="m19.419 13.698-.375-.649-6.294 3.634v-12.228h-.75v12.228l-6.294-3.634-.375.649 7.044 4.067z" />
       <path xmlns="http://www.w3.org/2000/svg" d="m6.00576 19.91649h12.76855v.75h-12.76855z"/>
      </svg>
      <div>
       <h2 class="download-item__title">{{ props.name }}</h2>
       <p class="meta-info download-item__meta-info">
          <span class="meta-info__item">{{ props.format }}</span>
          <span class="meta-info__item">{{ props.byteSize }}</span>
          <span class="meta-info__item">{{ props.languages.join(', ') }}</span>
        </p>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">

import { defineProps } from 'vue';

const props = defineProps({
  downloadUrl: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  format : {
    type: String,
    required: false,
    default: ''
  },
  languages: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => []
  },
  byteSize: {
    type: String,
    required: false,
    default: ''
  }
});
</script>

<style scoped lang="scss">
  a {
    overflow-x: hidden;
    word-break: break-all;
  }

  .download-item__title {
    text-overflow: hidden;
    overflow-x: hidden;
    word-break: break-all;
  }
</style>
