<script lang="ts" setup>

import LanguageSelector from '../LanguageSelector.vue';

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

               <div class="language-selector">
                    <LanguageSelector />
                </div>
            </div>
          </div>
        </div>

    </header>
</template>

<style lang="scss" scoped>

</style>
