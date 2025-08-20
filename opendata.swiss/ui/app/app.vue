<template>
    <main id="main-content">
      <NuxtLayout>
        <v-app>
          <Transition name="shrink-header">
            <OdsTopHeader
              v-if="!isMobileMenuOpen"
              :enable-authentication="true"
              :authenticated="false"
              :username="undefined"
            />
          </Transition>
          <OdsHeader :navigation-items="navigationItems" @mobile-menu-state-change="mobileMenuOpened" />
          <v-main>
              <Transition name="fade-content">
                <div v-if="!isMobileMenuOpen" style="min-height: calc(100vh - 128px);">
                  <NuxtPage :page-key="route => route.path" />
                </div>
              </Transition>
          </v-main>
          <OdsFooter />
          <OdsBottomFooter />
        </v-app>
      </NuxtLayout>
    </main>

</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

import OdsTopHeader from './components/headers/OdsTopHeader.vue'
import OdsHeader from './components/headers/OdsHeader.vue';
import OdsBottomFooter from '@/components/footer/OdsBottomFooter.vue'
import OdsFooter from './components/footer/OdsFooter.vue';
import type { OdsNavTabItem } from './components/headers/model/ods-nav-tab-item';
import { APP_NAVIGATION_ITEMS } from './constants/navigation-items';

const navigationItems = ref<OdsNavTabItem[]>(APP_NAVIGATION_ITEMS);
const isMobileMenuOpen = ref(false);

useHead({
  bodyAttrs: {
    class: 'body--ods-brand'
  }
})

function mobileMenuOpened(value: boolean) {
  isMobileMenuOpen.value = value;
}

function handleResize() {
  // Close the mobile menu if the window is resized to a width greater than or equal to 1024px
  if (window.innerWidth >= 1024) {
    isMobileMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const { progress } = useLoadingIndicator()

</script>


<style lang="scss" scoped>


.shrink-header-enter-active, .shrink-header-leave-active {
  transition: max-height 1.0s cubic-bezier(0.4,0,0.2,1);
  overflow: hidden;
}
.shrink-header-enter-from, .shrink-header-leave-to {
  max-height: 0 !important;
}
.shrink-header-enter-to, .shrink-header-leave-from {
  max-height: 300px;
}


.fade-content-enter-active, .fade-content-leave-active {
  transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1);
}
.fade-content-enter-from, .fade-content-leave-to {
  opacity: 0;
}
.fade-content-enter-to, .fade-content-leave-from {
  opacity: 1;
}

</style>
