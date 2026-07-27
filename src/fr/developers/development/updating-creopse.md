---
layout: doc
---

# Mise à jour de Creopse

Le package `creopse/creopse` est versionné via des tags Git (série `v0.x` actuellement — API encore susceptible d'évoluer) et se met à jour comme n'importe quelle dépendance Composer, avec une particularité : les fichiers publiés dans l'application hôte à l'installation ne se mettent pas à jour tout seuls.

::: tip
Il n'existe pas encore de changelog publié ni de commande `creopse:update` dédiée — la mise à jour passe par une réinstallation contrôlée (`creopse:install`) plutôt qu'un chemin de migration automatisé.
:::

## 1. Mettre à jour le package

```bash
composer update creopse/creopse
```

## 2. Sauvegarder les fichiers personnalisés

`php artisan creopse:install` republie l'ensemble des fichiers du package dans l'application hôte, en écrasant par défaut (mode force) :

- `tailwind.config.js`, `postcss.config.js`, `vite.config.js`
- `routes/api.php`, `routes/web.php`
- tout le dossier `resources/`
- les fichiers de `database/migrations` et `database/seeders`

::: warning
Toute modification personnalisée dans ces emplacements doit être committée, sauvegardée ou stashée avant de relancer la commande — sans quoi elle est perdue. L'option `--no-force` désactive ce comportement si nécessaire.
:::

## 3. Relancer l'installation

```bash
php artisan creopse:install -t vue   # ou -t react, selon le frontend du projet
```

C'est cette étape qui republie effectivement les nouveaux fichiers de la version installée (configuration, assets de l'interface d'administration, ressources frontend, routes, contrôleurs, modèles, enums...) — `composer update` seul ne suffit pas.

## 4. Appliquer les migrations

`creopse:install` ne lance **ni les migrations ni les seeders** automatiquement. Une fois les nouveaux fichiers republiés :

```bash
php artisan migrate
```

## Résumé

```bash
composer update creopse/creopse
# sauvegarder tout changement dans resources/, routes/api.php, routes/web.php,
# database/migrations, database/seeders si nécessaire
php artisan creopse:install -t vue
php artisan migrate
```

Voir aussi [Déploiement en production](../deployment/production) pour la checklist à revalider après une mise à jour.
