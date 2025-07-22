<script lang="ts" setup>
// import OdsLanguageSelector from '../OdsLanguageSelector.vue';

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  enableAuthentication?: boolean;
  authenticated?: boolean;
  username: string | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  enableAuthentication: false,
  authenticated: false,
});

function loginOrLogout() {
    if (props.authenticated) {
        emit('logout');
    } else {
        emit('login');
    }
}

const emit = defineEmits<{
    (e: 'login' | 'logout'): void;
}>();

</script>

<template>
    <header id="top-bar-container" class="top-bar">
        <div id="top-bar" class="top-bar__bar">
          <div class="container container--flex ">
            <div class="top-bar__btn"/>
            <div class="top-bar__right">
                <div v-if="props.enableAuthentication">
                  <v-btn
                      v-if="props.authenticated"
                      variant="plain"
                      append-icon="mdi:mdi-logout"
                      :title="t('message.top_header.logout')"
                      :aria-label="t('message.top_header..logout')"
                      @click="loginOrLogout"
                  >
                      {{ props.username ? props.username : t('message.top_header.logout')}}

                  </v-btn>
                  <v-btn
                      v-if="!props.authenticated"
                      variant="plain"
                      append-icon="mdi:mdi-login"
                      :title="t('message.top_header.login')"
                      :aria-label="t('message.top_header.login')"
                      @click="loginOrLogout"
                  >
                      {{ t('message.top_header.login') }}

                  </v-btn>
                </div>

               <!--<div class="language-selector">
                    <OdsLanguageSelector />
                </div>-->
            </div>
          </div>
        </div>

    </header>
</template>

<style lang="scss" scoped>
@use '@/assets/ods/ods_breakpoints.scss' as mdeia;

ul {
    list-style-type: none;
    list-style-position: outside;
    line-height: 12px;
}

.top-header {
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: var(--ods-dark-background-color);
    .top-header-container {
        max-width: var(--ods-max-content-width);
        width: 100%;
        height: 46px;
        max-height: 46px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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
        .right {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            gap: 24px;
            color: white;

        }
    }

    .language-selector {
        margin-top: 16px;
    }
}
</style>
