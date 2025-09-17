<template>
  <div class="wrapper">
    <div class="button-container">
      <OdsButton
        variant="link"
        :title="showCatalogInfo ? t('message.dataset_detail.hide_catalog_entry') : t('message.dataset_detail.show_catalog_entry')"
        :aria-label="showCatalogInfo ? t('message.dataset_detail.hide_catalog_entry') : t('message.dataset_detail.show_catalog_entry')"
        size="sm"
        icon-right
        @click="showCatalogInfo = !showCatalogInfo"
      >
        {{ showCatalogInfo ? props.dataset.catalog.title : props.dataset.catalog.title }}
      <template #icon>
        <SvgIcon
          icon="ChevronDown"
          role="btn"
          :class="{ 'rotated': showCatalogInfo }"
        />
      </template>
    </OdsButton>
  </div>
  <div v-if="showCatalogInfo">
    <p class="meta-info">
      <span class="meta-info__item">{{ t('message.dataset_detail.catalog') }}</span>
      <span
        v-if="props.dataset.catalog.issued"
        class="meta-info__item"
      >
        {{ t('message.dataset_detail.created_on') }}
        <OdsRelativeDateToggle :date="new Date(props.dataset.catalog.issued)" />
      </span>
      <span
        v-if="props.dataset.catalog.modified"
        class="meta-info__item"
      >
        {{ t('message.dataset_detail.modified_on') }}
        <OdsRelativeDateToggle :date="new Date(props.dataset.catalog.modified)" />
      </span>
    </p>
    <p class="meta-info">
      <span class="meta-info__item">{{ t('message.dataset_detail.this_dataset_record') }}</span>
      <span
        v-if="props.dataset.catalog.record?.issued"
        class="meta-info__item"
      >
        {{ t('message.dataset_detail.created_on') }}
         <OdsRelativeDateToggle :date="new Date(props.dataset.catalog.record.issued)" />
      </span>
      <span
        v-if="props.dataset.catalog.record?.modified"
        class="meta-info__item"
        style="cursor: pointer"
      >
        {{ t('message.dataset_detail.modified_on') }}
        <OdsRelativeDateToggle :date="new Date(props.dataset.catalog.record.modified)" />
      </span>
    </p>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { DcatApChV2DatasetAdapter } from './model/dcat-ap-ch-v2-dataset-adapter'
import OdsButton from '../OdsButton.vue'
import SvgIcon from "~/components/SvgIcon.vue";
import OdsRelativeDateToggle from '../OdsRelativeDateToggle.vue';

const { t } = useI18n()

const showCatalogInfo = ref(false)
const props = defineProps({
  dataset: {
    type: Object as PropType<DcatApChV2DatasetAdapter>,
    required: true
  }
})

</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  justify-content: flex-start;
}

.button-container {
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
  justify-content: flex-start;
}

.rotated {
  transform: rotate(180deg);
  transition: transform 0.2s;
}

.meta-info__item {
  cursor: pointer;
}

</style>
