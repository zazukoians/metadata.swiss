<template>
  <button
  type="button"
  :class="['btn', classes]"
  :aria-label="title"
  :title="title"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const { title, ...props } = withDefaults(defineProps<{
  title: string
  variant?: 'outline' | 'bare' | 'filled' | 'outline-negative' | 'bare-negative' | 'link' | 'link-negative'
  size?: 'sm' | 'md' | 'lg'
  iconOnly?: boolean
}>(), {
  iconOnly: false
})

const classes = computed(() => {
  const classes = []

  if(props.iconOnly) {
    classes.push('btn--icon-only')
  }

  if(props.size) {
    classes.push(`btn--${props.size}`)
  }

  if (props.variant) {
    classes.push(`btn--${props.variant}`)
  }

  return classes
})
</script>
