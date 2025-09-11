<template>
  <NuxtLink
    :href="props.href"
    :target="isExternal ? '_blank' : props.target"
    :class="{ 'link--external': isExternal }"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">

import type { PropType } from 'vue'

const props = defineProps({
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
    default: undefined,
    required: false
  }
})

const isExternal = computed(() => {
  try {
    if (!props.href) {
      return false;
    }
    let baseHost= '';
    if(import.meta.client) {
      baseHost = window.location.host;
    } else {
      // ssr context
      baseHost = useRequestURL().host;
    }

    const url = new URL(props.href, `https://${baseHost}`);

    if(! (url.protocol === 'http:' || url.protocol === 'https:')) {
      return false;
    }
    return url.host !== baseHost;
  } catch {
    return false;
  }
});
</script>
