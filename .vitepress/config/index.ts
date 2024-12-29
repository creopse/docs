import { defineConfig } from 'vitepress'

import { en } from './locales/en'
import { fr, search as frSearch } from './locales/fr'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/docs/',
  srcDir: './src',
  outDir: './.vitepress/build',

  title: 'Creopse',

  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        sizes: 'any',
        href: '/docs/images/creopse-icon.svg',
      },
    ],
    ['meta', { name: 'theme-color', content: '#4EC4E3' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'fr' }],
    ['meta', { property: 'og:title', content: 'Creopse | Documentation' }],
    ['meta', { property: 'og:site_name', content: 'Creopse' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/images/creopse-icon.svg',
      dark: '/images/creopse-icon.svg',
      alt: 'Creopse',
      width: 48,
      height: 48,
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          ...frSearch,
        },
      },
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/creopse',
      },
    ],
  },
  locales: {
    root: { label: 'English', ...en },
    fr: { label: 'Français', ...fr },
  },
})
