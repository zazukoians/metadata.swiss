<script lang="ts" setup>
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
  <UContainer>
    <UPage v-if="data">
      <template #left>
        <UPageAside>
          <UContentNavigation
            v-if="navigation?.length"
            :navigation="navigation"
          />
        </UPageAside>
      </template>

      <ContentRenderer v-if="data" :value="data" />
    </UPage>
  </UContainer>
</template>
