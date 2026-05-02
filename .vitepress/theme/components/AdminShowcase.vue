<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { useData, withBase } from 'vitepress'

  // Optional prop — overrides auto-detection when set explicitly.
  // Useful if the component is placed in a context where useData()
  // doesn't reflect the right locale (e.g. shared layout files).
  const props = withDefaults(
    defineProps<{
      lang?: 'fr' | 'en'
    }>(),
    {
      lang: undefined,
    },
  )

  type Lang = 'fr' | 'en'
  type Theme = 'light' | 'dark'

  interface Tab {
    id: string
    label: string
    description: string
    alt: string
  }

  interface I18n {
    eyebrow: string
    title: string
    subtitle: string
    tabs: Tab[]
  }

  // Screenshot paths follow the convention:
  //   /images/screenshots/{lang}/{theme}/{tab.id}.png
  // Drop your files at those paths and they are picked up automatically.
  const screenshotPath = (lang: Lang, theme: Theme, id: string): string =>
    withBase(`/images/screenshots/${lang}/${theme}/${id}.png`)

  const i18n: Record<Lang, I18n> = {
    fr: {
      eyebrow: "Interface d'administration",
      title: 'Tout ce dont vous avez besoin, au même endroit',
      subtitle:
        'Une interface pensée pour les équipes — claire pour les rédacteurs, puissante pour les développeurs.',
      tabs: [
        {
          id: 'visual-editor',
          label: 'Éditeur visuel',
          description:
            "Rédigez et mettez en page votre contenu sans écrire une seule ligne de code. L'éditeur visuel offre une expérience WYSIWYG complète, pensée pour les équipes éditoriales.",
          alt: "Capture d'écran de l'éditeur visuel Creopse",
        },
        {
          id: 'content-models',
          label: 'Modèles de contenu',
          description:
            "Définissez la structure de chaque type de contenu selon vos besoins — articles, fiches produit, événements. Creopse s'adapte à votre modèle de données, pas l'inverse.",
          alt: "Capture d'écran de la gestion des modèles de contenu",
        },
        {
          id: 'media',
          label: 'Médias',
          description:
            "Centralisez images, vidéos et documents dans une médiathèque unifiée. Organisez, recherchez et réutilisez vos assets depuis n'importe quelle page de l'administration.",
          alt: "Capture d'écran de la gestion des médias",
        },
        {
          id: 'plugins',
          label: 'Plugins',
          description:
            'Installez, activez ou désactivez des extensions en un clic. Chaque plugin étend les capacités de Creopse sans modifier le cœur du système.',
          alt: "Capture d'écran de la gestion des plugins",
        },
      ],
    },
    en: {
      eyebrow: 'Administration interface',
      title: 'Everything you need, in one place',
      subtitle:
        'An interface built for teams — straightforward for editors, powerful for developers.',
      tabs: [
        {
          id: 'visual-editor',
          label: 'Visual editor',
          description:
            'Write and lay out your content without writing a single line of code. The visual editor provides a full WYSIWYG experience designed for editorial teams.',
          alt: 'Screenshot of the Creopse visual editor',
        },
        {
          id: 'content-models',
          label: 'Content models',
          description:
            'Define the structure of each content type to fit your needs — articles, product pages, events. Creopse adapts to your data model, not the other way around.',
          alt: 'Screenshot of the content model management interface',
        },
        {
          id: 'media',
          label: 'Media',
          description:
            'Centralise images, videos and documents in a unified media library. Organise, search and reuse your assets from anywhere in the administration.',
          alt: 'Screenshot of the media management interface',
        },
        {
          id: 'plugins',
          label: 'Plugins',
          description:
            'Install, enable or disable extensions in one click. Each plugin extends Creopse without touching the core system.',
          alt: 'Screenshot of the plugin management interface',
        },
      ],
    },
  }

  const { localeIndex, isDark } = useData()

  const resolvedLang = computed<Lang>(() => {
    if (props.lang) return props.lang
    return localeIndex.value === 'fr' ? 'fr' : 'en'
  })

  const resolvedTheme = computed<Theme>(() => (isDark.value ? 'dark' : 'light'))

  const content = computed<I18n>(() => i18n[resolvedLang.value])

  const active = ref<string>('visual-editor')

  // Reset to first tab when language switches so the ID stays valid.
  watch(resolvedLang, () => {
    active.value = 'visual-editor'
  })

  const activeTab = computed<Tab>(
    () =>
      content.value.tabs.find((t) => t.id === active.value) ??
      content.value.tabs[0],
  )

  const activeImage = computed<string>(() =>
    screenshotPath(resolvedLang.value, resolvedTheme.value, activeTab.value.id),
  )
