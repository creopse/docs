---
layout: doc
---

# Updating Creopse

The `creopse/creopse` package is versioned through Git tags (currently the `v0.x` series — the API may still evolve) and updates like any other Composer dependency, with one particularity: the files published into the host application at install time don't update themselves.

::: tip
There is no published changelog yet, nor a dedicated `creopse:update` command — updating goes through a controlled reinstall (`creopse:install`) rather than an automated migration path.
:::

## 1. Update the package

```bash
composer update creopse/creopse
```

## 2. Back up your customized files

`php artisan creopse:install` republishes the package's entire file set into the host application, overwriting by default (force mode):

- `tailwind.config.js`, `postcss.config.js`, `vite.config.js`
- `routes/api.php`, `routes/web.php`
- the entire `resources/` directory
- files under `database/migrations` and `database/seeders`

::: warning
Any custom change in these locations must be committed, backed up, or stashed before rerunning the command — otherwise it's lost. The `--no-force` option disables this behavior if needed.
:::

## 3. Rerun the installer

```bash
php artisan creopse:install -t vue   # or -t react, depending on the project's frontend
```

This is the step that actually republishes the newly installed version's files (admin interface configuration and assets, frontend resources, routes, controllers, models, enums...) — `composer update` alone isn't enough.

## 4. Run migrations

`creopse:install` does **not** run migrations or seeders automatically. Once the new files have been republished:

```bash
php artisan migrate
```

## Summary

```bash
composer update creopse/creopse
# back up any change under resources/, routes/api.php, routes/web.php,
# database/migrations, database/seeders if needed
php artisan creopse:install -t vue
php artisan migrate
```

See also [Production Deployment](../deployment/production) for the checklist to revalidate after an update.
