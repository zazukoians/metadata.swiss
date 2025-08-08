<template>

<div class="card card--list card--clickable">

   <!---->
   <div class="card__content">
      <div class="card__body">
         <p class="meta-info"><span class="meta-info__item">Article</span><span class="meta-info__item">12. April 2022</span></p>
         <div class="card__title">
            <h3>{{ props.item.getTitle }}</h3>
         </div>
         <p>{{ props.item.getDescription }}</p>
         <!---->
      </div>
      <div class="card__footer">
         <div class="card__footer__info">
            <p class="meta-info"><span class="meta-info__item">Topic one</span><span class="meta-info__item">Topic two</span></p>
         </div>
         <div class="card__footer__action">
              <NuxtLink :to="localePath({ name: 'datasets-datasetId', params: { datasetId: props.item.getId } })" type="false" class="btn btn--outline btn--icon-only" aria-label="false">
               <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--ArrowRight btn__icon">
                  <path xmlns="http://www.w3.org/2000/svg" d="m16.444 19.204 4.066-7.044-4.066-7.044-.65.375 3.633 6.294h-15.187v.75h15.187l-3.633 6.294z" />
               </svg>
               <span class="btn__text">Weiterlesen</span>
            </NuxtLink>
         </div>
      </div>
   </div>
</div>



</template>

<script setup lang="ts">
import type { Dataset } from '~/model/dataset';

const localePath = useLocalePath()


interface Props {
  item: Dataset
}
const props = defineProps<Props>()


</script>
