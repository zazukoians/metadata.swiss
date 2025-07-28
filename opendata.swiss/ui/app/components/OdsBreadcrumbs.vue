<script setup>
const props = defineProps({
  page: {
    type: Object,
    required: true
  },
  collection: {
    type: String,
    required: true
  }
})

const route = useRoute()
const { locale } = useI18n()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug

const { data: breadcrumbs } = await useAsyncData(`${route.path}_breadcrumbs`, async () => {
  const breadcrumbs = []
  const segments = route.path.split('/')
    .filter(segment => segment)
    .slice(1)

  while(segments.length) {
    const path = `/` + segments.join('/')
    breadcrumbs.unshift(await loadPage({ path, slug }))
    segments.pop()
  }

  breadcrumbs.unshift( {
    ...await loadPage({ path: '/index' }),
    path: '/'
  })

  return breadcrumbs.length > 1 ? breadcrumbs : []
})

async function loadPage({ path, slug }) {

  let query = queryCollection(props.collection)

  if(slug) {
    query = query
      .where('path', 'LIKE',`%.${locale.value}`)
      .andWhere(q => q.where('permalink', '=', slug))
  } else {
    query = query
      .where('path', 'LIKE', `%${path}.${locale.value}`)
  }

  const { id, title } = await query.first() || {}

  return { id, title: title || path, path }
}

</script>

<template>
  <div id="breadcrumb" class="breadcrumb container container--flex">
    <nav class="breadcrumb-navigation">
      <ul>
        <li v-for="(item, index) in breadcrumbs" :key="item.id">
          <NuxtLinkLocale :to="item.path">
            <SvgIcon
              v-if="index > 0"
              icon="ChevronRight"
              class="breadcrumb__include-icon"
              aria-hidden="true"
            />
            <span>{{ item.title }}</span>
          </NuxtLinkLocale>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
li {
  margin: 0 !important;
}
</style>
