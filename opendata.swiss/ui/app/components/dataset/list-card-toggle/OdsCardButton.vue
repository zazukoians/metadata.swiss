<template>
  <button
  href="false"
  type="button"
  class="btn btn--bare btn--sm btn--icon-only"
  :aria-label="t('message.ods-list-card-toggle.card_view')"
  :title="t('message.ods-list-card-toggle.card_view')"
  @click="listType('select', 'card')"
  >
    <SvgIcon icon="Apps" role="btn" />
    <span class="btn__text">{{ t('message.ods-list-card-toggle.card_view') }}</span>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const listType = defineEmits<{
  (e: 'select', value: 'card'): void
}>()
</script>
