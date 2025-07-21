<template>
  <div class="ods-header">
    <nav id="piveau-header" class="navbar" >
      <div class="left">
        <router-link class="logo-lg" to="/"><Logo/></router-link>
        <router-link class="logo-small" to="/"><LogoSmall/></router-link>
        <div class="app-title">
          <h1>opendata.swiss</h1>
          <h1>Portal</h1>
        </div>
      </div>
      <div class="right">
      <BurgerButton v-model="menuOpen" />
      </div>
       
    </nav>
  </div>
  <!-- menu -->
  <div class="nav-tabs">
    <div class="nav-tabs-container">
      <v-tabs align-tabs="start" v-model="selectedTab">
        <template v-for="item in props.navigationItems" :key="item.label">
        <v-tab rounded="0" variant="plain" :to="item.to" v-if="!item.subMenu">
          {{ t(item.label) }}
        </v-tab>
        <v-menu v-if="item.subMenu"  :key="item.label">
            <template v-slot:activator="{ props }">
              <v-btn
                    class="align-self-center me-4"
                    height="100%"
                    rounded="0"
                    variant="plain"
                    v-bind="props"
                  >
                {{ t(item.label) }} <v-icon icon="mdi-menu-down" v-bind="props"></v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                @click="setCurrentItemToMenuItem(item, subItem)"
                v-for="subItem in item.subMenu"
                :key="subItem.label"
                :to="subItem.to"
              >
                {{ t(subItem.label) }}
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-tabs>
    </div>
  </div>
  <!-- Mobile menu -->
  <Transition name="fade-menu">
    <div class="ods-mobile-menu" v-if="menuOpen" >
      <OdsNavigationPanel  :items="props.navigationItems" @requestClose="closeMobileMenu"></OdsNavigationPanel>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { OdsNavTabItem } from '@/components/headers/model/ods-nav-tab-item';
import Logo from '@/components/Logo.vue';
import LogoSmall from '@/components/LogoSmall.vue';
import BurgerButton from '@/components/BurgerButton.vue';
import OdsNavigationPanel from '@/components/OdsNavigationPanel.vue';
// Props definition
interface Props {
  enableAuthentication?: boolean;
  authenticated?: boolean;
  navigationItems: OdsNavTabItem[];
}

const props = withDefaults(defineProps<Props>(), {
  enableAuthentication: false,
  authenticated: false,
  navItems: []
});

import { defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'mobileMenuStateChange', value: boolean): void;
}>();



const route = useRoute();
const { t } = useI18n();
const isNuxt = ref(false);

const selectedTab = ref<string | null>(null);
const menuOpen = ref(false);


// Lifecycle hook
onMounted(() => {
  isNuxt.value = !!(globalThis as any).$nuxt;
});


function setCurrentItemToMenuItem (parent: OdsNavTabItem, ref:any) {
   selectedTab.value = '3';
}

watch(menuOpen, (val) => {
  emit('mobileMenuStateChange', val);
});


function closeMobileMenu() {
  menuOpen.value = false;
  emit('mobileMenuStateChange', false);
}
</script>


<style lang="scss" scoped>
@use '@/styles/ods_breakpoints.scss' as mdeia;
.ods-header {
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgb(229, 231, 235);
 
  .navbar {
    max-width: var(--ods-max-content-width);
    width: 100%;
    background-color: white !important;
    color: #333 !important;
    background: var(--ods-background-color) !important;
    padding: 0 0 ;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    @include mdeia.respond-to-xs {
      height: 65px;
    }
    @include mdeia.respond-to-lg {
      height: 173px;
    }
  }
}

.nav-tabs {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @include mdeia.respond-to-xs {
    display: none;
  }
  @include mdeia.respond-to-sm {
    display: flex;
  }
  .nav-tabs-container {
    width: 100%;
    max-width: var(--ods-max-content-width);
   
  }

  
}


.left {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  margin-left: 16px;

  .app-title {
    border-left: 1px solid rgb(229, 231, 235);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 16px;
    @include mdeia.respond-to-xs {
      height: 65px;
      h1 {
        font-size: 0.75rem !important;
        font-weight: bold !important;
        margin: 0;
      }
    }
    @include mdeia.respond-to-sm {
      height: 65px;
      h1 {
        font-size: 0.85rem !important;
        font-weight: bold !important;
        margin: 0;
      }
    }
    @include mdeia.respond-to-lg {
      height: 100px;

      h1 {
        font-size: 18px !important;
        font-weight: bold !important;
      }
    }
    @include mdeia.respond-to-xl {
      h1 {
        font-size: 18px !important;
        font-weight: bold !important;
      }
    }
  }
  @include mdeia.respond-to-xs {
    .logo-small{
      display: block;
    }
    .logo-lg {
      display: none;
    } 
  }
  @include mdeia.respond-to-md {
    .logo-small{
      display: none;
    }
    .logo-lg {
      display: block;
    } 
  }
}

.right {
  margin-right: 28px;
  @include mdeia.respond-to-sm {
    display: none;
  }

}

.ods-mobile-menu {
   @include mdeia.respond-to-xs {
    display: flex;
   
    height: calc(100vh - 65px);
    background-color: var(--ods-light-dark-background-color);
  }
  @include mdeia.respond-to-sm {
    display: none;
  }
}

.fade-menu-enter-active {
  transition: opacity 0.4s cubic-bezier(0.4,0,0.2,1);
  transition-delay: 0.5s;
}
.fade-menu-leave-active {
  transition: opacity 0.4s cubic-bezier(0.4,0,0.2,1);
  transition-delay: 0s;
}
.fade-menu-enter-from, .fade-menu-leave-to {
  opacity: 0;
}
.fade-menu-enter-to, .fade-menu-leave-from {
  opacity: 1;
}
</style>
