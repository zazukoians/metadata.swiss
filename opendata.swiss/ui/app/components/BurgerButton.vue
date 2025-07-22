<template>
  <button class="burger" :class="{ open: props.modelValue }" aria-label="Menu" @click="emit('update:modelValue', !props.modelValue)">
    <span/>
    <span/>
    <span/>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

</script>

<style scoped lang="scss">
.burger {
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 2001;
}
.burger span {
  display: block;
  width: 24px;
  height: 3px;
  margin: 3px 0;
  background: #222;
  border-radius: 2px;
  transition: 0.3s cubic-bezier(0.4,0,0.2,1);
}
.burger.open span:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}
.burger.open span:nth-child(2) {
  opacity: 0;
}
.burger.open span:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}
</style>
