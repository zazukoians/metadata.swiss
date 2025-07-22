<template>

    <div class="page">
        <div class="page-content">
            <section>
                <h2>{{ t('message.contact.ods_section_1.ods_title') }}</h2>
                <p>{{ t('message.contact.ods_section_1.ods_paragraph_1') }}</p>
                <ul><li>{{ t('message.contact.ods_section_1.ods_list_1') }}</li></ul>
            </section>
            <section>
                <h2>{{ t('message.contact.ods_section_2.ods_title') }}</h2>
                <p>{{ t('message.contact.ods_section_2.ods_paragraph_1') }}</p>
                <ul><li>{{ t('message.contact.ods_section_2.ods_list_1') }}</li></ul>
            </section>
            <section>
                <h2>{{ t('message.contact.ods_section_3.ods_title') }}</h2>
                <p>{{ t('message.contact.ods_section_3.ods_paragraph_1') }}</p>
                <p>{{ t('message.contact.ods_section_3.ods_paragraph_2') }}</p>
                <ul>
                    <li>{{ t('message.contact.ods_section_3.ods_list_1') }}</li>
                    <li><ExternalLink  :href="t('message.contact.ods_section_3.ods_list_2.ods_href')">{{ t('message.contact.ods_section_3.ods_list_2.ods_label') }}</ExternalLink> </li>
                </ul>
            </section>
        </div>
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
