import { type DefaultTheme, defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  description: 'Creopse documentation.',

  themeConfig: {
    nav: nav(),
    siteTitle: 'Creopse',

    sidebar: {
      '/developers/': { base: '/developers/', items: developerDocs() },
      '/users/': { base: '/users/', items: userGuide() },
    },

    footer: {
      message: 'Released under the MIT License.',
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
    { text: 'Developer Docs', link: '/developers/getting-started' },
    { text: 'User Guide', link: '/users/getting-started' },
    {
      text: 'v0.5.0',
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

function developerDocs(): DefaultTheme.SidebarItem[] {
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

function userGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [{ text: 'Getting started', link: 'getting-started' }],
    },
  ]
}
