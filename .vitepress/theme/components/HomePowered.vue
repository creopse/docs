<script setup lang="ts">
  import { computed } from 'vue'
  import { useData, withBase } from 'vitepress'

  const props = withDefaults(
    defineProps<{
      lang?: 'fr' | 'en'
    }>(),
    {
      lang: undefined,
    },
  )

  type Lang = 'fr' | 'en'

  interface Site {
    name: string
    url: string
    logo: string
    logoDark: string
  }

  interface I18n {
    title: string
    subtitle: string
  }

  const sites: Site[] = [
    {
      name: 'edPage',
      url: 'https://edpage.net',
      logo: '/images/logos/edpage.svg',
      logoDark: '/images/logos/edpage-dark.svg',
    },
    {
      name: 'Ebenmedia',
      url: 'https://ebenmedia.com',
      logo: '/images/logos/ebenmedia.svg',
      logoDark: '/images/logos/ebenmedia-dark.svg',
    },
  ]

  const i18n: Record<Lang, I18n> = {
    fr: {
      title: 'Ils utilisent Creopse',
      subtitle:
        'Des équipes qui font confiance à Creopse pour gérer leur contenu au quotidien.',
    },
    en: {
      title: 'Powered by Creopse',
      subtitle: 'Teams that trust Creopse to manage their content every day.',
    },
  }

  const { localeIndex, isDark } = useData()

  const resolvedLang = computed<Lang>(() => {
    if (props.lang) return props.lang
    return localeIndex.value === 'fr' ? 'fr' : 'en'
  })

  const content = computed<I18n>(() => i18n[resolvedLang.value])

  const resolveLogo = (site: Site): string =>
    withBase(isDark.value ? site.logoDark : site.logo)
</script>

<template>
  <section class="home-powered">
    <div class="powered-header">
      <p class="powered-title">{{ content.title }}</p>
      <p class="powered-subtitle">{{ content.subtitle }}</p>
    </div>

    <div class="powered-grid">
      <a
        v-for="site in sites"
        :key="site.name"
        :href="site.url"
        :aria-label="site.name"
        target="_blank"
        rel="noopener noreferrer"
        class="powered-item"
      >
        <img :src="resolveLogo(site)" :alt="site.name" class="powered-logo" />
      </a>
    </div>
  </section>
</template>

<style scoped>
  .home-powered {
    margin: 64px auto;
    max-width: 960px;
    padding: 0 24px;
    text-align: center;
  }

  .powered-header {
    margin-bottom: 40px;
  }

  .powered-title {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1e9cd7;
    margin-bottom: 10px;
  }

  .powered-subtitle {
    font-size: 15px;
    color: var(--vp-c-text-2);
    line-height: 1.65;
  }

  .powered-grid {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 48px;
  }

  .powered-item {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.65;
    transition: opacity 0.2s ease;
  }

  .powered-item:hover {
    opacity: 1;
    border-bottom-color: #ff6501;
  }

  .powered-logo {
    height: 36px;
    width: auto;
    max-width: 160px;
    object-fit: contain;
  }

  @media (max-width: 640px) {
    .home-powered {
      margin: 40px auto;
    }

    .powered-grid {
      gap: 32px;
    }
  }
</style>
