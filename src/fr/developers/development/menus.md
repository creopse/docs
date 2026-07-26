---
layout: doc
---

# Menus

Un menu est assigné à une **location** (`header`, `footer`...) ; les **items** sont les entrées de navigation ; **groupes** et **types** servent à catégoriser/styler les items — notamment pour les dropdowns. Sans cette étape, un Header ou un Footer scaffoldé n'a rien à afficher en développement.

Voir la [référence CLI](../resources/cli#creopse-menu-alias-men) pour la syntaxe complète, et [Gestion des menus](../admin-panel/content-management/menus) pour l'équivalent depuis l'interface d'administration.

## Locations, menus et items

Une **location** est un emplacement de rendu (header, footer, sidebar...). Un **menu** est assigné à une location et regroupe des **items** — chaque item peut avoir des sous-items (`--parent <id>`), formant les dropdowns.

```bash
creopse menu location-add header --description "en:Site header"
creopse menu add main --title "en:Main Menu" --location header
creopse menu item-add main --title "en:Home" --page home --target-type page-link --position 1
creopse menu item-add main --title "en:About" --path "/about" --parent 1 --menu-item-type dropdown
```

## Cible d'un item (`--target-type`)

| `target-type` | Usage | Options associées |
| --- | --- | --- |
| `external-link` | URL brute (interne ou externe) | `--url` ou `--path` |
| `page-link` | Vers une [page](./pages) créée dans Creopse | `--page <name>` |
| `content-link` | Vers un item de [modèle de contenu](./content-models) ou un contenu news natif | `--content-type`, `--content-id` |

## Consommer un menu dans un composant

Toujours passer par `useMenu()` — jamais un `href` en dur ni une liste construite à la main :

```ts
const { getMenuItemsByLocation, getMenuHref, openMenu } = useMenu()

const items = getMenuItemsByLocation('header', true)
```

```vue
<a :href="getMenuHref(item)" @click.prevent="openMenu(item)">{{ tr(item.title) }}</a>
```

Ce pattern est le même pour le menu principal, un sous-menu (`item.subMenuItems`), ou une liste positionnée par location (Header, Footer). Voir [Sections & Widgets](./sections-widgets#liens-et-boutons-cta) pour le détail du rendu, et [Utilitaires](./utilities#usemenu) pour la signature complète de `useMenu()`.

## Résoudre un champ `menu-item-link`

Un champ de type `menu-item-link` (utilisé pour un bouton CTA de section, par exemple) accepte soit l'id d'un item de menu existant, soit une URL brute. Sa résolution passe par `getLinkFromMenuItemId` (`useMenu()`) et `openLink` (`useHelper()`) plutôt que par un usage direct de la valeur :

```vue
<a :href="getLinkFromMenuItemId(field)" @click.prevent="openLink(field)">{{ tr(label) }}</a>
```

Voir [Types de champs](./sections-widgets#types-de-champs) pour la règle de choix entre `menu-item-link` et `text` selon l'usage du champ.
