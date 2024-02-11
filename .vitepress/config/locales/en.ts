import { type DefaultTheme, defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  description: 'Creopse documentation.',

  themeConfig: {
    nav: nav(),
    siteTitle: 'Creopse',

    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() },
    },

    footer: {
      message: 'Publié sous la licence MIT.',
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://edpage.net" target="_blank">edPage</a>`,
    },

    editLink: {
      pattern: ({ filePath }) => {
        return `https://github.com/creopse/docs/edit/master/src/${filePath.replace(
          '/docs',
          ''
        )}`
      },
      text: 'Suggest changes to this page',
    },
  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Guide', link: '/guide/getting-started' },
    { text: 'API Reference', link: '/api/' },
    {
      text: 'FAQ',
      link: '/faq/',
    },
    {
      text: 'v1.0.0',
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/creopse/creopse/releases',
        },
        {
          text: 'Report a bug',
          link: 'https://github.com/creopse/creopse/issues',
        },
      ],
    },
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [{ text: 'Getting started', link: 'getting-started' }],
    },
    {
      text: 'Others',
      collapsed: false,
      items: [{ text: 'About', link: 'about' }],
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
