<template>
    <div id="main-content">
      <section class="hero hero--default">
        <div class="container container--grid gap--responsive">
          <div class="hero__content">
          <h1 class="hero__title">opendata.swiss</h1>
          <div class="hero__description">
            <p class="bold">{{ t('message.about.ods_paragraph_1') }}</p>
            <p>{{ t('message.about.ods_paragraph_2') }}</p>
            <p class="bold">{{ t('message.about.ods_paragraph_3') }}</p>
            <ul>
              <li>{{ t('message.about.ods_list_1') }}</li>
              <li>{{ t('message.about.ods_list_2') }}</li>
              <li>{{ t('message.about.ods_list_3') }}</li>
            </ul>
            <p>{{ t('message.about.ods_paragraph_4') }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section section--py">
      <div class="container container--grid container--reverse-mobile gap--responsive">
        <div class="container__main vertical-spacing">
          <h2 :id="slugify(t('message.about.ods_title_2'))" class="h2">{{ t('message.about.ods_title_2') }}</h2>
          <p>{{ t('message.about.ods_paragraph_5') }} <ExternalLink href="https://handbook.opendata.swiss/"> handbook.opendata.swiss</ExternalLink></p>
          <figure>
            <picture>
              <a title="handbook.opendata.swiss" target="_blank" href="https://handbook.opendata.swiss">
                <img loading="lazy" decoding="async" src="@/assets/ods/logo/handbook_logo.png" alt="opendate.swiss handbook logo"></a>
            </picture>
          </figure>
            <h2 :id="slugify(t('message.about.ods_title_3'))" class="h2">{{ t('message.about.ods_title_3') }}</h2>
            <p>{{ t('message.about.ods_paragraph_6') }}</p>
            <p>{{ t('message.about.ods_paragraph_7') }}<ExternalLink :href="t('message.about.ods_paragraph_7_href')">
              {{ t('message.about.ods_paragraph_7_a') }}</ExternalLink>{{ t('message.about.ods_paragraph_7_1') }}</p>
            <h2 :id="slugify(t('message.about.ods_title_4'))" class="h2">{{ t('message.about.ods_title_4') }}</h2>
              <p>{{ t('message.about.ods_paragraph_8') }} <NuxtLinkLocale to="/organisations">
                      {{ t('message.about.ods_paragraph_8_a') }}
                  </NuxtLinkLocale> {{ t('message.about.ods_paragraph_8_1') }}</p>
            <p>{{ t('message.about.ods_paragraph_9') }}</p>
            <p>no translation</p>
            <h2 id="dokumente" class="h2">{{ t('message.about.ods_title_5') }}</h2>
            <p>{{ t('message.about.ods_paragraph_10') }} <ExternalLink :href="t('message.about.ods_paragraph_10_href')">{{ t('message.about.ods_paragraph_10_a') }}</ExternalLink>.</p>
            <p>{{ t('message.about.ods_paragraph_11') }} <NuxtLinkLocale to="/contact">
                      {{ t('message.about.ods_paragraph_11_a') }}</NuxtLinkLocale>.</p>

        </div>
        <div class="container__aside">
          <div id="aside-content" class="sticky sticky--top">
            <div class="card card--default">
              <div class="card__content">
                <div class="card__body">
                  <div class="card__title">
                    <h2>Inhaltverzeichnis</h2>
                  </div>
                  <ul class="menu text--sm">
                    <li v-for="heading in headings" :key="heading.id">
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
        </div>
        </div>
      </div>
    </section>
    </div>
</template>

<script lang="ts" setup>
import type { Breadcrumb } from '../../app/model/breadcrumb';
import ExternalLink  from '../../app/components/ExternalLink.vue';
import { useI18n } from 'vue-i18n'
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const { t } = useI18n()

const breadcrumbs: Breadcrumb[] = [
  {
    title: 'message.metadata.homepage',
    disabled: false,
    to: '/',
  },
  {
    title: 'message.header.navigation.data.ods_what_is_ods',
    disabled: false,
    to: '/',
  },
];

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

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumerics with hyphens
    .replace(/(^-|-$)+/g, ''); // Remove leading/trailing hyphens
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


<style scoped lang="scss">
// @use '@/styles/ods_breakpoints.scss' as mdeia;

</style>
