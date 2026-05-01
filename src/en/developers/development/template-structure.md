---
layout: doc
---

# Template structure

The Creopse template structure is based on the backend used for its installation. Creopse adds the directories required for its operation, while the host backend's native structure remains fully functional.

## With a Laravel backend

Supported Laravel versions are 10, 11 and 12. During installation, Creopse automatically detects the version in use and integrates the necessary directories, files and packages into the existing structure.

> [!WARNING]
> The installation must be **fresh**. Creopse overwrites certain files during installation; any pre-existing custom files may be lost.

Elements marked with ✦ are added by Creopse. Everything else belongs to Laravel's native structure.

### With a Vue frontend

```text
my-site/
...
├── config/
│   ├── creopse.php           # ✦ Creopse configuration
├── public/
│   ├── creopse/              # ✦ Administration panel files
├── resources/
│   ├── css/
│   ├── js/
|   |   ├── assets/
│   |   ├── components/
|   |   |   ├── sections/     # ✦ Section components
|   |   |   ├── widgets/      # ✦ Widget components
|   |   ├── composables/
|   |   |   ├── dataloader.ts # ✦ Data preloading composables
|   |   ├── pages/
|   |   |   ├── Container.vue # ✦ Application root component
|   |   |   ├── NotFound.vue  # ✦ 404 page component
|   |   ├── stores/           # ✦ Pinia stores
|   |   ├── app.ts
|   |   ├── App.vue
|   |   ├── constants.ts      # ✦ Global constants
|   ├── views/                # Blade views
├── storage/
│   ├── plugins/              # ✦ Application plugins
...
```

#### Notable elements

- **[`creopse.php`](./configuration)** — Creopse configuration entry point. Review before any production deployment.
- **`public/creopse/`** — Compiled administration panel assets. This directory is managed by Creopse; do not modify manually.
- **`resources/js/pages/Container.vue`** — Root component that receives page data from Inertia and orchestrates the rendering of sections and widgets.
- **`resources/js/composables/dataloader.ts`** — Composable executed at platform startup for asynchronous client-side data preloading.
- **`resources/js/stores/`** — Application Pinia stores. Creopse injects a few of its own stores at startup.
- **[`plugins/`](../plugins-development/basics)** — Storage directory for installed plugins. Each plugin is isolated in its own `{vendor}-{name}/` subdirectory.

### With a React frontend

```text
my-site/
...
├── config/
│   ├── creopse.php           # ✦ Creopse configuration
├── public/
│   ├── creopse/              # ✦ Administration panel files
├── resources/
│   ├── css/
│   ├── js/
|   |   ├── assets/
│   |   ├── components/
|   |   |   ├── sections/     # ✦ Section components
|   |   |   ├── widgets/      # ✦ Widget components
|   |   ├── hooks/
|   |   |   ├── dataloader.ts # ✦ Data preloading hooks
|   |   ├── pages/
|   |   |   ├── Container.tsx # ✦ Application root component
|   |   |   ├── NotFound.tsx  # ✦ 404 page component
|   |   ├── stores/           # ✦ Zustand stores
|   |   ├── app.tsx
|   |   ├── constants.ts      # ✦ Global constants
|   |   ├── i18n.ts           # ✦ Translation configuration
|   ├── views/                # Blade views
├── storage/
│   ├── plugins/              # ✦ Application plugins
...
```

#### Notable elements

- **[`creopse.php`](./configuration)** — Same as the Vue configuration. Creopse configuration entry point.
- **`resources/js/pages/Container.tsx`** — React equivalent of `Container.vue`. Receives Inertia props and orchestrates the rendering of sections and widgets.
- **`resources/js/hooks/dataloader.ts`** — Hook executed at platform startup for asynchronous client-side data preloading.
- **`resources/js/stores/`** — Application Zustand stores.
- **[`plugins/`](../plugins-development/basics)** — Storage directory for installed plugins. Each plugin is isolated in its own `{vendor}-{name}/` subdirectory.
