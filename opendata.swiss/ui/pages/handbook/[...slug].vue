<script lang="ts" setup>
import OdsBreadcrumbs from "../../app/components/OdsBreadcrumbs.vue";

const { locale } = useI18n();

const route = useRoute()
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
      <OdsBreadcrumbs :page="data" collection="pages" />
    </template>
  </OdsPage>
</template>
