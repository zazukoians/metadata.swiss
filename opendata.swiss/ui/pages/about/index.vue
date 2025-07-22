<template>
    <div class="page">
      <div class="page-content">
        <section>
          <p class="bold">{{ t('message.about.ods_paragraph_1') }}</p>
          <p>{{ t('message.about.ods_paragraph_2') }}</p>
          <p class="bold">{{ t('message.about.ods_paragraph_3') }}</p>
          <ul>
            <li>{{ t('message.about.ods_list_1') }}</li>
            <li>{{ t('message.about.ods_list_2') }}</li>
            <li>{{ t('message.about.ods_list_3') }}</li>
          </ul>
          <p>{{ t('message.about.ods_paragraph_4') }}</p>
        </section>
        <section>
          <h2>{{ t('message.about.ods_title_2') }}</h2>
          <p>{{ t('message.about.ods_paragraph_5') }} <ExternalLink href="https://handbook.opendata.swiss/"> handbook.opendata.swiss</ExternalLink></p>
          <a title="handbook.opendata.swiss" target="_blank" href="https://handbook.opendata.swiss">
            <img loading="lazy" decoding="async" src="@/assets/ods/logo/handbook_logo.png" alt="opendate.swiss handbook logo"></a>
        </section>
        <section>
          <h2>{{ t('message.about.ods_title_3') }}</h2>
          <p>{{ t('message.about.ods_paragraph_6') }}</p>
          <p>{{ t('message.about.ods_paragraph_7') }}<ExternalLink :href="t('message.about.ods_paragraph_7_href')">
            {{ t('message.about.ods_paragraph_7_a') }}</ExternalLink>{{ t('message.about.ods_paragraph_7_1') }}
          </p>
        </section>
        <section>
          <h2>{{ t('message.about.ods_title_4') }}</h2>
          <p>{{ t('message.about.ods_paragraph_8') }} <RouterLink to="/organisations">
                      {{ t('message.about.ods_paragraph_8_a') }}
                  </RouterLink> {{ t('message.about.ods_paragraph_8_1') }}</p>
          <p>{{ t('message.about.ods_paragraph_9') }}</p>
          <p>no translation</p>
        </section>
        <section>
          <h2>{{ t('message.about.ods_title_5') }}</h2>
          <p>{{ t('message.about.ods_paragraph_10') }} <ExternalLink :href="t('message.about.ods_paragraph_10_href')">{{ t('message.about.ods_paragraph_10_a') }}</ExternalLink>.</p>
          <p>{{ t('message.about.ods_paragraph_11') }} <RouterLink to="/contact">
                      {{ t('message.about.ods_paragraph_11_a') }}
                  </RouterLink>.</p>

        </section>
      </div>
    </div>
</template>

<script lang="ts" setup>
import type { Breadcrumb } from '../../app/model/breadcrumb';
import ExternalLink  from '../../app/components/ExternalLink.vue';

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const breadcrumbs: Breadcrumb[] = [
  {
    title: 'message.metadata.homepage',
    disabled: false,
    to: '/',
  },
  {
    title: 'message.header.navigation.data.ods_what_is_ods',
    disabled: false,
    to: '/',
  },
];
</script>


<style scoped lang="scss">
// @use '@/styles/ods_breakpoints.scss' as mdeia;

</style>
