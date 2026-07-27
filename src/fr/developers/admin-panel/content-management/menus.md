---
layout: doc
---

# Menus

Cette rubrique gère la navigation du site — les liens consommés par des composants comme le Header ou le Footer plutôt que codés en dur. Elle correspond côté CLI au groupe [`creopse menu`](../../resources/cli#creopse-menu-alias-men).

![Gestion des menus](/images/screenshots/fr/light/menu-management.png#light-only)
![Gestion des menus](/images/screenshots/fr/dark/menu-management.png#dark-only)

## Barre d'actions

- **Emplacements** — les zones de rendu (`header`, `footer`...) auxquelles un menu peut être assigné.
- **Types** et **Groupes** — catégorisent/stylent les items, utiles notamment pour distinguer un sous-menu déroulant du reste.
- **Paramètres** — réglages globaux du système de menus.
- **Ajouter un menu** — crée un nouveau menu et l'assigne à un emplacement.

## Liste des menus

Chaque menu affiche son nom, une icône d'édition, une icône de suppression, et un bouton **Ouvrir** qui donne accès à ses items (création, réorganisation, suppression, sous-items pour les dropdowns via un `parent`).

::: tip Pour les développeurs
Un item de menu de type `content-link` (lien direct vers un item de modèle de contenu précis, ex. « Notre service phare » dans le header) est différent d'un [permalien](./permalinks) : le permalien rend la page de détail accessible pour **tous** les items d'un modèle sans qu'aucune entrée de menu ne soit nécessaire, alors qu'un item `content-link` est une entrée de navigation **explicite** vers un item en particulier. Les deux mécanismes sont indépendants et coexistent normalement. Voir [Menus](../../development/menus) et [`creopse menu`](../../resources/cli#creopse-menu-alias-men) pour scripter la création via la CLI.
:::
