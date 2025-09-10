<template>
    <a
      :href="href"
      :aria-label="ariaLabel || props.href"
      :title ="props.ariaLabel || props.href"
      target="_blank"
      rel="noopener noreferrer"
    >
    <slot/>
    <SvgIcon icon="External" size="xs" class="icon--external-link" />
    </a>
</template>

<script setup lang="ts">

interface Props {
  href: string
  ariaLabel?: string
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.icon--external-link {
  fill: var(--color-primary-600);
  stroke: var(--color-primary-600);
}

a {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  text-decoration: underline;
  color: var(--color-primary-600);

  &:hover {
    color: var(--color-primary-700);
    .icon--external-link {
      fill: var(--color-primary-700);
      stroke: var(--color-primary-700);
    }
  }
}

</style>
