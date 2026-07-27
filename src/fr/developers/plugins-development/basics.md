---
layout: doc
---

# Les bases

Un plugin Creopse encapsule une fonctionnalité additionnelle (classes Laravel, routes, migrations, configuration, éventuellement une partie frontend) de façon isolée et installable indépendamment, sans toucher au cœur de l'application hôte.

::: warning
Il n'existe pas de commande qui génère la structure initiale d'un plugin (dossier, manifeste, classe bootstrap) — elle doit être créée manuellement, comme décrit ci-dessous. Les commandes `plugin:make-*` (voir plus bas) ne font que générer des classes **à l'intérieur** d'un plugin déjà existant.
:::

## Structure d'un plugin

Un plugin vit dans `storage/plugins/{vendor}-{name}/` sur l'application hôte, et doit contenir au minimum un fichier `plugin.json` à sa racine :

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

- **`id`**, **`version`**, **`plugin`** sont obligatoires — leur absence lève une exception au chargement.
- **`plugin`** est le nom pleinement qualifié de la classe qui sert de point d'entrée (voir [Le contrat `PluginInterface`](#le-contrat-plugininterface) ci-dessous).
- **`autoload.psr-4`** déclare le mapping namespace → dossier du plugin ; il est enregistré dynamiquement sur l'autoloader Composer de l'application hôte au chargement — pas besoin d'un `composer.json` séparé au niveau du plugin.
- Un plugin peut embarquer ses propres dépendances tierces dans un `vendor/` local (généralement scellé avec [PHP-Scoper](https://github.com/humbug/php-scoper) pour éviter les conflits de version avec l'hôte) ; s'il existe, son `vendor/autoload.php` est chargé automatiquement.
- Un plugin peut aussi embarquer une partie frontend, déployée dans `public/creopse/plugins/{id}/` lors de l'installation — cette partie s'intègre à l'interface d'administration, pas au rendu du site public (qui reste piloté par les [sections et widgets](../development/sections-widgets) du template). Un champ optionnel `frontend_dev_url` dans le manifeste permet de pointer vers un serveur de développement frontend pendant que le plugin est en cours de construction.

## Le contrat `PluginInterface`

La classe déclarée dans `plugin` doit implémenter `Creopse\Creopse\Contracts\PluginInterface` :

```php
interface PluginInterface
{
    public function getId(): string;

    public function getVersion(): string;

    // Dépendances sur d'autres plugins (par id) — vérifiées à l'enregistrement,
    // sans contrôle de version : le plugin requis doit simplement être chargé.
    public function getDependencies(): array;

    // Point d'entrée principal, appelé par le gestionnaire de plugins.
    public function boot(PluginManager $manager): void;
}
```

## Ce qu'on peut faire dans `boot()`

Le `PluginManager` reçu en paramètre expose les méthodes suivantes pour s'intégrer à l'application hôte :

| Méthode | Rôle |
| --- | --- |
| `registerRoutes(string $path)` | Enregistre un fichier de routes (groupe `api`), une fois l'application démarrée. |
| `registerMigrations(string $path)` | Ajoute un dossier de migrations propre au plugin. |
| `registerConfig(string $key, string $path)` | Fusionne un fichier de configuration du plugin dans la config de l'application. |
| `addHook(string $event, callable $callback)` | Écoute un événement de l'application (`Event::listen`). |

## Générer des classes à l'intérieur d'un plugin

Une fois le dossier et le `plugin.json` en place, une famille de commandes Artisan génère les classes courantes **dans le plugin ciblé** (le dossier doit déjà exister) :

| Commande | Génère dans | Type |
| --- | --- | --- |
| `plugin:make-model {plugin} {Name} [--migration]` | `src/Models` | Modèle Eloquent (option `--migration` pour créer la migration associée) |
| `plugin:make-controller {plugin} {Name} [--resource]` | `src/Http/Controllers` | Contrôleur (option `--resource` pour un contrôleur API ressource) |
| `plugin:make-request {plugin} {Name}` | `src/Http/Requests` | Form Request |
| `plugin:make-event {plugin} {Name}` | `src/Events` | Événement |
| `plugin:make-listener {plugin} {Name} [--event=] [--queued]` | `src/Listeners` | Listener |
| `plugin:make-job {plugin} {Name} [--sync]` | `src/Jobs` | Job (en queue par défaut, `--sync` pour un job synchrone) |
| `plugin:make-seeder {plugin} {Name}` | `database/seeders` | Seeder |
| `plugin:make-migration {plugin} {name} [--create=table]` | `database/migrations` | Migration |

```bash
php artisan plugin:make-model vendor/plugin-name Post --migration
php artisan plugin:make-controller vendor/plugin-name PostController --resource
php artisan plugin:make-event vendor/plugin-name PostPublished
```

Le namespace cible est déduit de la racine `autoload.psr-4` du `plugin.json`, personnalisable via `--namespace`.

## Lister, installer et gérer les plugins

Le cycle de vie complet (installation, mise à jour, activation, désinstallation) passe par l'[API](../development/api-endpoints#plugins) et l'[interface d'administration](../admin-panel/plugins), pas par des commandes Artisan :

- **Installation** — un `.zip` contenant `plugin.json`, un dossier `backend/` (→ `storage/plugins/{id}/`) et/ou `frontend/` (→ `public/creopse/plugins/{id}/`). Les migrations du plugin sont exécutées automatiquement ; en cas d'échec, les dossiers déployés sont supprimés. Un plugin installé n'est **pas** activé automatiquement.
- **Mise à jour** — même flux, avec sauvegarde des dossiers existants avant remplacement ; restauration automatique si les migrations échouent.
- **Activation/désactivation** — bascule un simple indicateur, sans toucher aux fichiers.
- **Désinstallation** — annule les migrations du plugin puis supprime ses dossiers.
