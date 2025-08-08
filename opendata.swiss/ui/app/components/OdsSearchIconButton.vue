<template>
  <button
  href="false"
  type="button"
  class="btn btn--bare btn--lg btn--icon-only"
  :aria-label="t('message.dataset_search.search_button')"
  >
    <SvgIcon icon="Search" role="btn" />
    <span class="btn__text">{{ t('message.dataset_search.search_button') }}</span>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>
