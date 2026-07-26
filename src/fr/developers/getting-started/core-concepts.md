---
layout: doc
---

# Concepts de base

## Les sections

L'élément de base de Creopse est la section, elle peut être définie comme un bloc de contenu contextualisé et localisé. Toute section possède une structure de données permettant d'organiser son contenu et des paramètres permettant d'adapter son rendu. Voir [Sections & Widgets](../development/sections-widgets) pour le détail de leur création et de leur structure.

## Les widgets

Un widget est un bloc d'interface statique, sans structure de données ni contenu géré depuis l'administration — un préchargeur ou une barre de progression de scroll, par exemple. Contrairement à une section, il n'est ni éditable ni traduisible. Voir [Sections & Widgets](../development/sections-widgets#widgets).

## Les pages

Les pages dans Creopse sont des empilements de sections dont on peut modifier la position et le contenu. Chaque page peut comporter autant de sections que nécessaire, et le contenu de chacune est lié à la page sur laquelle elle se trouve. Une même section peut ainsi être utilisée sur plusieurs pages avec des contenus différents, ou apparaître plusieurs fois sur une même page. Il est également possible de lier le contenu d'une section à son contenu sur une autre page. Voir [Pages](../development/pages) pour le détail des commandes et des cas d'usage.

![Section / Page relation](/images/core-concepts/section-page-relation-fr-light.svg#light-only)
![Section / Page relation](/images/core-concepts/section-page-relation-fr-dark.svg#dark-only)

## Les menus

Un menu regroupe les liens de navigation d'un emplacement donné (header, footer...). Les composants comme le Header ou le Footer ne font qu'afficher les items définis par ce système plutôt que des liens codés en dur, ce qui permet de gérer la navigation depuis l'administration sans toucher au code. Voir [Menus](../development/menus).

## Les modèles de contenu

Les modèles de contenu sont des modèles de données qui permettent de récupérer du contenu lié au contexte métier de la plateforme et qui peut être utilisé un peu partout, par exemple des services, des articles, des produits, etc. Ils sont accessibles depuis n'importe quelle section de n'importe quelle page. Voir [Modèles de contenu](../development/content-models).

## Les permaliens

Un permalien associe un préfixe d'URL public à un contenu — un item de modèle de contenu, ou un article/catégorie/tag de news — et à la page qui le rend. Sans permalien, un modèle de contenu n'a pas de page de détail accessible, même si celle-ci est déjà codée. Voir [Permaliens](../development/permalinks).

## Les structures de données

Les structures de données sont des descriptions de la forme des données qui constituent le contenu de divers éléments comme les sections et les modèles de contenu. Elles permettent à Creopse de générer les champs nécessaires pour récupérer les données constituant le contenu dans l'interface d'administration.

On distingue deux types de composantes dans les structures de données :

- **Les singletons** :

Ce sont des composantes qui permettent de récupérer des données de contenus simples, par exemple un titre, une image, un texte, etc.

- **Les collections** :

Ce sont des composantes qui permettent de récupérer des données de contenus complexes et répétitifs, par exemple une liste de membres d'équipe, une liste de témoignages clients, etc.

![Singleton vs Collection](/images/core-concepts/singleton-vs-collection-fr-light.svg#light-only)
![Singleton vs Collection](/images/core-concepts/singleton-vs-collection-fr-dark.svg#dark-only)

Voir [Types de champs](../development/sections-widgets#types-de-champs) pour la liste complète des types disponibles, et [Utilitaires](../development/utilities) pour les composables/hooks qui consomment ces données dans un composant.
