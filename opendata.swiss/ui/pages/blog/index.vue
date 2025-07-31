<script setup>
const route = useRoute()
const {locale, t} = useI18n()

const {data} = await useAsyncData(route.path, () => {
  return queryCollection('blog')
    .where('path', 'LIKE', `%.${locale.value}`)
    .order('date', 'DESC')
    .limit(10)
    .all()
})

useSeoMeta({
  title: `${t('message.header.navigation.blog')} | opendata.swiss`,
})

const posts = computed(() => {
  return data.value?.map(post => {
    const date = new Date(post.date)

    return {
      ...post,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    };
  }) || []
})
</script>

<template>
  <section class="section section--default">
    <div class="container gap--responsive">
      <div class="search-results search-results--grid" aria-live="polite" aria-busy="false">
        <ul class="search-results-list">
          <li v-for="post in posts" :key="post.id">
            <OdsCard :title="post.title">
              <template #footer-action>
                <NuxtLinkLocale
                  :to="{ name: 'blog-year-month-slug', params: { year: post.year, month: post.month, slug: post.slug } }"
                  type="false" class="btn btn--outline btn--icon-only" aria-label="false">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                       class="icon icon--base icon--ArrowRight btn__icon">
                    <path xmlns="http://www.w3.org/2000/svg"
                          d="m16.444 19.204 4.066-7.044-4.066-7.044-.65.375 3.633 6.294h-15.187v.75h15.187l-3.633 6.294z"></path>
                  </svg>
                  <span class="btn__text">Weiterlesen</span>
                </NuxtLinkLocale>
              </template>
            </OdsCard>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
