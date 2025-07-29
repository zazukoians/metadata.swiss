<script setup>
const { page, hero } = defineProps({
  page: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <header id="main-header">
    <slot name="header" />
  </header>
  <div id="main-content">
    <section class="hero hero--default">
      <div class="container container--grid gap--responsive">
        <div class="hero__content">
          <h1 class="hero__title">{{ page.heading || page.title }}</h1>
          <div class="hero__description">
            <MDC v-if="page.subHeading" :value="page.subHeading"/>
          </div>
        </div>
      </div>
    </section>
    <section class="section section--py">
      <div class="container container--grid container--reverse-mobile gap--responsive">
        <div class="container__main vertical-spacing">
          <ContentRenderer :value="page"/>
        </div>
        <div v-if="page.body.toc.links.length" class="container__aside">
          <div id="aside-content" class="sticky sticky--top">
            <OdsToc :toc="page.body.toc"/>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>
