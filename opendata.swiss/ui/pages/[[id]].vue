<script lang="ts" setup>
import OdsBreadcrumbs from "../app/components/OdsBreadcrumbs.vue";
import { useBreadcrumbs } from "../app/composables/breadcrumbs";

const route = useRoute()
const { locale } = useI18n()

const breadcrumbs = await useBreadcrumbs({
  route,
  locale,
  loadContent({ path }) {
    return queryCollection('pages')
      .select('id', 'title')
      .where('path', 'LIKE', `%${path}.${locale.value}`)
  }
})

const {data: page} = await useAsyncData(route.path, () => {
  const slug = route.params.id || 'index'

  return queryCollection('pages')
    .where('path', 'LIKE', `%${slug}.${locale.value}`)
    .first()
})

useSeoMeta({
  title: `${page.value?.title} | opendata.swiss`,
})

</script>

<template>
  <OdsPage v-if="page" :page="page">
    <template #header>
      <OdsBreadcrumbs :breadcrumbs="breadcrumbs" />
    </template>
  </OdsPage>
</template>
