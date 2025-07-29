interface Options {
  route: ReturnType<typeof useRoute>;
  locale: ReturnType<typeof useI18n>['locale'];
  loadContent: (arg: { route: typeof route }) => object
}

export async function useBreadcrumbs({route, locale, loadContent}: Options) {
  // const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug

  const breadcrumbs = []
  const segments = route.path.split('/')
    .filter(segment => segment)
    .slice(1)

  while (segments.length) {
    const path = `/` + segments.join('/')
    const { id, title } = await loadContent({ path }) || {}
    breadcrumbs.unshift({
      id, title: title || path, path
    })
    segments.pop()
  }

  const index = await queryCollection('pages')
    .where('path', 'LIKE', `%/index.${locale.value}`)
    .first()
  breadcrumbs.unshift({
    ...index,
    path: '/'
  })

  return breadcrumbs.length > 1 ? breadcrumbs : []
}
