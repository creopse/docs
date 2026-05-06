---
layout: doc
---

# Structure du template

La structure du template Creopse est basée sur celle du backend utilisé pour faire son installation. Creopse ajoute certains répertoires nécessaires à son fonctionnement mais toute la structure du backend hôte reste pleinement fonctionnelle.

## Avec un backend Laravel

Les versions de Laravel supportées sont la 10, la 11, la 12 et la 13. Lors de l'installation, Creopse détecte automatiquement la version utilisée et intègre à la structure existante les répertoires, fichiers et packages nécessaires à son fonctionnement.

> [!WARNING]
> L'installation doit être **vierge**. Creopse écrase certains fichiers lors de l'installation ; des fichiers personnalisés préexistants pourraient être perdus.

Les éléments marqués ✦ sont ajoutés par Creopse. Le reste appartient à la structure native de Laravel.

### Avec un frontend Vue

```text
mon-site/
...
├── config/
│   ├── creopse.php           # ✦ Configuration de Creopse
├── public/
│   ├── creopse/              # ✦ Fichiers du panel d'administration
├── resources/
│   ├── css/
│   ├── js/
|   |   ├── assets/
│   |   ├── components/
|   |   |   ├── sections/     # ✦ Composants de sections
|   |   |   ├── widgets/      # ✦ Composants de widgets
|   |   ├── composables/
|   |   |   ├── dataloader.ts # ✦ Composables de pré-chargement de données
|   |   ├── pages/
|   |   |   ├── Container.vue # ✦ Composant racine de l'application
|   |   |   ├── NotFound.vue  # ✦ Composant de page 404
|   |   ├── stores/           # ✦ Stores Pinia
|   |   ├── app.ts
|   |   ├── App.vue
|   |   ├── constants.ts      # ✦ Constantes globales
|   ├── views/                # Vues Blade
├── storage/
│   ├── plugins/              # ✦ Plugins de l'application
...
```

#### Éléments notables

- **[`creopse.php`](./configuration#configuration-du-backend)** — Point d'entrée de la configuration Creopse.
- **`public/creopse/`** — Assets compilés du panel d'administration. Ce répertoire est géré par Creopse ; ne pas modifier manuellement.
- **`resources/js/pages/Container.vue`** — Composant racine qui reçoit les données de page depuis Inertia et orchestre le rendu des sections et widgets.
- **`resources/js/composables/dataloader.ts`** — Composable exécuté au lancement de la plateforme pour le pré-chargement de données asynchrones côté client.
- **`resources/js/stores/`** — Stores Pinia de l'application. Creopse y injecte quelques stores au démarrage.
- **[`plugins/`](../plugins-development/basics)** — Répertoire de stockage des plugins installés. Chaque plugin est isolé dans son propre sous-répertoire `{vendor}-{name}/`.

### Avec un frontend React

```text
mon-site/
...
├── config/
│   ├── creopse.php           # ✦ Configuration de Creopse
├── public/
│   ├── creopse/              # ✦ Fichiers du panel d'administration
├── resources/
│   ├── css/
│   ├── js/
|   |   ├── assets/
│   |   ├── components/
|   |   |   ├── sections/     # ✦ Composants de sections
|   |   |   ├── widgets/      # ✦ Composants de widgets
|   |   ├── hooks/
|   |   |   ├── dataloader.ts # ✦ Hooks de pré-chargement de données
|   |   ├── pages/
|   |   |   ├── Container.tsx # ✦ Composant racine de l'application
|   |   |   ├── NotFound.tsx  # ✦ Composant de page 404
|   |   ├── stores/           # ✦ Stores Zustand
|   |   ├── app.tsx
|   |   ├── constants.ts      # ✦ Constantes globales
|   |   ├── i18n.ts           # ✦ Configuration de la traduction
|   ├── views/                # Vues Blade
├── storage/
│   ├── plugins/              # ✦ Plugins de l'application
...
```

#### Éléments notables

- **[`creopse.php`](./configuration#configuration-du-backend)** — Identique à la configuration Vue. Point d'entrée de la configuration Creopse.
- **`resources/js/pages/Container.tsx`** — Équivalent React de `Container.vue`. Reçoit les props Inertia et orchestre le rendu des sections et widgets.
- **`resources/js/hooks/dataloader.ts`** — Hook exécuté au lancement de la plateforme pour le pré-chargement de données asynchrones côté client.
- **`resources/js/stores/`** — Stores Zustand de l'application.
- **[`plugins/`](../plugins-development/basics)** — Répertoire de stockage des plugins installés. Chaque plugin est isolé dans son propre sous-répertoire `{vendor}-{name}/`.
