---
layout: doc
---

# Production

A Creopse application deploys like any other **Laravel + Inertia** application — the usual best practices (server, caching, Composer/Artisan optimizations) apply without any particularity. This page therefore only covers what's specific to Creopse; for everything else, refer to [Laravel's official deployment guide](https://laravel.com/docs/deployment).

## Deployment steps

```bash
# Dependencies, without development packages
composer install --optimize-autoloader --no-dev
pnpm install --frozen-lockfile

# Build frontend assets — never `pnpm dev` in production
pnpm build

# Migrations
php artisan migrate --force

# Laravel optimizations
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Link to public storage (media library, uploads)
php artisan storage:link
```

Make sure `storage/` and `bootstrap/cache/` stay writable by the PHP process, and that queue workers (if used) are restarted after deployment.

## Specific to Creopse

### `public/creopse/config.jsonc`

`apiBaseUrl` must point to the production domain, not a development value (`creopse.test`, `localhost`...) — otherwise the admin interface keeps calling the wrong API once deployed.

### `forceDevMode`

Must stay `false` in production. See [Configuration](../development/configuration#development-mode) — enabling it in production allows editing data structures for every content element from a deployed environment, which isn't desirable outside of explicit debugging.

### `install.lock`

The `public/creopse/install.lock` file must be absent in production. If it's still present, any visit to `/creopse/` redirects to the install wizard instead of the admin interface — see [Installation](../getting-started/installation#option-b-—-manual-configuration).

### Default credentials

If the default admin account (`admin`/`admin`) wasn't changed during initial setup, do it before going live — see [Installation](../getting-started/installation).

### Response compression

The compression middleware automatically negotiates Brotli, Gzip, or Deflate depending on the PHP extensions available and whether the connection is HTTPS. Check that `ext-brotli` (for Brotli) or `ext-zlib` (for Gzip/Deflate) is actually installed on the host — otherwise compression stays silently disabled. See [Configuration](../development/configuration#http-response-compression) to adjust `compression.level`/`compression.min_length`, or to disable compression if it's already handled upstream (Nginx, Caddy, a CDN).

### Rate limiting

`CREOPSE_RATE_LIMIT` (default `600`/minute) has no universal production value — adjust it based on actual expected traffic rather than keeping the default out of habit.

## Before going live

- [ ] `APP_ENV=production` and `APP_DEBUG=false` in `.env`.
- [ ] `apiBaseUrl` updated in `public/creopse/config.jsonc`.
- [ ] `forceDevMode` set to `false`.
- [ ] `install.lock` absent.
- [ ] Default admin credentials changed.
- [ ] Assets built through `pnpm build` (not `pnpm dev`).

::: tip See also
Once in production, see [Updating Creopse](../development/updating-creopse) for the version upgrade process.
:::
