import { type DefaultTheme, defineConfig } from 'vitepress'

export const fr = defineConfig({
  lang: 'fr-FR',
  description: 'Documentation de Creopse.',

  themeConfig: {
    nav: nav(),
    siteTitle: 'Creopse',

    sidebar: {
      '/fr/guide/': { base: '/fr/guide/', items: sidebarGuide() },
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://edpage.net" target="_blank">edPage</a>`,
    },

    editLink: {
      pattern: 'https://github.com/creopse/docs/edit/main/:path',
      text: 'Suggérer des modifications à cette page',
    },

    docFooter: {
      prev: 'Page précédente',
      next: 'Page suivante',
    },

    outline: {
      label: 'Sur cette page',
    },

    lastUpdated: {
      text: 'Mis à jour le',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },

    langMenuLabel: 'Changer de langue',
    returnToTopLabel: 'Retour au début de la page',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Passer an thème sombre',
    lightModeSwitchTitle: 'Passer au thème clair',
    darkModeSwitchTitle: 'Apparence',
  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Guide', link: '/fr/guide/getting-started' },
    { text: 'API', link: '/fr/api/' },
    {
      text: 'FAQ',
      link: '/fr/faq/',
    },
    {
      text: 'Journal de modifications',
      link: 'https://github.com/creopse/creopse/releases',
    },
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [{ text: 'Pour commencer', link: 'getting-started' }],
    },
    {
      text: 'Autres',
      collapsed: false,
      items: [{ text: 'A propos', link: 'about' }],
    },
    {
      collapsed: false,
      items: [
        { text: 'FAQ', link: 'faq/' },
        { text: 'API', link: 'api/' },
      ],
    },
  ]
}
