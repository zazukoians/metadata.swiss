<template>
  <img
    src="@/assets/ods/logo/logo_horizontal.png"
    :alt="t('message.header.ods_logo')"
    :title="t('message.header.ods_logo')"
    class="logo__freebrand"
  >
</template>

<script lang="ts" setup>


import { useI18n } from 'vue-i18n';

const { t } = useI18n();


</script>

<style scoped>

.logo__freebrand {
  display: none;
}

@media (min-width: 1280px) {
    .logo__freebrand {
        display: block;
    }
}

</style>
