---
layout: doc
---

# Concepts de base

## Les sections

L'élément de base de Creopse est la section, elle peut être définie comme un bloc de contenu contextualisé et localisé. Toute section possède une structure de données permettant d'organiser son contenu et des paramètres permettant d'adapter son rendu.

## Les pages

Les pages dans Creopse sont des empilements de sections dont on peut modifier la position et le contenu. Chaque page peut comporter autant de sections que nécessaire, et le contenu de chacune est lié à la page sur laquelle elle se trouve. Une même section peut ainsi être utilisée sur plusieurs pages avec des contenus différents, ou apparaître plusieurs fois sur une même page. Il est également possible de lier le contenu d'une section à son contenu sur une autre page.

![Section / Page relationship](/images/core-concepts/section_page_relation_fr.svg)

## Les modèles de contenu

Les modèles de contenu sont des modèles de données qui permettent de récupérer du contenu lié au contexte métier de la plateforme et qui peut être utilisé un peu partout, par exemple des services, des articles, des produits, etc. Ils sont accessibles depuis n'importe quelle section de n'importe quelle page.

## Les structures de données

Les structures de données sont des descriptions de la forme des données qui constituent le contenu de divers éléments comme les sections et les modèles de contenu. Elles permettent à Creopse de générer les champs nécessaires pour récupérer les données constituant le contenu dans l'interface d'administration.

On distingue deux types de composantes dans les structures de données :

- **Les singletons** :

Ce sont des composantes qui permettent de récupérer des données de contenus simples, par exemple un titre, une image, un texte, etc.

- **Les collections** :

Ce sont des composantes qui permettent de récupérer des données de contenus complexes et répétitifs, par exemple une liste de membres d'équipe, une liste de témoignages clients, etc.

![Singleton vs Collection](/images/core-concepts/singleton_vs_collection_fr.svg)
