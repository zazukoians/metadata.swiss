<template>
    <div class="ods-license">
      <img
        :src="imageSrc"
        :alt="t(`message.terms_of_use.ods_${props.name}.title`)"
        :title="t(`message.terms_of_use.ods_${props.name}.title`)">
    </div>
  <ul>
    <li>{{ t(`message.terms_of_use.ods_${props.name}.condition_1`) }}</li>
    <li>{{ t(`message.terms_of_use.ods_${props.name}.condition_2`) }}</li>
    <li>{{ t(`message.terms_of_use.ods_${props.name}.condition_3`) }}</li>
  </ul>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const imageSrc = `/img/terms-of-use/terms_${props.name}.png`;
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
