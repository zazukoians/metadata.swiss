<script lang="ts" setup>
import OdsBreadcrumbs from "../../app/components/OdsBreadcrumbs.vue";

const { locale, t } = useI18n();
const route = useRoute()

const breadcrumbs = await useBreadcrumbs({
  route,
  locale,
  loadContent({ path }) {
    return queryCollection('handbook')
      .where('path', 'LIKE',`%.${locale.value}`)
      .orWhere(q => q
        .where('permalink', '=', path.replace(/^\/handbook\//, ''))
        .where('path', '=',`${path}.${locale.value}`)
        .where('path', '=',`${path}/index.${locale.value}`)
      )
      .first()
  }
})

const { data } = await useAsyncData(route.path, () => {
  const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug

  let query = queryCollection('handbook')

  if(slug) {
    query = query
      .where('path', 'LIKE',`%.${locale.value}`)
      .andWhere(q => q.where('permalink', '=', slug))
  } else {
    query = query
      .where('path', 'LIKE',`%index.${locale.value}`)
  }

  return query.first()
})

useSeoMeta({
  title: `${data.value?.title} | ${t('message.header.navigation.handbook')} | opendata.swiss`,
})

// TODO: make sidebar navigation dynamic based on the handbook content
const navigation = ref([
  {
    title: 'Guide',
    icon: 'i-lucide-book-open',
    path: '#getting-started',
    children: [
      {
        title: 'Introduction',
        path: '#introduction',
        active: true
      },
      {
        title: 'Installation',
        path: '#installation'
      }
    ]
  },
  {
    title: 'Composables',
    icon: 'i-lucide-database',
    path: '#composables',
    children: [
      {
        title: 'defineShortcuts',
        path: '#defineshortcuts'
      },
      {
        title: 'useModal',
        path: '#usemodal'
      }
    ]
  }
])
</script>

<template>
  <OdsPage v-if="data" :page="data" >
    <template #header>
      <OdsBreadcrumbs :breadcrumbs="breadcrumbs" />
    </template>
  </OdsPage>
</template>
