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
    { text: 'API', link: '/guide/advanced/api-usage' },
    {
      text: 'FAQ',
      link: '/guide/resources/faq',
    },
    {
      text: 'v0.0.8',
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
      items: [
        { text: 'Getting started', link: 'getting-started' },
        { text: 'Configuration', link: 'configuration' },
      ],
    },
    {
      text: 'Core Concepts',
      collapsed: false,
      items: [
        { text: 'Understanding Creopse', link: 'core/understanding-creopse' },
      ],
    },
    {
      text: 'User Guide',
      collapsed: false,
      items: [
        { text: 'Content Management', link: 'usage/content-management' },
        { text: 'User & Role Management', link: 'usage/user-role-management' },
        { text: 'Media Management', link: 'usage/media-management' },
      ],
    },
    {
      text: 'Frontend Integration',
      collapsed: false,
      items: [
        { text: 'Using Inertia.js', link: 'frontend/inertia' },
        { text: 'Creating Custom Pages', link: 'frontend/custom-pages' },
        { text: 'Theming & Styling', link: 'frontend/theming' },
      ],
    },
    {
      text: 'Advanced Features',
      collapsed: false,
      items: [
        { text: 'Using the API', link: 'advanced/api-usage' },
        { text: 'Extending Creopse', link: 'advanced/extending-creopse' },
        { text: 'Events & Hooks', link: 'advanced/events-hooks' },
      ],
    },
    {
      text: 'Deployment & Maintenance',
      collapsed: false,
      items: [
        { text: 'Updating Creopse', link: 'deployment/updating-creopse' },
      ],
    },
    {
      text: 'Resources',
      collapsed: false,
      items: [{ text: 'FAQ', link: 'resources/faq' }],
    },
  ]
}
