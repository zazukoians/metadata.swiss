<template>
  <button
  href="false"
  type="button"
  class="btn btn--bare btn--lg btn--icon-only"
  :aria-label="t('message.dataset_search.search_button')"
  >
    <svg viewBox="0 0 24 24" enable-background="new 0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--Search btn__icon">
      <path xmlns="http://www.w3.org/2000/svg" d="m13.3 12.8c1.9-2.2 1.7-5.6-.5-7.5s-5.6-1.7-7.5.5-1.7 5.6.5 7.5c2 1.7 4.9 1.7 6.9 0l6 6 .5-.5zm-4 1c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" />
    </svg>
    <span class="btn__text">{{ t('message.dataset_search.search_button') }}</span>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>
