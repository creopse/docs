import { type DefaultTheme } from '@viteplus/versions'

export const en = {
  lang: 'en',
  label: 'English',
  description: 'Creopse documentation.',

  themeConfig: {
    nav: nav(),
    siteTitle: false as const,

    sidebar: {
      '/developers/': { base: '/developers/', items: developerDocs() },
      '/users/': { base: '/users/', items: userGuide() },
    },

    footer: {
      // message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://edpage.net" target="_blank">edPage</a>`,
    },

    editLink: {
      pattern: ({ filePath }: { filePath: string }) => {
        return `https://github.com/creopse/docs/edit/master/src/${filePath.replace(
          '/docs',
          '',
        )}`
      },
      text: 'Suggest changes to this page',
    },
  },
}

function nav() {
  return {
    root: [
      {
        text: 'Developer Docs',
        link: '/developers/getting-started/introduction',
      },
      { text: 'User Guide', link: '/users/getting-started' },
      {
        text: 'Support & Updates',
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/creopse/creopse/releases',
            target: '_blank',
            rel: 'noopener',
          },
          {
            text: 'Report a bug',
            link: 'https://github.com/creopse/creopse/issues',
            target: '_blank',
            rel: 'noopener',
          },
        ],
      },
      { component: 'VersionSwitcher' },
    ],
  }
}

function developerDocs(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Getting started',
      collapsed: false,
      items: [
        { text: 'Introduction', link: 'getting-started/introduction' },
        { text: 'Core concepts', link: 'getting-started/core-concepts' },
        { text: 'Installation', link: 'getting-started/installation' },
      ],
    },
    {
      text: 'Development',
      collapsed: false,
      items: [
        { text: 'Template structure', link: 'development/template-structure' },
        { text: 'Sections & Widgets', link: 'development/sections-widgets' },
        { text: 'Content models', link: 'development/content-models' },
        { text: 'Utilities', link: 'development/utilities' },
        { text: 'Authentication', link: 'development/authentication' },
        { text: 'API & Endpoints', link: 'development/api-endpoints' },
        { text: 'Updating Creopse', link: 'development/updating-creopse' },
      ],
    },
    {
      text: 'Deployment',
      collapsed: false,
      items: [{ text: 'Production', link: 'deployment/production' }],
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
        { text: 'Configuration', link: 'admin-panel/configuration' },
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
