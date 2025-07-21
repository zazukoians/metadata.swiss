<template>
    <footer class="ods-footer">
        <div class="footer-content">
            <div class="block">
                <h1>{{t('message.ods-footer.block_1.title') }}</h1>
                <p>{{ t('message.ods-footer.block_1.paragraph_1') }}</p>
                <p>© opendata.swiss</p>
            </div>
            <div class="block">
                <h1>{{t('message.ods-footer.block_2.title') }}</h1>
                <div class="social">
                 <a href="https://www.facebook.com/people/opendataswiss/61558495974785/" target="_blank"> <div class="media"><font-awesome-icon :icon="['fab', 'facebook']" /><span>Facebook</span></div></a> 
                 <a href="https://www.linkedin.com/showcase/opendata-swiss/" target="_blank"> <div class="media"><font-awesome-icon :icon="['fab', 'linkedin']" /><span>LinkedIn</span></div></a>
                 <a href="https://www.instagram.com/opendata.swiss/" target="_blank"> <div class="media"><font-awesome-icon :icon="['fab', 'instagram']" /><span>Instagram</span></div></a>
                 <a href="https://x.com/opendataswiss" target="_blank"> <div class="media"><font-awesome-icon :icon="['fab', 'x-twitter']" /><span>X</span></div></a>
              </div>
               <v-btn 
                :href="t('message.ods-footer.block_2.news_mail_href')"
                target="_blank"
                color="secondary"
                rounded="0"
                variant="outlined"
                append-icon="mdi-arrow-right"
                :title="t('message.ods-footer.block_2.news_mail_aria_label')"
                :aria-label="t('message.ods-footer.block_2.news_mail_aria_label')"
                ><strong>NewsMail</strong></v-btn>

            </div>
            <div class="block-large">
                <h1>{{t('message.ods-footer.block_3.title') }}</h1>
                <div>
                    foobar bar bar bar bar bar bar bar bar bar bar bar bar
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

</script>

<style lang="scss" scoped>
@use '@/styles/ods_breakpoints.scss' as mdeia;

.ods-footer {
    background-color: var(--ods-light-dark-background-color);
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    .footer-content {
        max-width: var(--ods-max-content-width);
    }
    @include mdeia.respond-to-xs {
        padding-left: var(--ods-page-padding-xs);
        padding-right: var(--ods-page-padding-xs);
        .footer-content {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 4rem;
            padding-bottom: 5rem;
            padding-top: 5rem;

            .social {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-top: 1rem;
                width: 100%;
                align-items: center;
                flex-direction: row;
                justify-content: flex-start;
                flex-wrap: wrap;
                margin-bottom: 2rem;

                .media {
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                    justify-content: flex-start;
                    gap: 0.5rem;
                    cursor: pointer;
                    min-width: 100px;;
                }
            }
            h1 {
                font-size: 1.25rem !important;
                margin-bottom: 24px !important;
            }
            p:not(:last-child) {
                margin-bottom: 12px !important;
            }
            p {
                font-size: 1rem !important;
            }
            .media {
                font-size: 1rem !important;
            }
        }
        .block-large {
            width: 50%;

          
        }
    }
    @include mdeia.respond-to-sm {
        padding-left: var(--ods-page-padding-sm);
        padding-right: var(--ods-page-padding-sm);
        .footer-content {
            h1 {
                font-size: 1.25rem !important;
                margin-bottom: 24px !important;
            }
            p:not(:last-child) {
                margin-bottom: 12px !important;
            }
            p {
                font-size: 1rem !important;
            }
        }
        .block-large {
            width: 33%;
        }
    }
    @include mdeia.respond-to-md {
        padding-left: var(--ods-page-padding-md);
        padding-right: var(--ods-page-padding-md);
        .footer-content {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            gap: 4rem;
            h1 {
                font-size: 1.25rem !important;
                margin-bottom: 24px !important;
            }  
            p:not(:last-child) {
                margin-bottom: 12px !important;
            }
            p {
                font-size: 1rem !important;
            }
        }
        .block-large {
            width: 33%;
        }
         .block {
            width: 33%;
        }
    }
    @include mdeia.respond-to-lg {
        padding-left: var(--ods-page-padding-md);
        padding-right: var(--ods-page-padding-md);
        .footer-content {
            h1 {
                font-size: 1.375rem !important;
                margin-bottom: 40px !important;
            }
              p:not(:last-child) {
                margin-bottom: 12px !important;
            }
            p {
                font-size: 1rem !important;
            }
        }
        .block-large {
            width: 33%;
        }
         .block {
            width: 33%;
        }
    }
    @include mdeia.respond-to-xl {
        padding-left: var(--ods-page-padding-xl);
        padding-right: var(--ods-page-padding-xl);
        .footer-content {
            h1 {
                font-size: 1.625rem !important;
                margin-bottom: 40px !important;
            }
            p:not(:last-child) {
                margin-bottom: 16px !important;
            }
            p {
                font-size: 1.125rem !important;
            }
            .media {
                font-size: 1.125rem !important;
            }
        }
        .block-large {
            width: 50%;
        }
    }
 
   
}


a {
    color: white !important;
    text-decoration: none ;
}

a:hover {
    transition: opacity 0.3s;
    opacity: 0.7;
    text-decoration: none !important;
}


</style>