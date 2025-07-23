<template>
    <div class="ods-license">
      <img
        src="@/assets/ods/terms-of-use/terms_by-ask.png"
        :alt="t('message.terms_of_use.ods_ask.title')"
        :title="t('message.terms_of_use.ods_ask.title')">
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>

<style lang="scss" scoped>
.ods-license {
   height: 62px;
}
img {
    height: 100%;
    width: auto;
    margin: 0 auto;
}
</style>
