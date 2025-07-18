<template>

    <AlterBodyClasses :isMobileMenuOpen="layoutStore.mobileMenuIsOpen" />
    <header id="main-header">
      <a href="#main-content" class="skip-to-content">Skip to main content</a>
      <TopBar :isOpen="false" />
      <TopHeader />
      <DesktopMenu :showActiveNavigation="true" />
      <MobileMenu :showActiveNavigation="true" />
    </header>
    <main id="main-content">
      <NuxtLayout>
      <NuxtPage :page-key="route => route.fullPath" />
      </NuxtLayout>
    </main>
    <footer id="main-footer" class="footer">
      <FooterInformation />
      <FooterNavigation />
    </footer>

</template>

<script setup lang="ts">
import AlterBodyClasses from './components/ch/objects/AlterBodyClasses.vue'
import TopBar from './components/ch/sections/TopBar.vue'
import TopHeader from './components/ch/sections/TopHeader.vue'
import DesktopMenu from './components/ch/sections/DesktopMenu.vue'
import MobileMenu from './components/ch/sections/MobileMenu.vue'
import FooterInformation from './components/ch/sections/FooterInformation.vue'
import FooterNavigation from './components/ch/sections/FooterNavigation.vue'
import { useLayoutStore } from './store/layout'
import './assets/main.css'

const layoutStore = useLayoutStore()

</script>
