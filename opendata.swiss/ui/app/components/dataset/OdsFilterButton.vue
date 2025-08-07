<template>
  <button href="false" type="button" class="btn btn--bare btn--sm btn--icon-left" aria-label="false">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--ChevronDown btn__icon">
      <path xmlns="http://www.w3.org/2000/svg" d="m5.706 10.015 6.669 3.85 6.669-3.85.375.649-7.044 4.067-7.044-4.067z" />
    </svg>
    <span class="btn__text">{{ t('message.dataset_search.show_filters') }}</span>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>
