<template>
  <button
  href="false"
  type="button"
  class="btn btn--bare btn--sm btn--icon-only"
  :aria-label="t('message.ods-list-card-toggle.list_view')"
  :title="t('message.ods-list-card-toggle.list_view')"
  @click="listType('select', 'list')">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--List btn__icon">
      <circle xmlns="http://www.w3.org/2000/svg" cx="5.20794" cy="7.78174" r=".875"/>
      <circle xmlns="http://www.w3.org/2000/svg" cx="5.20794" cy="12.37549" r=".875"/>
      <circle xmlns="http://www.w3.org/2000/svg" cx="5.20794" cy="16.96826" r=".875"/>
      <path xmlns="http://www.w3.org/2000/svg" d="m7.76556 7.40674h11.74463v.75h-11.74463z"/>
      <path xmlns="http://www.w3.org/2000/svg" d="m7.76556 12.00049h11.74463v.75h-11.74463z"/>
      <path xmlns="http://www.w3.org/2000/svg" d="m7.76556 16.59326h11.74463v.75h-11.74463z"/>
    </svg>
    <span class="btn__text">{{ t('message.ods-list-card-toggle.list_view') }}</span>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const listType = defineEmits<{
  (e: 'select', value: 'list'): void
}>()

</script>
