<template>

    <div class="page">
        <div class="page-content">
            <section>
                <p>{{ t('message.terms_of_use.ods_paragraph_1') }}</p>
                <p>{{ t('message.terms_of_use.ods_paragraph_2') }}</p>
            </section>

            <section>
                <div class="row">
                    <div class="term-icon">
                        <OdsTermsOpen />
                    </div>
                    <div class="term-description">
                        <p>{{ t('message.terms_of_use.ods_open.title') }}</p>
                        <ul>
                            <li>{{ t('message.terms_of_use.ods_open.condition_1') }}</li>
                            <li>{{ t('message.terms_of_use.ods_open.condition_2') }}</li>
                            <li>{{ t('message.terms_of_use.ods_open.condition_3') }}</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section>
                <div class="row">
                    <div class="term-icon">
                        <OdsTermsBy />
                    </div>
                <div class="term-description">
                    <p>{{ t('message.terms_of_use.ods_by.title') }}</p>
                    <ul>
                        <li>{{ t('message.terms_of_use.ods_by.condition_1') }}</li>
                        <li>{{ t('message.terms_of_use.ods_by.condition_2') }}</li>
                        <li>{{ t('message.terms_of_use.ods_by.condition_3') }}</li>
                    </ul>
                </div>
                </div>

            </section>
            <section>
                <div class="row">
                    <div class="term-icon">
                        <OdsTermsAsk />
                    </div>
                    <div class="term-description">
                        <p>{{ t('message.terms_of_use.ods_ask.title') }}</p>
                        <ul>
                            <li>{{ t('message.terms_of_use.ods_ask.condition_1') }}</li>
                            <li>{{ t('message.terms_of_use.ods_ask.condition_2') }}</li>
                            <li>{{ t('message.terms_of_use.ods_ask.condition_3') }}</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section>
                    <div class="row">
                        <div class="term-icon">
                            <OdsTermsByAsk />
                        </div>
                    <div class="term-description">
                            <p>{{ t('message.terms_of_use.ods_by_ask.title') }}</p>
                            <ul>
                                <li>{{ t('message.terms_of_use.ods_by_ask.condition_1') }}</li>
                                <li>{{ t('message.terms_of_use.ods_by_ask.condition_2') }}</li>
                                <li>{{ t('message.terms_of_use.ods_by_ask.condition_3') }}</li>
                            </ul>
                        </div>
                    </div>
            </section>

            <section>
                <p>{{ t('message.terms_of_use.ods_trailing_paragraph_1_1') }}
                    <RouterLink to="/contact">
                        {{ t('message.terms_of_use.ods_trailing_paragraph_1_2_a') }}
                    </RouterLink>.
                    {{ t('message.terms_of_use.ods_trailing_paragraph_1_3') }}
                    <a :href="t('message.terms_of_use.ods_trailing_paragraph_1_4_href')"
                    target="_blank">
                        {{ t('message.terms_of_use.ods_trailing_paragraph_1_4_a') }}
                    </a>.
                </p>
            </section>
        </div>
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
