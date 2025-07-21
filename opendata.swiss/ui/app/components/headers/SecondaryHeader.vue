<template>
    <header class="page-header">
        <div class="page-header-container">
           <v-breadcrumbs color="primary" :items="translatedBreadcumbs" />
            

          <h1>{{props.pageTitle }}</h1>
        </div>
    </header>
</template>

<script lang="ts" setup>

import { computed, defineProps } from 'vue'
import { OdsBreadcrumb } from './model/breadcrumb';


import { useI18n } from 'vue-i18n'

const { t, locale} = useI18n()


const props = defineProps<{
    pageTitle: string,
    breadcrumbs: OdsBreadcrumb[];
}>()
 
const translatedBreadcumbs = computed<OdsBreadcrumb[]>(() => {
    return props.breadcrumbs.map((breadcrumb) => {
        const isLastBreadcrumb = props.breadcrumbs.indexOf(breadcrumb) === props.breadcrumbs.length - 1;
        if (breadcrumb.title.startsWith('message.')) {
            return {
                ...breadcrumb,
                title: t(breadcrumb.title),
                disabled: isLastBreadcrumb
            }
        }
          return {
            ...breadcrumb,
            disabled: isLastBreadcrumb
        }
    })
})
      
 
</script>

<style lang="scss" scoped >
@use '@/styles/ods_breakpoints.scss' as mdeia;

.page-header {
    width: 100vw;
    
}
.page-header-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: var(--ods-color);
    padding-bottom: 32px;
    padding-top: 16px;
    h1 {
        padding-left: 16px;
        color:white
    }
   

}

/* Scoped style targeting links inside breadcrumbs */
:deep(.v-breadcrumbs a) {
  color: white !important;
  text-decoration: none;
}


</style>