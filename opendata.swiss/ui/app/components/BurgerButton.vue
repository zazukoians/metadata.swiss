<template>
  <button class="burger" title="Toggle mobile menu" @click="emit('update:modelValue', !props.modelValue)">
    <span
      class="burger__icon"
      :class="{ 'burger--is-open': props.modelValue }"
    >
      <span class="burger__bar"/>
      <span class="burger__bar"/>
      <span class="burger__bar"/>
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

</script>

<style scoped lang="scss">

</style>