</script>

<template>
  <section class="admin-showcase">
    <div class="showcase-header">
      <p class="showcase-eyebrow">{{ content.eyebrow }}</p>
      <h3 class="showcase-title">{{ content.title }}</h3>
      <p class="showcase-subtitle">{{ content.subtitle }}</p>
    </div>

    <div class="showcase-tabs" role="tablist">
      <button
        v-for="tab in content.tabs"
        :key="tab.id"
        role="tab"
        :aria-selected="active === tab.id"
        :class="['tab-btn', { active: active === tab.id }]"
        @click="active = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="showcase-body">
      <transition name="fade" mode="out-in">
        <div
          :key="`${resolvedLang}-${resolvedTheme}-${active}`"
          class="showcase-content"
        >
          <div class="showcase-image-wrap">
            <img
              :src="activeImage"
              :alt="activeTab.alt"
              class="showcase-image"
            />
          </div>
          <p class="showcase-description">{{ activeTab.description }}</p>
        </div>
      </transition>
    </div>
  </section>
</template>

<style scoped>
  .admin-showcase {
    margin: 64px auto;
    max-width: 960px;
    padding: 0 24px;
  }

  .showcase-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .showcase-eyebrow {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1e9cd7;
    margin-bottom: 12px;
  }

  .showcase-title {
    font-size: clamp(22px, 4vw, 32px);
    font-weight: 700;
    color: var(--vp-c-text-1);
    margin-bottom: 14px;
    line-height: 1.25;
  }

  .showcase-subtitle {
    font-size: 16px;
    color: var(--vp-c-text-2);
    max-width: 520px;
    margin: 0 auto;
    line-height: 1.65;
  }

  .showcase-tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 32px;
    border-bottom: 1px solid var(--vp-c-divider);
    gap: 0;
  }

  .tab-btn {
    position: relative;
    padding: 10px 22px;
    border: none;
    border-bottom: 3px solid transparent;
    background: transparent;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-text-2);
    cursor: pointer;
    transition:
      color 0.2s ease,
      border-color 0.2s ease;
    white-space: nowrap;
    margin-bottom: -1px;
  }

  .tab-btn:hover {
    color: var(--vp-c-text-1);
  }

  .tab-btn.active {
    color: #1e9cd7;
    border-bottom-color: #ff6501;
    font-weight: 600;
  }

  .showcase-body {
    min-height: 480px;
  }

  .showcase-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .showcase-image-wrap {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg-soft);
    line-height: 0;
  }

  .showcase-image {
    width: 100%;
    height: auto;
    display: block;
  }

  .showcase-description {
    text-align: center;
    font-size: 15px;
    color: var(--vp-c-text-2);
    line-height: 1.7;
    max-width: 640px;
    margin: 0 auto;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }

  .fade-enter-from {
    opacity: 0;
    transform: translateY(8px);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
  }

  @media (max-width: 640px) {
    .admin-showcase {
      margin: 40px auto;
    }

    .tab-btn {
      padding: 8px 14px;
      font-size: 13px;
    }

    .showcase-body {
      min-height: unset;
    }
  }
</style>
