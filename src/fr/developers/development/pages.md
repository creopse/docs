---
layout: doc
---

# Pages

Une page Creopse est un empilement d'**instances de sections** : chaque section y apparaît avec ses propres données, un ordre d'affichage et un état actif/inactif. La section elle-même (composant + structure) est définie une seule fois — voir [Sections & Widgets](./sections-widgets) — et peut être instanciée sur plusieurs pages, ou plusieurs fois sur la même page, avec un contenu distinct à chaque fois.

![Section / Page relation](/images/core-concepts/section-page-relation-fr-light.svg#light-only)
![Section / Page relation](/images/core-concepts/section-page-relation-fr-dark.svg#dark-only)

Voir la [référence CLI](../resources/cli#creopse-page-alias-pag) pour la syntaxe complète des commandes utilisées ci-dessous, et [Pages](../admin-panel/content-management/pages) pour l'équivalent depuis l'interface d'administration.

## Créer une page

```bash
creopse page add home --title "en:Home" --title "fr:Accueil" --position 1
```

Cette commande ne crée que la coquille de la page (titre par langue, contenu optionnel, position) — aucune section n'y est attachée à ce stade.

## Pages de détail (`*-details`)

Une page de détail (`service-details`, `project-details`, `news-details`...) est une page comme les autres, créée de la même façon, portant généralement une seule section de type détail (`ServiceDetails`, `ProjectDetails`...). Deux différences la distinguent d'une page classique :

- Elle ne reçoit **pas** d'entrée de [menu](./menus) — son point d'entrée est un [permalien](./permalinks) plutôt qu'un lien de navigation direct.
- Le contenu qu'elle affiche ne vient pas de sa propre structure de section, mais de l'item de [modèle de contenu](./content-models) résolu par le permalien (`useProps().contentModelItem`).

## Attacher des sections

```bash
creopse page attach-section home Hero --link-id top --data @.creopse/sections/Hero/fake-data.json
creopse page attach-section home Hero --link-id bottom --data '{"heading":"Footer hero"}'
```

`--link-id` identifie une instance précise (`default` si omis). Utiliser un id explicite dès qu'une même section doit apparaître plusieurs fois sur le site — sur la même page (exemple ci-dessus) ou sur des pages différentes — avec un contenu propre à chaque emplacement.

## Partager les données entre pages

Pour une section censée rester strictement identique partout (Footer, Header typiquement) plutôt que dupliquée manuellement sur chaque page :

```bash
creopse page attach-section about Footer --link-id bottom
creopse page set-section-source about Footer --link-id bottom --source-page home --source-link-id bottom
```

Une modification future du Footer sur `home` se répercute alors automatiquement sur `about`.

## Ordonner les sections

```bash
creopse page order-sections home --item "Hero:top" --item "Hero:bottom"
```

L'ordre des `--item` (format `section:link-id`) détermine l'ordre d'affichage vertical sur la page.

## Activer, désactiver ou détacher une instance

```bash
creopse page toggle-section-status home Hero --link-id bottom --disabled true
creopse page detach-section home Hero --link-id top --force
```

`toggle-section-status` désactive une instance sans la retirer (utile pour une section prête mais pas encore destinée à être publiée) ; `detach-section` la retire définitivement — à réserver aux erreurs d'attachement plutôt qu'à une désactivation temporaire.

::: tip
Toutes ces commandes se scriptent aussi depuis l'interface d'administration — voir [Pages](../admin-panel/content-management/pages) pour l'équivalent visuel de chaque action.
:::
