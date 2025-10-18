import { type DefaultTheme, defineConfig } from 'vitepress'

export const fr = defineConfig({
  lang: 'fr-FR',
  description: 'Documentation de Creopse.',

  themeConfig: {
    nav: nav(),
    siteTitle: 'Creopse',

    sidebar: {
      '/fr/developers/': { base: '/fr/developers/', items: developerDocs() },
      '/fr/users/': { base: '/fr/users/', items: userGuide() },
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

    notFound: {
      title: 'PAGE NON TROUVEE',
      quote:
        'Mais si vous ne changez pas de direction et si vous continuez à regarder, vous risquez de vous retrouver là où vous allez.',
      linkLabel: "aller à l'accueil",
      linkText: "Me ramener à l'accueil",
      code: '404',
    },
  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: 'Documentation Développeur',
      link: '/fr/developers/getting-started',
    },
    { text: 'Guide Utilisateur', link: '/fr/users/getting-started' },
    {
      text: 'v0.5.0',
      items: [
        {
          text: 'Journal de modifications',
          link: 'https://github.com/creopse/creopse/releases',
        },
        {
          text: 'Signaler un bug',
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
        { text: 'Pour commencer', link: 'getting-started' },
        { text: 'Configuration', link: 'configuration' },
      ],
    },
    {
      text: 'Concepts de base',
      collapsed: false,
      items: [
        {
          text: 'Comprendre Creopse',
          link: 'core-concepts/understanding-creopse',
        },
      ],
    },
    {
      text: "Panneau d'administration",
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
      ],
    },
    {
      text: 'Développement',
      collapsed: false,
      items: [
        {
          text: 'Structure du projet',
          link: 'development/project-structure',
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
