<template>
      <span class="dataset-label">{{ t('message.dataset_detail.dataset') }}</span>

  <p class="meta-info">
    <span
      v-if="props.dataset.releaseDate"
      class="meta-info__item"
      style="cursor: pointer"
      :title="showRaw ? t('message.dataset_detail.show_relative') : t('message.dataset_detail.show_raw')"
      :aria-label="showRaw ? t('message.dataset_detail.show_relative') : t('message.dataset_detail.show_raw')"
      @click="toggleRaw"
    >
      {{ t('message.dataset_detail.released') }}
      <NuxtTime
        :datetime="props.dataset.releaseDate"
        :locale="locale"
        :relative="!showRaw"
      />
    </span>
    <span
      v-if="props.dataset.modificationDate"
      class="meta-info__item"
      style="cursor: pointer"
      :title="showRaw ? t('message.dataset_detail.show_relative') : t('message.dataset_detail.show_raw')"
      :aria-label="showRaw ? t('message.dataset_detail.show_relative') : t('message.dataset_detail.show_raw')"
      @click="toggleRaw"
    >
      {{ t('message.dataset_detail.modified_on') }}
      <NuxtTime
        :datetime="props.dataset.modificationDate"
        :locale="locale"
        :relative="!showRaw"
      />
    </span>
     <span
      v-if="props.dataset.frequency"
      class="meta-info__item"
    >
      {{ t('message.dataset_detail.frequency') }} <a class="link--external" target="_blank" :href="props.dataset.frequency.resource">{{ props.dataset.frequency.label }}</a>
    </span>
  </p>
  <p class="meta-info catalog-meta-info">
      <OdsDatasetCatalogPanel style="display: inline;" :dataset="props.dataset" />
  </p>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { DcatApChV2DatasetAdapter } from './model/dcat-ap-ch-v2-dataset-adapter'
import OdsDatasetCatalogPanel from './OdsDatasetCatalogPanel.vue'

const { locale, t } = useI18n()

const showRaw = ref(false)

const props = defineProps({
  dataset: {
    type: Object as PropType<DcatApChV2DatasetAdapter>,
    required: true
  }
})

function toggleRaw() {
  showRaw.value = !showRaw.value
}
</script>

<style lang="scss" scoped>
.catalog-meta-info {
  margin-top: 0 !important;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.dataset-label {
  position: relative;
  background-color: #e6f0fa;
  color: #1976d2;
  padding: 2px 10px;
  border-radius: 6px;
  font-weight: 600;
  letter-spacing: 0.03em;
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
  border: 1px solid #b3d4fc;
}

</style>
