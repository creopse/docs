---
layout: doc
---

# Basics

A Creopse plugin encapsulates additional functionality (Laravel classes, routes, migrations, configuration, optionally a frontend part) in an isolated, independently installable way, without touching the core of the host application.

::: warning
There is no command that generates a plugin's initial structure (directory, manifest, bootstrap class) — it must be created manually, as described below. The `plugin:make-*` commands (see further down) only generate classes **inside** an already-existing plugin.
:::

## Structure of a plugin

A plugin lives in `storage/plugins/{vendor}-{name}/` on the host application, and must contain at least a `plugin.json` file at its root:

```json
{
  "id": "vendor/plugin-name",
  "version": "1.0.0",
  "plugin": "Vendor\\PluginName\\PluginNamePlugin",
  "autoload": {
    "psr-4": {
      "Vendor\\PluginName\\": "src/"
    }
  }
}
```

- **`id`**, **`version`**, **`plugin`** are required — their absence throws an exception at load time.
- **`plugin`** is the fully qualified class name that acts as the entry point (see [The `PluginInterface` contract](#the-plugininterface-contract) below).
- **`autoload.psr-4`** declares the namespace → plugin folder mapping; it's dynamically registered on the host application's Composer autoloader at load time — no separate `composer.json` is needed at the plugin level.
- A plugin can bundle its own third-party dependencies in a local `vendor/` (typically sealed with [PHP-Scoper](https://github.com/humbug/php-scoper) to avoid version conflicts with the host); if present, its `vendor/autoload.php` is loaded automatically.
- A plugin can also bundle a frontend part, deployed to `public/creopse/plugins/{id}/` on install — this integrates with the admin interface, not the public site's rendering (which stays driven by the template's [sections and widgets](../development/sections-widgets)). An optional `frontend_dev_url` field in the manifest lets it point to a frontend dev server while the plugin is being built.

## The `PluginInterface` contract

The class declared in `plugin` must implement `Creopse\Creopse\Contracts\PluginInterface`:

```php
interface PluginInterface
{
    public function getId(): string;

    public function getVersion(): string;

    // Dependencies on other plugins (by id) — checked at registration,
    // with no version check: the required plugin just needs to be loaded.
    public function getDependencies(): array;

    // Main entry point, called by the plugin manager.
    public function boot(PluginManager $manager): void;
}
```

## What you can do inside `boot()`

The `PluginManager` received as a parameter exposes the following methods to integrate with the host application:

| Method | Role |
| --- | --- |
| `registerRoutes(string $path)` | Registers a route file (`api` group), once the application has booted. |
| `registerMigrations(string $path)` | Adds a migrations folder specific to the plugin. |
| `registerConfig(string $key, string $path)` | Merges a plugin config file into the application's config. |
| `addHook(string $event, callable $callback)` | Listens to an application event (`Event::listen`). |

## Generating classes inside a plugin

Once the folder and `plugin.json` are in place, a family of Artisan commands generates common classes **inside the targeted plugin** (the folder must already exist):

| Command | Generates into | Type |
| --- | --- | --- |
| `plugin:make-model {plugin} {Name} [--migration]` | `src/Models` | Eloquent model (`--migration` also creates the associated migration) |
| `plugin:make-controller {plugin} {Name} [--resource]` | `src/Http/Controllers` | Controller (`--resource` for an API resource controller) |
| `plugin:make-request {plugin} {Name}` | `src/Http/Requests` | Form request |
| `plugin:make-event {plugin} {Name}` | `src/Events` | Event |
| `plugin:make-listener {plugin} {Name} [--event=] [--queued]` | `src/Listeners` | Listener |
| `plugin:make-job {plugin} {Name} [--sync]` | `src/Jobs` | Job (queued by default, `--sync` for a synchronous job) |
| `plugin:make-seeder {plugin} {Name}` | `database/seeders` | Seeder |
| `plugin:make-migration {plugin} {name} [--create=table]` | `database/migrations` | Migration |

```bash
php artisan plugin:make-model vendor/plugin-name Post --migration
php artisan plugin:make-controller vendor/plugin-name PostController --resource
php artisan plugin:make-event vendor/plugin-name PostPublished
```

The target namespace is derived from the `autoload.psr-4` root in `plugin.json`, overridable with `--namespace`.

## Listing, installing, and managing plugins

The full lifecycle (install, update, enable/disable, uninstall) goes through the [API](../development/api-endpoints#plugins) and the [admin interface](../admin-panel/plugins), not Artisan commands:

- **Install** — a `.zip` containing `plugin.json`, a `backend/` folder (→ `storage/plugins/{id}/`) and/or `frontend/` (→ `public/creopse/plugins/{id}/`). The plugin's migrations run automatically; on failure, the deployed folders are removed. An installed plugin is **not** enabled automatically.
- **Update** — same flow, backing up existing folders before replacing them; automatically restored if migrations fail.
- **Enable/disable** — flips a simple flag, no files touched.
- **Uninstall** — rolls back the plugin's migrations, then deletes its folders.
