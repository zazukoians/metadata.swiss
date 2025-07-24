<script lang="ts" setup>
const route = useRoute()
const { locale } = useI18n()

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
  <OdsPage v-if="page" :page="page" />
</template>
