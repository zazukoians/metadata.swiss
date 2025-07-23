<template>
  <div :class="computedClass">
    <label for="lang-switcher" class="sr-only">Select language</label>
    <Select

      id="lang-switcher"
      size="sm"
      bare
      :variant="type"
      :model-value="selectedLocale"
      @change="onLangChange"
    >
      <option value="de">DE</option>
      <option value="fr">FR</option>
      <option value="it">IT</option>
      <option value="en">EN</option>
    </Select>
  </div>
</template>

<script setup lang="ts">
import Select from './OdsSelect.vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const switchLocalePath = useSwitchLocalePath()
const { locale } = useI18n()

// Props
defineProps({
  type: {
    type: String,
    default: () => 'negative',
  },
})

// CSS class
const computedClass = computed(() => 'language-switcher')

// Reactive selected locale (safe for hydration)
const selectedLocale = ref(locale.value)


// Handle language switching
function onLangChange(newLocale: 'de' | 'en' | 'fr' | 'it') {
  if (newLocale !== locale.value) {
    const newPath = switchLocalePath(newLocale)
    navigateTo(newPath)
  }
}
</script>
