<template>
  <OdsListButton @select="updateListType('list')" />
  <OdsCardButton @select="updateListType('card')" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import OdsListButton from './OdsListButton.vue'
import OdsCardButton from './OdsCardButton.vue'


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
