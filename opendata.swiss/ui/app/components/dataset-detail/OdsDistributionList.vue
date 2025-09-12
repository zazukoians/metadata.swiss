<template>
  <OdsDistributionListItem v-for="dist in props.distributions" :key="dist.id" :distribution="dist" />
</template>

<script setup lang="ts">

import OdsDistributionListItem from './OdsDistributionListItem.vue';
import type { DcatApChV2DistributionAdapter } from './model/dcat-ap-ch-v2-distribution-adapter';


const props = defineProps({
  distributions: {
    type: Array as PropType<DcatApChV2DistributionAdapter[]>,
    required: true
  }
})

</script>
