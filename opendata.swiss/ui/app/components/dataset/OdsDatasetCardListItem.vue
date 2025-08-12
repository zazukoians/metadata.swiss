<template>

                  <OdsCard :title="props.item.getTitle">
                    <template #top-meta>
                      <span class="meta-info__item">{{ props.item.getPublisher?.name }}</span><span class="meta-info__item">{{ props.item.getModified ? props.item.getModified  : '' }}</span>
                    </template>
                    <p>{{ item.getDescription }}</p>
                    <template #bottom-meta>
                      <span class="meta-info__item">Specifications related to content type (Author, PDF specs etc)</span>
                    </template>
                    <template #icons>
                      <SvgIcon icon="Youtube" size="xl" />
                      <SvgIcon icon="EasyLanguage" size="xl" />
                      <SvgIcon icon="SignLanguage" size="xl" />
                    </template>
                    <template #footer-info>
                      <span class="meta-info__item">Topic one</span><span class="meta-info__item">Topic two</span>
                    </template>
                    <template #footer-action>
                      <NuxtLink :to="localePath({ name: 'datasets-datasetId', params: { datasetId: props.item.getId } })" type="false" class="btn btn--outline btn--icon-only" aria-label="false">
                        <SvgIcon icon="ArrowRight" role="btn" />
                        <span class="btn__text">Weiterlesen</span>
                      </NuxtLinkLocale>
                    </template>
                  </OdsCard>

</template>

<script setup lang="ts">
import type { Dataset } from '~/model/dataset';

interface Props {
  item: Dataset
  searchParams?: Record<string, string>
}
const props = defineProps<Props>()
</script>
