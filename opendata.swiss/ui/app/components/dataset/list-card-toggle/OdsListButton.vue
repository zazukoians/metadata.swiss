<template>
  <button
  href="false"
  type="button"
  class="btn btn--bare btn--sm btn--icon-only"
  :aria-label="t('message.ods-list-card-toggle.list_view')"
  :title="t('message.ods-list-card-toggle.list_view')"
  @click="listType('select', 'list')">
    <SvgIcon icon="List" role="btn" />
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
