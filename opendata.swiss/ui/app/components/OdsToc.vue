<script setup lang="ts">
const { t } = useI18n()

const { toc } = defineProps({
  toc: {
    type: Object,
    required: true,
  }
})

const headings = ref<{ id: string, text: string }[]>([]);
const activeHeadingId = ref<string | null>(null);

function updateActiveHeading() {
  const h2s = Array.from(document.querySelectorAll('#main-content h2[id]')) as HTMLElement[];
  if (!h2s.length) return;
  const centerOffset = -100; // px, adjust for later switching
  const viewportCenter = window.scrollY + window.innerHeight / 2 + centerOffset;
  let closestId = h2s[0].id;
  let minDist = Math.abs(h2s[0].getBoundingClientRect().top + window.scrollY - viewportCenter);
  for (const h2 of h2s) {
    const rect = h2.getBoundingClientRect();
    const h2Center = rect.top + window.scrollY + rect.height / 2;
    const dist = Math.abs(h2Center - viewportCenter);
    if (dist < minDist) {
      minDist = dist;
      closestId = h2.id;
    }
  }
  activeHeadingId.value = closestId;
}

onMounted(async () => {
  await nextTick();
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    const h2s = mainContent.querySelectorAll('h2[id]');
    headings.value = Array.from(h2s).map(h2 => ({
      id: h2.id,
      text: h2.textContent || '',
    }));
  }
  updateActiveHeading();
  window.addEventListener('scroll', updateActiveHeading, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveHeading);
});
</script>

<template>
  <div class="card card--default">
    <div class="card__content">
      <div class="card__body">
        <div class="card__title">
          <h2>{{ t('message.ods_toc.contents') }}</h2>
        </div>
        <ul class="menu text--sm">
          <li v-for="heading in toc.links" :key="heading.id">
            <a
              :href="`#${heading.id}`"
              :class="['menu__item', 'menu__item--border', 'menu__item--condensed', { 'menu__item--active': heading.id === activeHeadingId }]"
            >
              <div>{{ heading.text }}</div>
              <svg viewBox="0 0 24 24" enable-background="new 0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon icon--base icon--ArrowAngleBottomLeft menu__item__icon">
                <path xmlns="http://www.w3.org/2000/svg" d="m17.7 13.7v-8.4h-.8v7.7h-11.8l2.4-4.2-.6-.4-2.9 4.9 2.9 4.9.6-.4-2.4-4.2z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: unset;
  margin-top: unset;
}
</style>
