<template>
    <nav class="ods-navigation-panel">
        <Transition :name="transitionName" mode="out-in">
            <div :key="menuKey">
                <template v-for="item in currentMenu" :key="item.label">
                    <div
                        v-if="item.to"
                        class="ods-list-item ods-nav-router-item"
                        :class="{ 'active-nav-item': isActive(item) }"
                    >
                        <RouterLink
                            :to="item.to"
                            class="ods-nav-router-item"
                            :aria-label="t(item.label)"
                            @click.native="emitRequestClose"
                        >
                            {{t(item.label)}}
                        </RouterLink>
                    </div>
                    <div v-else-if="item.subMenu?.length > 0" class="ods-list-item ods-nav-router-item" @click="drillDown(item)">
                        <div>{{t(item.label)}} <span class="submenu-arrow">▶</span></div>
                    </div>
                </template>
                <div v-if="menuStack.length > 0" class="ods-list-item ods-nav-router-item back-btn" @click="goBack">
                    ◀ {{ t('Back') }}
                </div>
            </div>
        </Transition>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'
import { OdsNavTabItem } from './headers/model/ods-nav-tab-item';
import { useI18n } from 'vue-i18n';
import { RouterLink, useRoute } from 'vue-router';

const emit = defineEmits(['requestClose']);
const { t } = useI18n();
const props = defineProps<{
    items: OdsNavTabItem[]
}>()

const route = useRoute();
function isActive(item: OdsNavTabItem) {
    return item.to === route.path;
}

function emitRequestClose() {
    emit('requestClose');
}

const menuStack = ref<OdsNavTabItem[][]>([]);
const menuKey = computed(() => menuStack.value.length);
const currentMenu = computed(() => {
    if (menuStack.value.length === 0) return props.items;
    return menuStack.value[menuStack.value.length - 1];
});
const direction = ref<'forward' | 'backward'>('forward');
const transitionName = computed(() => direction.value === 'forward' ? 'slide-menu-right' : 'slide-menu-left');
function drillDown(item: OdsNavTabItem) {
    if (item.subMenu && item.subMenu.length > 0) {
        direction.value = 'forward';
        menuStack.value.push(item.subMenu);
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
.ods-navigation-panel {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--v-theme-surface);
    padding: 16px;
    overflow: hidden;
    background-color: white;
}
.ods-nav-router-item {
    cursor: pointer;
}
.ods-list-item {
    padding: 8px;
    border-bottom: 1px solid var(--v-theme-border);
    border-left: 4px solid transparent;
}
.active-nav-item {
    border-left: 4px solid var(--ods-color); /* Green border */
    background: rgba(46, 204, 64, 0.05);
}
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