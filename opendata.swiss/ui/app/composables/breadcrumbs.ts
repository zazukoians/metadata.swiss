interface Options {
  route: ReturnType<typeof useRoute>;
  locale: ReturnType<typeof useI18n>['locale'];
  loadContent: (arg: { path: string }) => ReturnType<typeof queryCollection>
}

export async function useBreadcrumbs({route, locale, loadContent}: Options) {
  const breadcrumbs = []
  const segments = route.path.split('/')
    .filter(segment => segment)
    .slice(1)

  while (segments.length) {
    const path = `/` + segments.join('/')
    const { id, breadcrumb_title, title } = await loadContent({ path }).first() || {}
    breadcrumbs.unshift({
      id, title: breadcrumb_title || title || path, path
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
