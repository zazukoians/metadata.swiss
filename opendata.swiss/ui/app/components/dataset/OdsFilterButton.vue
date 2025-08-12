<template>
  <button href="false" type="button" class="btn btn--bare btn--sm btn--icon-left" aria-label="false">
    <SvgIcon icon="ChevronDown" role="btn" />
    <span class="btn__text">{{ t('message.dataset_search.show_filters') }}</span>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>
