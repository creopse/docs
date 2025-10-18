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
        {
          text: 'Understanding Creopse',
          link: 'core-concepts/understanding-creopse',
        },
      ],
    },
    {
      text: 'Administration panel',
      collapsed: false,
      items: [
        {
          text: 'Content management',
          link: 'admin-panel/content-management/getting-started',
          items: [
            {
              text: 'Platform identity',
              link: 'admin-panel/content-management/platform-identity',
            },
            {
              text: 'Menus',
              link: 'admin-panel/content-management/menus',
            },
            {
              text: 'Pages',
              link: 'admin-panel/content-management/pages',
            },
            {
              text: 'Content models',
              link: 'admin-panel/content-management/content-models',
            },
            {
              text: 'Permalinks',
              link: 'admin-panel/content-management/permalinks',
            },
            {
              text: 'Newsletter',
              link: 'admin-panel/content-management/newsletter',
            },
            {
              text: 'Ads',
              link: 'admin-panel/content-management/ads',
            },
            {
              text: 'Videos',
              link: 'admin-panel/content-management/videos',
            },
          ],
        },
        {
          text: 'User & Role management',
          link: 'admin-panel/user-role-management',
        },
        { text: 'Media management', link: 'admin-panel/media-management' },
        { text: 'Plugins', link: 'admin-panel/plugins' },
        { text: 'Customization', link: 'admin-panel/customization' },
      ],
    },
    {
      text: 'Development',
      collapsed: false,
      items: [
        { text: 'Project structure', link: 'development/project-structure' },
        { text: 'Sections & Widgets', link: 'development/sections-widgets' },
        { text: 'Content models', link: 'development/content-models' },
        { text: 'Utilities', link: 'development/utilities' },
        { text: 'Authentication', link: 'development/authentication' },
        { text: 'API & Endpoints', link: 'development/api-endpoints' },
        { text: 'Updating Creopse', link: 'development/updating-creopse' },
      ],
    },
    {
      text: 'Resources',
      collapsed: false,
      items: [
        { text: 'CLI', link: 'resources/cli' },
        { text: 'FAQ', link: 'resources/faq' },
      ],
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
