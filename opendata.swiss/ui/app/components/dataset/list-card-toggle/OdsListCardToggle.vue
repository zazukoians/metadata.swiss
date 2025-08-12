<template>
  <OdsButton
    variant="bare"
    :title="t('message.ods-list-card-toggle.card_view')"
    size="sm"
    icon-only
    @click="updateListType('list')"
  >
    <SvgIcon icon="List" role="btn" />
  </OdsButton>
  <OdsButton
    variant="bare"
    :title="t('message.ods-list-card-toggle.card_view')"
    size="sm"
    icon-only
    @click="updateListType('card')"
  >
    <SvgIcon icon="Apps" role="btn" />
  </OdsButton>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const { t } = useI18n()

const props = defineProps<{ modelValue: 'card' | 'list' }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: 'card' | 'list'): void
}>()

const listType = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  listType.value = newVal
})

function updateListType(type: 'card' | 'list') {
  if (listType.value !== type) {
    listType.value = type
    emit('update:modelValue', type)
  }
}
</script>
