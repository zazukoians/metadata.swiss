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
  <div v-if="page" id="main-content">
    <section class="hero hero--default">
      <div class="container container--grid gap--responsive">
        <div class="hero__content">
          <h2 class="hero__title">{{ page.heading || page.title }}</h2>
          <div class="hero__description">
            <MDC :value="page.description"></MDC>
          </div>
        </div>
      </div>
    </section>
    <section class="section section--py">
      <div class="container container--grid container--reverse-mobile gap--responsive">
        <div class="container__main vertical-spacing">
          <ContentRenderer :value="page"/>
        </div>
      </div>
    </section>
  </div>

</template>
