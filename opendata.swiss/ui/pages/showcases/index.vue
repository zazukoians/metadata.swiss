<script setup>
import OdsPage from "../../app/components/OdsPage.vue";
import {homePageBreadcrumb} from "../../app/composables/breadcrumbs.js";

const { locale, t } = useI18n()
const breadcrumbs = [
  await homePageBreadcrumb(locale),
  {
    title: t('message.header.navigation.showcases'),
    path: '/showcases',
  },
]
useSeoMeta({
  title: `${t('message.header.navigation.showcases')} | opendata.swiss`,
})
</script>

<template>
  <OdsPage>
    <template #header>
      <OdsBreadcrumbs :breadcrumbs="breadcrumbs" />
    </template>
    <section class="section section--py">
      <div class="container container--grid container--reverse-mobile gap--responsive">
        <div class="container__main vertical-spacing">
          Showcases are not yet implemented.
        </div>
      </div>
    </section>
  </OdsPage>
</template>
