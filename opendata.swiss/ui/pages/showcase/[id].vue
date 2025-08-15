<script setup>
import OdsPage from "../../app/components/OdsPage.vue"
import {homePageBreadcrumb} from "../../app/composables/breadcrumbs.js";

const route = useRoute()
const { locale, t } = useI18n()
const { id } = route.params

const { data: showcase } = await useAsyncData(route.path, () => {
  return queryCollection('showcases')
    .where('stem', 'LIKE', `%${id}.${locale.value}`)
    .first()
})

const breadcrumbs = [
  await homePageBreadcrumb(locale),
  {
    title: t('message.header.navigation.showcases'),
    path: '/showcases',
  },
  {
    title: showcase.value?.title || id,
  }
]

useSeoMeta({
  title: `${showcase.value?.title} | ${t('message.header.navigation.showcases')} | opendata.swiss`,
})
</script>

<template>
  <OdsPage v-if="showcase" :page="showcase" >
    <template #header>
      <OdsBreadcrumbs :breadcrumbs="breadcrumbs" />
    </template>

    <template #hero-subheading>
      <img v-if="showcase.image" :src="showcase.image" :alt="showcase.title" >
    </template>
  </OdsPage>
</template>
