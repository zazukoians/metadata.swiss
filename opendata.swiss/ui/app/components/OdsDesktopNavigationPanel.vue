<template>
  <Transition :name="transitionName" mode="out-in">
    <div :key="menuKey">
      <div class="navy">
        <h2 class="navy__title">{{ t(parentLabel ?? '') }}</h2>

        <nav class="navy__level-0 navy-menu__level-0">
          <ul>
            <li v-if="menuStack.length > 0" style="border-bottom: none;" @click="goBack">
              <a style="padding-top: 12px; padding-bottom: 12px;">
                <span>
                  <SvgIcon icon="ArrowLeft" size="lg"/>
                </span>
              </a>
            </li>


            <template v-for="item in currentMenu" :key="item.label">
              <li v-if="item.to">
                <NuxtLinkLocale
                  :to="item.to"
                  active-class="active"
                  :aria-label="t(item.label)"
                  @click="emitRequestClose"
                >
                  <span>{{t(item.label)}}</span>
                </NuxtLinkLocale><div/>
              </li>
              <li
                  v-else-if="(item.subMenu?.length ?? -1) > 0"
                @click="drillDown(item)"
                >
                <a>{{t(item.label)}} <SvgIcon size="lg" icon="ArrowRight" /></a>
              </li>
            </template>
          </ul>
        </nav>
      </div>
    </div>
  </Transition>
  </template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { OdsNavTabItem } from './headers/model/ods-nav-tab-item';
import { useI18n } from 'vue-i18n';
import SvgIcon from "~/components/SvgIcon.vue";
import OdsButton from './OdsButton.vue';

const emit = defineEmits(['requestClose']);
const { t } = useI18n();

const props = defineProps({
    menu: {
      type: Object as PropType<OdsNavTabItem>,
      required: true
    }
});



function emitRequestClose() {
    emit('requestClose');
}

const parentLabel = ref<string | undefined>(props.menu.label);


const menuStack = ref<OdsNavTabItem[][]>([]);
const menuKey = computed(() => menuStack.value.length);

const currentMenu = computed(() => {

    if (menuStack.value.length === 0) {
      console.log('returning props.items', props.menu.subMenu ?? []);
      return props.menu.subMenu ?? []
    };
    console.log('returning last menu in stack', menuStack.value[menuStack.value.length - 1]);
    return menuStack.value[menuStack.value.length - 1];
});

const direction = ref<'forward' | 'backward'>('forward');

const transitionName = computed(() => direction.value === 'forward' ? 'slide-menu-right' : 'slide-menu-left');

function drillDown(item: OdsNavTabItem) {
    if (item.subMenu && item.subMenu.length > 0) {
        direction.value = 'forward';
        menuStack.value.push(item.subMenu);
        parentLabel.value = item.label;
    }
}
function goBack() {
    if (menuStack.value.length > 0) {
        direction.value = 'backward';
        menuStack.value.pop();
    }
}
</script>

<style scoped lang="scss">
.holly {
  margin-top: -40px;
}
// list styles
.navy {
  position: unset !important;
  perspective: none !important;
}
.navy__level-0 {
  position: unset;
  ul {
    display: block;
  }
}
.navy__title {
  margin-top: 0;
  margin-left: 12px
}

li {
  border-bottom-width: 1px;
  font-size: 0.875rem;
  width: 100%;
  cursor: pointer;
  line-height: 24px;
  height: 46px;
  margin-top: 0 !important;

}
li:hover {
    background-color: var(--color-secondary-50);
}

#mobile-menu {
  width: 100vw;
}

ul {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

a {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding-left: 16px;
  padding-right: 32px;
  color: black;
}



//

.submenu-arrow {
    float: right;
    font-size: 1.2em;
    margin-left: 8px;
}
.back-btn {
    font-weight: bold;
    color: #2ecc40;
    cursor: pointer;
}
.slide-menu-right-enter-active, .slide-menu-right-leave-active {
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1);
}
.slide-menu-right-enter-from {
    transform: translateX(100%);
    opacity: 0;
}
.slide-menu-right-enter-to {
    transform: translateX(0);
    opacity: 1;
}
.slide-menu-right-leave-from {
    transform: translateX(0);
    opacity: 1;
}
.slide-menu-right-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
.slide-menu-left-enter-active, .slide-menu-left-leave-active {
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1);
}
.slide-menu-left-enter-from {
    transform: translateX(-100%);
    opacity: 0;
}
.slide-menu-left-enter-to {
    transform: translateX(0);
    opacity: 1;
}
.slide-menu-left-leave-from {
    transform: translateX(0);
    opacity: 1;
}
.slide-menu-left-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>
