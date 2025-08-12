import { schemaDataset } from '@piveau/sdk-core'
import { dcatApDataset, defineHubSearch } from '@piveau/sdk-vue'

/**
 * Returns a piveau hub-search query definition for DCAT-AP datasets
 */
export function useDatasetsSearch() {
  return defineHubSearch({
    baseUrl: 'https://piveau-hub-search-ln.zazukoians.org/',
    index: 'dataset',
    indexDetails: 'datasets',
    facets: ['categories', 'publisher', 'catalog', 'format', 'license', 'keywords'],
    schema: schemaDataset,
  }, dcatApDataset().setup)
}
