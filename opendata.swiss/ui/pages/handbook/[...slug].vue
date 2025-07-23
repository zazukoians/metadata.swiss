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
  <v-container v-if="data" >
    <v-row no-gutters>
      <v-col class="v-col-2">
        <v-list :items="navigation"></v-list>
      </v-col>

      <v-col>
        <ContentRenderer v-if="data" :value="data"/>
      </v-col>
    </v-row>
  </v-container>
</template>
