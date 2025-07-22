/** * Vue component for displaying an svg. Workaround in order to have svg inline rather than as a
href * due to file path complications when used as a plugin by other apps. * When built, this svg
file will be provided inline. */

<template>
  <img
    src="@/assets/ods/logo/logo_horizontal.png"
    :alt="t('message.header.ods_logo')"
    :title="t('message.header.ods_logo')"
  />
</template>

<script lang="ts" setup>


import { useI18n } from 'vue-i18n';

const { t } = useI18n();


</script>

<style scoped>
img {
  width: 244px;
  height: 30px;
}
</style>
