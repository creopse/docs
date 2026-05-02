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

  interface Action {
    text: string
    link: string
    theme: 'brand' | 'alt'
  }

  interface I18n {
    title: string
    subtitle: string
    actions: Action[]
  }

  const i18n: Record<Lang, I18n> = {
    fr: {
      title: 'Prêt à démarrer ?',
      subtitle:
        'Que vous soyez développeur ou utilisateur, tout commence au même endroit.',
      actions: [
        {
          text: '🚀 Commencer (Développeurs)',
          link: '/fr/developers/getting-started/introduction',
          theme: 'brand',
        },
        {
          text: '📖 Guide Utilisateur',
          link: '/fr/users/getting-started',
          theme: 'alt',
        },
      ],
    },
    en: {
      title: 'Ready to get started?',
      subtitle:
        'Whether you are a developer or an end user, everything begins in the same place.',
      actions: [
        {
          text: '🚀 Get Started (Developers)',
          link: '/developers/getting-started/introduction',
          theme: 'brand',
        },
        {
          text: '📖 User Guide',
          link: '/users/getting-started',
          theme: 'alt',
        },
      ],
    },
  }

  const { localeIndex } = useData()

  const resolvedLang = computed<Lang>(() => {
    if (props.lang) return props.lang
    return localeIndex.value === 'fr' ? 'fr' : 'en'
  })

  const content = computed<I18n>(() => i18n[resolvedLang.value])
</script>

<template>
  <section class="home-cta">
    <div class="cta-inner">
      <h3 class="cta-title">{{ content.title }}</h3>
      <p class="cta-subtitle">{{ content.subtitle }}</p>
      <div class="cta-actions">
        <a
          v-for="action in content.actions"
          :key="action.link"
          :href="withBase(action.link)"
          :class="['cta-btn', `cta-btn--${action.theme}`]"
        >
          {{ action.text }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .home-cta {
    margin: 64px auto;
    max-width: 960px;
    padding: 0 24px;
  }

  .cta-inner {
    border-radius: 16px;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg-soft);
    padding: 56px 40px;
    text-align: center;
  }

  .cta-title {
    font-size: clamp(22px, 4vw, 32px);
    font-weight: 700;
    color: var(--vp-c-text-1);
    margin-bottom: 14px;
    line-height: 1.25;
  }

  .cta-subtitle {
    font-size: 16px;
    color: var(--vp-c-text-2);
    max-width: 440px;
    margin: 0 auto 32px;
    line-height: 1.65;
  }

  .cta-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .cta-btn {
    display: inline-block;
    padding: 11px 28px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition:
      opacity 0.2s ease,
      box-shadow 0.2s ease;
  }

  .cta-btn:hover {
    opacity: 0.88;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  .cta-btn--brand {
    background: #1e9cd7;
    color: #fff;
  }

  .cta-btn--alt {
    background: transparent;
    color: var(--vp-c-text-1);
    border: 1.5px solid var(--vp-c-divider);
  }

  .cta-btn--alt:hover {
    border-color: #1e9cd7;
    color: #1e9cd7;
  }

  @media (max-width: 640px) {
    .cta-inner {
      padding: 40px 24px;
    }

    .cta-actions {
      flex-direction: column;
      align-items: center;
    }

    .cta-btn {
      width: 100%;
      max-width: 280px;
      text-align: center;
    }
  }
</style>
