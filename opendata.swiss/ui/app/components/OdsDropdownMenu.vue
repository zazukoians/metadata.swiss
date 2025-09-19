<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, type PropType } from 'vue';
import OdsDesktopNavigationPanel from '@/components/OdsDesktopNavigationPanel.vue';
import OdsButton from './OdsButton.vue';
import type { OdsNavTabItem } from './headers/model/ods-nav-tab-item';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  menu: {
    type: Object as PropType<OdsNavTabItem>,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  t: {
     type: Function,
      required: true
    },
  onTabClick: {
    type: Function,
    required: true
  }
});

const isOpen = ref(false);

const dropdownRef = ref<HTMLElement | null>(null);

function toggleDropdown() {
  console.log('toggleDropdown');
  isOpen.value = !isOpen.value;
}


function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
  <div ref="dropdownRef" class="ods-dropdown">
    <a href="#" :class="{ active: props.active }" @click.prevent="toggleDropdown">
      <span>{{ props.t(props.label) }} bs</span>
      <span class="ods-dropdown__arrow">▼</span>
    </a>
    <div v-if="isOpen" id="desktop-menu__drawer" class="desktop-menu__drawer ods-drop-down-panel" >
      <div class="close-button-container">
        <OdsButton
        icon="Cancel"
        title="close menu"
        variant="bare"
        size="sm"
        icon-right
        class="ods-close"
        @click="isOpen = false"
      >
          <span class="ods-close">Schliessen</span>
        </OdsButton>
      </div>
      <OdsDesktopNavigationPanel :menu="props.menu"/>
     <!-- <div v-for="subItem in props.subMenu" :key="subItem.to">
        <NuxtLinkLocale :to="subItem.to" @click="isOpen = false">
          {{ props.t(subItem.label) }}
        </NuxtLinkLocale>
      </div>-->

    </div>
  </div>
</template>

<style lang="scss" scoped>

.close-button-container {
  display: flex;
  justify-content: flex-end;
}
.ods-close {
  white-space: nowrap;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.ods-hover:hover {
  background-color: var(--color-secondary-50);
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}

.ods-drop-down-panel {
  min-width: 160px;
  position: absolute;
  top: 100%;
  left: 0;
  padding-left: 48px;
  padding-right: 48px;
  padding-bottom: 48px;
  padding-top: 24px;
}
.ods-dropdown {
  position: relative;
  display: inline-block;
}
.ods-dropdown > a {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.ods-dropdown__arrow {
  margin-left: 0.5em;
  font-size: 0.8em;
}
.ods-dropdown__menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  min-width: 160px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 0.5em 0;
}
.ods-dropdown__menu li {
  list-style: none;
}
.ods-dropdown__menu a {
  display: block;
  padding: 0.5em 1em;
  color: inherit;
  text-decoration: none;
}
.ods-dropdown__menu a:hover {
  background: #f5f5f5;
}
</style>
