<script setup>
const { title } = defineProps({
  title: {
    type: String,
    required: true
  },
})

</script>

<template>
  <div class="card card--universal card--clickable">
    <div class="card__content">
      <div class="card__body">
        <p class="meta-info">
          <slot name="top-meta" />
        </p>
        <div class="card__title">
          <h3>{{ title }}</h3>
        </div>
        <slot/>

        <p class="meta-info">
          <slot name="bottom-meta" />
        </p>
        <div class="card__content-icons">
          <slot name="icons"/>
        </div>
      </div>
      <div class="card__footer">
        <div class="card__footer__info">
          <p class="meta-info">
            <slot name="footer-info"/>
          </p>
        </div>
        <div class="card__footer__action">
          <slot name="footer-action"/>
        </div>
      </div>
    </div>
  </div>
</template>
