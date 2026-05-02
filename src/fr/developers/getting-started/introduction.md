---
layout: doc
---

# Introduction

## Qu'est-ce que Creopse ?

**Creopse** est un CMS hybride et extensible, conçu autour d'un backend **Laravel** ou **Adonis**
couplé à un frontend **Vue.js 3** ou **React** via **Inertia.js**. Il embarque à la fois un
front-end intégré pour construire des interfaces rapidement, et une API REST pour diffuser le
contenu vers n'importe quel client externe.

### Pourquoi "hybride" ?

Les CMS traditionnels (WordPress, Drupal) couplent étroitement le rendu et la donnée : le
frontend et le backend partagent le même processus. Les CMS headless vont à l'opposé : ils
suppriment tout front-end et exposent uniquement une API. Creopse prend le meilleur des deux
approches :

- Un **front-end intégré** pour déployer un site complet sans infrastructure séparée.
- Une **API REST** pour alimenter des applications mobiles, des intégrations tierces ou
  tout autre client découplé.

### Un système extensible par conception

Creopse repose sur une architecture de plugins: une nouvelle fonctionnalité peut être encapsulée,
distribuée et installée de manière indépendante, sans toucher au cœur du système.

## Prérequis

### Configuration système

**Avec un backend Laravel :**

- **Laravel** : version 10, 11, 12 ou 13.
- **PHP** :
  - Laravel 10 : 8.1 minimum.
  - Laravel 11 & 12 : 8.2 minimum.
  - Laravel 13 : 8.3 minimum.
- **Composer** : gestion des dépendances PHP.
- **pnpm** : compilation et gestion des assets frontend.

**Avec un backend Adonis :** *(prochainement)*

### Connaissances recommandées

Creopse s'appuie sur des outils existants — une familiarité avec les concepts suivants
accélèrera la prise en main :

- **Laravel ou Adonis** : routage, middlewares, migrations, ORM.
- **Inertia.js** : pont entre le backend et le framework frontend.
- **Vue.js 3 ou React** : rendu côté client et gestion d'état.

Documentation de référence :

- [Laravel](https://laravel.com/docs)
- [Adonis](https://adonisjs.com)
- [Inertia.js](https://inertiajs.com)
- [Vue.js 3](https://vuejs.org)
- [React](https://react.dev)

## Prochaines étapes

- [Concepts de base](./core-concepts.md) : les fondamentaux de l'architecture Creopse.
- [Installation](./installation.md) : mise en place de l'environnement et premier démarrage.
