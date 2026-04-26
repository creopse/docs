import { type DefaultTheme } from '@viteplus/versions'

export const fr = {
  lang: 'fr',
  label: 'Français',
  description: 'Documentation de Creopse.',

  themeConfig: {
    nav: nav(),
    siteTitle: false as const,

    sidebar: {
      '/developers/': { base: '/developers/', items: developerDocs() },
      '/users/': { base: '/users/', items: userGuide() },
    },

    footer: {
      message: 'Publié sous la licence MIT.',
      copyright: `Copyright © ${new Date().getFullYear()} <a href="https://edpage.net" target="_blank">edPage</a>`,
    },

    editLink: {
      pattern: ({ filePath }: { filePath: string }) => {
        return `https://github.com/creopse/docs/edit/master/src/${filePath.replace(
          '/docs',
          '',
        )}`
      },
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
        dateStyle: 'short' as const,
        timeStyle: 'short' as const,
      },
    },

    langMenuLabel: 'Changer de langue',
    returnToTopLabel: 'Retour au début de la page',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Passer an thème sombre',
    lightModeSwitchTitle: 'Passer au thème clair',
    darkModeSwitchTitle: 'Apparence',

    notFound: {
      title: 'PAGE NON TROUVEE',
      quote:
        'Mais si vous ne changez pas de direction et si vous continuez à regarder, vous risquez de vous retrouver là où vous allez.',
      linkLabel: "aller à l'accueil",
      linkText: "Me ramener à l'accueil",
      code: '404',
    },
  },
}

export const search: DefaultTheme.LocalSearchOptions['locales'] = {
  fr: {
    translations: {
      button: {
        buttonText: 'Rechercher',
        buttonAriaLabel: 'Rechercher',
      },
      modal: {
        displayDetails: 'Afficher la liste détaillée',
        backButtonTitle: 'Retour',
        noResultsText: "Aucun résultat n'a été trouvé",
        resetButtonTitle: 'Réinitialiser la recherche',
        footer: {
          selectText: 'sélectionner',
          navigateText: 'naviguer',
          closeText: 'fermer',
        },
      },
    },
  },
}

function nav() {
  return {
    root: [
      {
        text: 'Documentation Développeur',
        link: '/developers/getting-started/introduction',
      },
      { text: 'Guide Utilisateur', link: '/users/getting-started' },
      {
        text: 'Support & Mises à jour',
        items: [
          {
            text: 'Journal de modifications',
            link: 'https://github.com/creopse/creopse/releases',
            target: '_blank',
            rel: 'noopener',
          },
          {
            text: 'Signaler un bug',
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
      text: 'Pour commencer',
      collapsed: false,
      items: [
        { text: 'Introduction', link: 'getting-started/introduction' },
        { text: 'Concepts de base', link: 'getting-started/core-concepts' },
        { text: 'Installation', link: 'getting-started/installation' },
      ],
    },
    {
      text: 'Développement',
      collapsed: false,
      items: [
        {
          text: 'Structure du template',
          link: 'development/template-structure',
        },
        { text: 'Sections & Widgets', link: 'development/sections-widgets' },
        { text: 'Modèles de contenu', link: 'development/content-models' },
        { text: 'Utilitaires', link: 'development/utilities' },
        { text: 'Authentification', link: 'development/authentication' },
        { text: 'API & Endpoints', link: 'development/api-endpoints' },
        {
          text: 'Mise à jour de Creopse',
          link: 'development/updating-creopse',
        },
      ],
    },
    {
      text: 'Déploiement',
      collapsed: false,
      items: [{ text: 'Production', link: 'deployment/production' }],
    },
    {
      text: "Interface d'administration",
      collapsed: false,
      items: [
        {
          text: 'Gestion du contenu',
          link: 'admin-panel/content-management/getting-started',
          items: [
            {
              text: 'Identité de la plateforme',
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
              text: 'Modèles de contenu',
              link: 'admin-panel/content-management/content-models',
            },
            {
              text: 'Permaliens',
              link: 'admin-panel/content-management/permalinks',
            },
            {
              text: 'Newsletter',
              link: 'admin-panel/content-management/newsletter',
            },
            {
              text: 'Publicités',
              link: 'admin-panel/content-management/ads',
            },
            {
              text: 'Vidéos',
              link: 'admin-panel/content-management/videos',
            },
          ],
        },
        {
          text: 'Gestion des utilisateurs et rôles',
          link: 'admin-panel/user-role-management',
        },
        { text: 'Gestion des médias', link: 'admin-panel/media-management' },
        { text: 'Plugins', link: 'admin-panel/plugins' },
        { text: 'Personalisation', link: 'admin-panel/customization' },
        { text: 'Configuration', link: 'admin-panel/configuration' },
      ],
    },
    {
      text: 'Ressources',
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
      items: [{ text: 'Pour commencer', link: 'getting-started' }],
    },
  ]
}
