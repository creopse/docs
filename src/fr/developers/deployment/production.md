---
layout: doc
---

# Production

Une application Creopse se déploie comme n'importe quelle application **Laravel + Inertia** — les bonnes pratiques habituelles (serveur, cache, optimisations Composer/Artisan) s'appliquent sans particularité. Cette page ne couvre donc que ce qui est spécifique à Creopse ; pour le reste, se référer au [guide de déploiement officiel de Laravel](https://laravel.com/docs/deployment).

## Étapes de déploiement

```bash
# Dépendances, sans les paquets de développement
composer install --optimize-autoloader --no-dev
pnpm install --frozen-lockfile

# Build des assets frontend — jamais `pnpm dev` en production
pnpm build

# Migrations
php artisan migrate --force

# Optimisations Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Lien vers le stockage public (médiathèque, uploads)
php artisan storage:link
```

Vérifier que `storage/` et `bootstrap/cache/` restent accessibles en écriture par le processus PHP, et que les workers de queue (si utilisés) sont relancés après déploiement.

## Spécifique à Creopse

### `public/creopse/config.jsonc`

`apiBaseUrl` doit pointer vers le domaine de production, pas vers une valeur de développement (`creopse.test`, `localhost`...) — sinon l'interface d'administration continue d'appeler la mauvaise API une fois déployée.

### `forceDevMode`

Doit rester `false` en production. Voir [Configuration](../development/configuration#mode-developpement) — l'activer en prod permet de modifier les structures de données depuis un environnement déployé, ce qui n'est pas souhaitable hors débogage explicite.

### `install.lock`

Le fichier `public/creopse/install.lock` doit être absent en production. S'il est encore présent, toute visite sur `/creopse/` redirige vers le wizard d'installation au lieu de l'interface d'administration — voir [Installation](../getting-started/installation#option-b-—-configuration-manuelle).

### Identifiants par défaut

Si le compte administrateur par défaut (`admin`/`admin`) n'a pas été changé pendant la configuration initiale, le faire avant toute mise en ligne — voir [Installation](../getting-started/installation).

### Compression des réponses

Le middleware de compression négocie automatiquement Brotli, Gzip ou Deflate selon les extensions PHP disponibles et si la connexion est en HTTPS. Vérifier que `ext-brotli` (pour Brotli) ou `ext-zlib` (pour Gzip/Deflate) est bien installé côté hébergeur, sinon la compression reste silencieusement désactivée. Voir [Configuration](../development/configuration#compression-des-reponses-http) pour ajuster `compression.level`/`compression.min_length` ou désactiver la compression si elle est déjà gérée en amont (Nginx, Caddy, CDN).

### Limitation de requêtes

`CREOPSE_RATE_LIMIT` (défaut `600`/minute) n'a pas de valeur universelle en production — l'ajuster selon le trafic réel attendu plutôt que de garder la valeur par défaut par réflexe.

## Avant la mise en ligne

- [ ] `APP_ENV=production` et `APP_DEBUG=false` dans `.env`.
- [ ] `apiBaseUrl` mis à jour dans `public/creopse/config.jsonc`.
- [ ] `forceDevMode` à `false`.
- [ ] `install.lock` absent.
- [ ] Identifiants administrateur par défaut changés.
- [ ] Assets construits via `pnpm build` (pas `pnpm dev`).

::: tip Voir aussi
Une fois en production, voir [Mise à jour de Creopse](../development/updating-creopse) pour le processus de montée de version.
:::
