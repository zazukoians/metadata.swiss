<template>
  <div id="main-content">
      <section class="hero hero--default">
        <div class="container container--grid gap--responsive">
          <div class="hero__content">
            <h2 class="hero__title">{{ t('message.header.navigation.terms_of_use') }}</h2>
            <div class="hero__description">
              <p>{{ t('message.terms_of_use.ods_paragraph_1') }}</p>
              <p>{{ t('message.terms_of_use.ods_paragraph_2') }}</p>
            </div>
          </div>
        </div>
      </section>
<section class="section section--py">
      <div class="container container--grid container--reverse-mobile gap--responsive">
        <div class="container__main vertical-spacing">
        <h2 class="h2">{{ t('message.terms_of_use.ods_open.title') }}</h2>
        <OdsTermsOpen />
          <ul>
            <li>{{ t('message.terms_of_use.ods_open.condition_1') }}</li>
            <li>{{ t('message.terms_of_use.ods_open.condition_2') }}</li>
            <li>{{ t('message.terms_of_use.ods_open.condition_3') }}</li>
          </ul>
        <h2 class="h2">{{ t('message.terms_of_use.ods_by.title') }}</h2>
        <OdsTermsBy />
        <ul>
          <li>{{ t('message.terms_of_use.ods_by.condition_1') }}</li>
          <li>{{ t('message.terms_of_use.ods_by.condition_2') }}</li>
          <li>{{ t('message.terms_of_use.ods_by.condition_3') }}</li>
        </ul>
        <OdsTermsAsk />
        <h2 class="h2">{{ t('message.terms_of_use.ods_ask.title') }}</h2>
        <ul>
          <li>{{ t('message.terms_of_use.ods_ask.condition_1') }}</li>
          <li>{{ t('message.terms_of_use.ods_ask.condition_2') }}</li>
          <li>{{ t('message.terms_of_use.ods_ask.condition_3') }}</li>
        </ul>
        <h2 class="h2">{{ t('message.terms_of_use.ods_by_ask.title') }}</h2>
        <OdsTermsByAsk />
        <ul>
          <li>{{ t('message.terms_of_use.ods_by_ask.condition_1') }}</li>
          <li>{{ t('message.terms_of_use.ods_by_ask.condition_2') }}</li>
          <li>{{ t('message.terms_of_use.ods_by_ask.condition_3') }}</li>
        </ul>
        <h2 class="h2">{{ t('message.terms_of_use.ods_trailing.title') }}</h2>
        <p>{{ t('message.terms_of_use.ods_trailing_paragraph_1_1') }} <RouterLink to="/contact">{{ t('message.terms_of_use.ods_trailing_paragraph_1_2_a') }}</RouterLink>.
                    {{ t('message.terms_of_use.ods_trailing_paragraph_1_3') }}
            <a
              :href="t('message.terms_of_use.ods_trailing_paragraph_1_4_href')"
              target="_blank">
                {{ t('message.terms_of_use.ods_trailing_paragraph_1_4_a') }}
              </a>.
        </p>
      </div>
    </div>
    </section>
        </div>

</template>

<script lang="ts" setup>
import OdsTermsAsk from '../../app/components/terms-of-use/OdsTermsAsk.vue';
import OdsTermsBy from '../../app/components/terms-of-use/OdsTermsBy.vue';
import OdsTermsByAsk from '../../app/components/terms-of-use/OdsTermsByAsk.vue';
import OdsTermsOpen from '../../app/components/terms-of-use/OdsTermsOpen.vue';
import type { Breadcrumb } from '../../app/model/breadcrumb';
import { useI18n } from 'vue-i18n'


const { t } = useI18n()




const breadcrumbs: Breadcrumb[] = [
  {
    title: 'message.metadata.homepage',
    disabled: false,
    to: '/',
  },
  {
    title: 'message.header.navigation.data.ods_terms_of_use',
    disabled: false,
    to: '/',
  },
];
</script>


<style scoped lang="scss">

</style>
