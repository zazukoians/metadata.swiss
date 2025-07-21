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
    </nav>
  </div>
  <!-- menu -->
  <div class="nav-tabs">
    <div class="nav-tabs-container">
      <v-tabs v-model="selectedTab" align-tabs="start">
        <template v-for="item in tabItems" :key="item.label">
        <v-tab v-if="!item.subMenu" rounded="0" variant="plain" :to="item.to">
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
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Logo from '@/components/Logo.vue';
import LogoSmall from '@/components/LogoSmall.vue';

import { OdsNavTabItem } from '@/components/headers/model/ods-nav-tab-item';

// Props definition
interface Props {
  project?: string;
  locale?: string;
  useLanguageSelector?: boolean;
  navItemsHook?: (navItems: NavItem[]) => NavItem[];
  showDatasets?: boolean;
  showCatalogues?: boolean;
  showSparql?: boolean;
  showMetadataQuality?: boolean;
  hrefDatasets?: string;
  hrefCatalogues?: string;
  hrefSparql?: string;
  hrefMetadataQuality?: string;
  languageObject?: any[];
  headerBackground?: string;
  overrideLocale?: string;
  enableAuthentication?: boolean;
  authenticated?: boolean;
}

interface NavItem {
  title: string;
  href?: string;
  to?: any;
  show: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  project: 'hub',
  locale: 'en',
  useLanguageSelector: true,
  navItemsHook: (navItems) => navItems,
  showDatasets: true,
  showCatalogues: false,
  showSparql: false,
  showMetadataQuality: false,
  hrefDatasets: undefined,
  hrefCatalogues: undefined,
  hrefSparql: undefined,
  hrefMetadataQuality: undefined,
  languageObject: () => [],
  headerBackground: 'linear-gradient(0deg, rgba(0,154,165,1) 0%, rgba(26,52,113,1) 100%)',
  overrideLocale: '',
  enableAuthentication: false,
  authenticated: false,
});

// Composables
const route = useRoute();
const { t } = useI18n();
const isNuxt = ref(false);

const selectedTab = ref<string | null>(null);
const tabItems = ref<OdsNavTabItem[]>([
   {
    label: 'message.metadata.homepage',
    to: '/'
   },
    {
      label: 'message.header.navigation.data.datasets',
      to: '/datasets'
    },
    {
      label: 'message.header.navigation.data.catalogs',
      to: '/catalogues'
    },
    {
      label: 'message.header.navigation.data.ods_about',
      subMenu: [
        { label: 'message.header.navigation.data.ods_what_is_ods', to: '/about' },
        { label: 'message.header.navigation.data.ods_terms_of_use', to: '/terms-of-use' },
        { label: 'message.header.navigation.data.ods_contact', to: '/contact' }
      ]
    }
  ]);


// Adjust navigation items based on project
const adjustNavItemsToProject = (navItems: NavItem[], project: string) => {
  switch (project) {
    case 'hub':
      if (!props.hrefDatasets) {
        navItems[0].to = { name: 'Datasets', query: { locale: route.query.locale } };
      }
      if (!props.hrefCatalogues) {
        navItems[1].to = { name: 'Catalogues', query: { locale: route.query.locale } };
      }
      if (!props.hrefSparql) {
        navItems[2].to = { name: 'SparqlEdit', query: { locale: route.query.locale } };
      }
      break;
    case 'metrics':
      if (!props.hrefMetadataQuality && navItems[3]) {
        navItems[3].to = { name: 'Dashboard', query: { locale: route.query.locale } };
      }
      break;
    default:
      break;
  }
};

// Computed nav items
const navItems = computed<NavItem[]>(() => {
  const items: NavItem[] = [
    {
      title: t('message.header.navigation.data.datasets'),
      href: props.hrefDatasets || `/data/datasets?locale=${route.query.locale}`,
      show: props.showDatasets,
    },
    {
      title: t('message.header.navigation.data.catalogs'),
      href: props.hrefCatalogues || `/data/catalogues?locale=${route.query.locale}`,
      show: props.showCatalogues,
    },
    {
      title: t('message.header.navigation.data.sparqlsearch'),
      href: props.hrefSparql || '/sparql',
      show: props.showSparql,
    },
    // Uncomment if needed
    // {
    //   title: t('message.header.navigation.data.metadataquality'),
    //   href: props.hrefMetadataQuality || `/mqa?locale=${route.query.locale}`,
    //   show: props.showMetadataQuality,
    // },
  ];

  adjustNavItemsToProject(items, props.project);
  return props.navItemsHook(items);
});

// Lifecycle hook
onMounted(() => {
  isNuxt.value = !!(globalThis as any).$nuxt;
});


function setCurrentItemToMenuItem (parent: OdsNavTabItem, ref:any) {
   console.log('setCurrentItemToMenuItem', parent, ref);
   selectedTab.value = '3';
  }
</script>


<style lang="scss" scoped>

@use '@/assets/ods/ods_breakpoints.scss' as mdeia;
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
    justify-content: flex-start;
    @include mdeia.respond-to-xs {
      height: 65px;
    }
    @include mdeia.respond-to-lg {
      height: 173px;
    }
  }
}

.nav-tabs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

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




</style>
