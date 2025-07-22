<template>

    <div class="page">
        <div class="page-content">
            <section>
                <h2>{{ t('message.ods_legal_framework.section_1.title') }}</h2>
                <p>{{ t('message.ods_legal_framework.section_1.p1') }} <RouterLink to="/terms-of-use">{{ t('message.ods_legal_framework.section_1.linkText') }}</RouterLink>.</p>
            </section>
            <section>
                <h2>{{ t('message.ods_legal_framework.section_2.title') }}</h2>
                <p>{{ t('message.ods_legal_framework.section_2.p1') }}</p>
                <p>{{ t('message.ods_legal_framework.section_2.p2') }}</p>
                <p>{{ t('message.ods_legal_framework.section_2.p3') }}</p>
            </section>
            <section>
                <h2>{{ t('message.ods_legal_framework.section_3.title') }}</h2>
                <p>{{ t('message.ods_legal_framework.section_3.p1') }}</p>
            </section>
            <section>
                <h2>{{ t('message.ods_legal_framework.section_4.title') }}</h2>
                <p>{{ t('message.ods_legal_framework.section_4.p1') }}</p>
                <p>{{ t('message.ods_legal_framework.section_4.p2') }}</p>
                <p>{{ t('message.ods_legal_framework.section_4.p3') }}</p>
                <p>{{ t('message.ods_legal_framework.section_4.p4') }}</p>
            </section>
            <section>
                <h2>{{ t('message.ods_legal_framework.section_5.title') }}</h2>
                <p>{{ t('message.ods_legal_framework.section_5.p1') }}</p>
                <p>{{ t('message.ods_legal_framework.section_5.p2') }}</p>
            </section>
            <section>
                <h2>{{ t('message.ods_legal_framework.section_6.title') }}</h2>
                <p>{{ t('message.ods_legal_framework.section_6.p1') }}</p>
            </section>
            <section>
                <h2>{{ t('message.ods_legal_framework.section_7.title') }}</h2>
                <p>{{ t('message.ods_legal_framework.section_7.p1_1') }} <ExternalLink href="http://ckan.org/">CKAN</ExternalLink>{{ t('message.ods_legal_framework.section_7.p1_2') }} <ExternalLink href="https://github.com/okfn/ckan">open-source software</ExternalLink>. {{ t('message.ods_legal_framework.section_7.p1_3') }} <ExternalLink href="https://github.com/opendata-swiss">{{ t('message.ods_legal_framework.section_7.a1') }}</ExternalLink>.</p>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
import  type { Breadcrumb } from '../../app/model/breadcrumb';
import ExternalLink  from '../../app/components/ExternalLink.vue';

import { useI18n } from 'vue-i18n'

const { t } = useI18n();

const breadcrumbs: Breadcrumb[] = [
  {
    title: 'message.metadata.homepage',
    disabled: false,
    to: '/',
  },
  {
    title: 'message.ods_legal_framework.title',
    disabled: true,
    to: '/legal-framework',
  },
];
</script>


<style scoped lang="scss">
</style>
