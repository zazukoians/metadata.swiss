<template>
        <component
                :is="(() => {
                        switch (props.termsIri) {
                                case OdsTermsType.Ask:
                                        return OdsTermsAsk;
                                case OdsTermsType.Open:
                                        return OdsTermsOpen;
                                case OdsTermsType.By:
                                        return OdsTermsBy;
                                case OdsTermsType.ByAsk:
                                        return OdsTermsByAsk;
                                default:
                                        return null;
                        }
                })()"
        />
</template>

<script setup lang="ts">
import OdsTermsAsk from './OdsTermsAsk.vue';    
import OdsTermsOpen from './OdsTermsOpen.vue';    
import OdsTermsBy from './OdsTermsBy.vue';
import OdsTermsByAsk from './OdsTermsByAsk.vue';

const enum OdsTermsType {
    Ask = 'http://dcat-ap.ch/vocabulary/licenses/terms_ask',
    Open = 'http://dcat-ap.ch/vocabulary/licenses/terms_open',
    By = 'http://dcat-ap.ch/vocabulary/licenses/terms_by',
    ByAsk = 'http://dcat-ap.ch/vocabulary/licenses/terms_by_ask'
}
const props = defineProps<{
        termsIri: string
}>();
</script>