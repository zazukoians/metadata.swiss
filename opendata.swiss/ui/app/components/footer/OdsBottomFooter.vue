<template>
    <footer class="ods-bottom-footer">
       <nav class="ods-footer-container" aria-label="Footer" tabindex="0" aria-hidden="false">
            <ul class="footer-navigation">
                <li><router-link to="/legal-framework" :aria-label="t('message.bottom_footer.ods_aria_label_1')">{{ t('message.bottom_footer.ods_a_1') }}</router-link></li>
                <li><a :href="t('message.bottom_footer.ods_href_2')" target="_blank" :aria-label="t('message.bottom_footer.ods_aria_label_2')">{{ t('message.bottom_footer.ods_a_2') }}</a></li>
            </ul>
        </nav>
    </footer>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()


</script>

<style lang="scss" scoped>
@use '@/styles/ods_breakpoints.scss' as mdeia;

.ods-bottom-footer {
    width: 100vw;
    min-height: 60px;
    max-height: 60px;
    background-color: var(--ods-dark-background-color);
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    @include mdeia.respond-to-xs {
      padding-left: var(--ods-page-padding-xs);
      padding-right: var(--ods-page-padding-xs);
    }
    @include mdeia.respond-to-sm {
      padding-left: var(--ods-page-padding-sm);
      padding-right: var(--ods-page-padding-sm);
    }
     @include mdeia.respond-to-md {
      padding-left: var(--ods-page-padding-md);
      padding-right: var(--ods-page-padding-md);
    }
    @include mdeia.respond-to-lg {
      padding-left: var(--ods-page-padding-lg);
      padding-right: var(--ods-page-padding-lg);
    }
    @include mdeia.respond-to-xl {
      padding-left: var(--ods-page-padding-xl);
      padding-right: var(--ods-page-padding-xl);
    }
}

.ods-footer-container {
    padding-left: var(--ods-page-padding);
    padding-right: var(--ods-page-padding);
    max-width: var(--ods-max-content-width);
    width: 100%;

}

.footer-navigation{
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 1.5rem;

    a {
        color: white !important;
        text-decoration: none ;
        font-size: 0.75rem;
    }

    a:hover {
        transition: opacity 0.3s;
        opacity: 0.7;
    }
    @include mdeia.respond-to-lg {
        a {
            font-size: 0.875rem !important;
        }
    }
    
}

</style>
