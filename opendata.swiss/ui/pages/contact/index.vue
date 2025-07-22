<template>

   <div id="main-content">
      <section class="hero hero--default">
        <div class="container container--grid gap--responsive">
          <div class="hero__content">
            <h1 class="hero__title">{{ t('message.contact.ods_section_1.ods_title') }}</h1>
            <div class="hero__description">
              <p>{{ t('message.contact.ods_section_1.ods_paragraph_1') }}</p>
              <ul><li>{{ t('message.contact.ods_section_1.ods_list_1') }}</li></ul>
            </div>
          </div>
        </div>
      </section>
      <section class="section section--py">
        <div class="container container--grid container--reverse-mobile gap--responsive">
          <div class="container__main vertical-spacing">
            <h2 class="h2">{{ t('message.contact.ods_section_2.ods_title') }}</h2>
            <p>{{ t('message.contact.ods_section_2.ods_paragraph_1') }}</p>
            <ul><li>{{ t('message.contact.ods_section_2.ods_list_1') }}</li></ul>
            <h2 class="h2">{{ t('message.contact.ods_section_3.ods_title') }}</h2>
            <p>{{ t('message.contact.ods_section_3.ods_paragraph_1') }}</p>
            <p>{{ t('message.contact.ods_section_3.ods_paragraph_2') }}</p>
            <ul>
              <li>{{ t('message.contact.ods_section_3.ods_list_1') }}</li>
              <li><ExternalLink  :href="t('message.contact.ods_section_3.ods_list_2.ods_href')">{{ t('message.contact.ods_section_3.ods_list_2.ods_label') }}</ExternalLink> </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
</template>

<script lang="ts" setup>
import ExternalLink  from '../../app/components/ExternalLink.vue';
import type { Breadcrumb } from '../../app/model/breadcrumb';
import { useI18n } from 'vue-i18n'

const { t } = useI18n();

const breadcrumbs: Breadcrumb[] = [
  {
    title: 'message.metadata.homepage',
    disabled: false,
    to: '/',
  },
  {
    title: 'message.header.navigation.data.ods_contact',
    disabled: false,
    to: '/',
  },
];
</script>


<style scoped lang="scss">

</style>
