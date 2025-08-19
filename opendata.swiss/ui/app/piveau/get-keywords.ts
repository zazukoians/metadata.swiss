import type { Dataset } from "@piveau/sdk-core";
import type { LocaleInstance } from "@piveau/sdk-vue";


export function getKeywords(dataset: Dataset, localeInstance: LocaleInstance) {
  const keywords = (dataset?.keywords || [])
  const locale = localeInstance.currentLocale;

  return keywords.filter(keyword => {
    return keyword.language === locale
  })
}

