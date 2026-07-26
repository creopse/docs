---
layout: doc
---

# Interface en ligne de commande

Un utilitaire en ligne de commande pour gérer les sections, widgets, pages, modèles de contenu, permaliens, menus, médias et informations de base de l'écosystème Creopse (Vue ou React).

## Prérequis

- Projet Laravel ou Adonis avec Creopse installé

## Installation

```bash
npm install -g @creopse/cli
```

## Utilisation

```bash
creopse [commande] [options]
```

## Conventions générales

- **Alias de groupe** : `sec` ↔ `section`, `wid` ↔ `widget`, `pag` ↔ `page`, `cm` ↔ `content-model`, `perm` ↔ `permalink`, `men` ↔ `menu`, `med` ↔ `media`, `info` ↔ `base-info`, `plg` ↔ `plugin`.
- **Alias de sous-commande** : chaque paire `add`/`make`, `remove`/`delete`, `edit`/`update` est équivalente.
- **Options JSON** (`--data`, `--settings`, `--data-structure`, `--settings-structure`, `--metadata`) acceptent soit une chaîne JSON inline, soit une référence `@chemin/fichier.json` — le préfixe `@` charge le fichier au lieu de tenter de parser la valeur comme du JSON littéral.
- **Options localisées** (`--title`, `--description`, `--link-title`) sont répétables et prennent une paire `locale:valeur`, par exemple `--title "en:Home" --title "fr:Accueil"`.

::: tip
Le préfixe `@` est obligatoire pour passer un chemin de fichier à une option JSON. Sans lui, la CLI tente de parser la valeur elle-même comme du JSON et échoue :

```bash
creopse section edit Header --data-structure @.creopse/sections/Header/data-structure.json
```

:::

## Commandes disponibles

### `creopse install`

Installe le package Creopse dans votre projet Laravel ou Adonis. Si `--template` n'est pas précisé, la CLI vous invite à choisir le template avant de poursuivre.

**Options :**

- `-t, --template <template>` – Sélectionne le template frontend (vue ou react).
- `--no-force` – Désactive le mode force (activé par défaut).

---

### `creopse section` (alias `sec`)

Gère les composants de sections (Vue ou React). Une section est un bloc UI éditable, traduisible et géré depuis l'administration — voir [Sections & Widgets](../development/sections-widgets).

| Sous-commande | Alias | Description |
| --- | --- | --- |
| `add <name...>` | `make` | Ajoute une ou plusieurs sections (composant + entrée en base de données) |
| `remove <name...>` | `delete` | Supprime une ou plusieurs sections (`-f, --force`) |
| `edit <name>` | `update` | Met à jour le titre, la structure de données et/ou de réglages d'une section |

**Options `add`** (un seul nom à la fois si des options sont passées) : `-t, --title <locale:value>` (répétable), `--data-structure <json|@chemin>`, `--settings-structure <json|@chemin>`.
**Options `edit`** : mêmes options que `add`.

```bash
# Scaffolding en lot
creopse section add Header Hero Features Services Testimonials Footer Contact

# Mise à jour de la structure de données et de réglages d'une section
creopse section edit Header \
  --data-structure @.creopse/sections/Header/data-structure.json \
  --settings-structure @.creopse/sections/Header/settings.json
```

---

### `creopse widget` (alias `wid`)

Gère les composants de widgets (Vue ou React). Un widget est un bloc HTML statique sans besoin de gestion de contenu (préchargeur, barre de progression de scroll...) — pas de structure de données.

| Sous-commande | Alias | Description |
| --- | --- | --- |
| `add <name...>` | `make` | Ajoute un ou plusieurs widgets |
| `remove <name...>` | `delete` | Supprime un ou plusieurs widgets (`-f, --force`) |

```bash
creopse widget add Preloader ScrollProgress
```

---

### `creopse page` (alias `pag`)

Gère les pages du site. Une page est une entité de premier niveau (titre, contenu optionnel, position d'affichage) ; les sections ne sont pas créées avec la page mais attachées séparément via les sous-commandes d'instance — voir [Pages](../development/pages) pour le détail des cas d'usage.

| Sous-commande | Alias | Description |
| --- | --- | --- |
| `add <name>` | `make` | Crée une page vide |
| `edit <name>` | `update` | Met à jour le titre, le contenu et/ou la position |
| `remove <name>` | `delete` | Supprime une page (`-f, --force`) |
| `attach-section <page> <section>` | | Attache une instance de section à une page |
| `detach-section <page> <section>` | | Détache une instance spécifique (`-f, --force`) |
| `order-sections <page>` | | Définit l'ordre d'affichage des sections d'une page |
| `set-section-source <page> <section>` | | Fixe ou efface la page source de données d'une instance |
| `toggle-section-status <page> <section>` | | Active ou désactive une instance |
| `update-section-content <page> <section>` | `edit-section-content` | Met à jour le titre, les données et/ou les réglages d'une instance |

**Options `add`/`edit`** : `-t, --title <locale:value>` (répétable), `--content <texte>`, `--position <nombre>` (défaut de `add` : `0`).
**Options `attach-section`** : `--link-id <id>` (défaut `default`), `--link-title <locale:value>` (répétable), `--data <json|@chemin>`, `--settings <json|@chemin>`, `--source-page <name>`, `--source-link-id <id>` (défaut `default`).
**Options `order-sections`** : `--item <section:link-id>` (répétable, dans l'ordre d'affichage voulu).
**Options `set-section-source`** : `--link-id <id>`, `--source-page <name>` (`none` pour effacer), `--source-link-id <id>`.
**Options `toggle-section-status`** : `--link-id <id>`, `--disabled <bool>` (défaut `true`).
**Options `update-section-content`** : `--link-id <id>`, `--link-title <locale:value>` (répétable), `--data <json|@chemin>`, `--settings <json|@chemin>`.

```bash
# Créer une page
creopse page add home --title "en:Home" --title "fr:Accueil" --position 1

# Attacher deux instances de la même section à des emplacements différents
creopse page attach-section home Hero --link-id top --link-title "en:Hero Top" --data @.creopse/sections/Hero/fake-data.json
creopse page attach-section home Hero --link-id bottom --data '{"heading":"Footer hero"}'

# Réordonner les sections et désactiver l'instance du bas
creopse page order-sections home --item "Hero:top" --item "Hero:bottom"
creopse page toggle-section-status home Hero --link-id bottom --disabled true

# Partager les données d'une instance depuis une autre page (ex. un Footer identique partout)
creopse page set-section-source about Footer --link-id bottom --source-page home --source-link-id bottom

# Détacher une instance
creopse page detach-section home Hero --link-id top --force
```

::: tip
`set-section-source` évite de dupliquer manuellement les mêmes données sur chaque page pour une section censée rester identique partout (Footer, Header). Une modification future sur la page source se répercute automatiquement sur les pages qui en dépendent.
:::

---

### `creopse content-model` (alias `cm`)

Gère les modèles de contenu. Un modèle de contenu définit une structure ; les items sont les enregistrements réels — voir [Modèles de contenu](../development/content-models).

| Sous-commande | Alias | Description |
| --- | --- | --- |
| `add <name> <intent> <access-scope>` | `make` | Crée un modèle de contenu |
| `remove <name>` | `delete` | Supprime un modèle de contenu (`-f, --force`) |
| `edit <name>` | `update` | Met à jour un modèle de contenu |
| `item-add <content-model>` | `item-make` | Crée un item |
| `item-remove <id>` | `item-delete` | Supprime un item (`-f, --force`) |
| `item-edit <id>` | `item-update` | Met à jour un item |

- `intent` : `editorial-content` (contenu géré depuis l'administration) ou `user-data` (contenu soumis par les visiteurs du site).
- `access-scope` : `internal` (associé à `editorial-content`) ou `user-editable` (associé à `user-data`).
- **Options `add`** : `--title`/`--description` (répétables), `--image <valeur>`, `--data-structure <json|@chemin>`, `--title-field-name <valeur>`, `--has-permalink <bool>`.
- **Options `edit`** : mêmes options que `add`, plus `--intent`, `--access-scope`.
- **Options `item-add`** : `--title` (répétable), `--data <json|@chemin>`, `--is-active <bool>` (défaut `true`), `--created-by-type <valeur>` (`user`/`admin`/`system`, défaut `system`).
- **Options `item-edit`** : `--content-model <name>` (déplace l'item vers un autre modèle), `--title` (répétable), `--data <json|@chemin>`, `--is-active <bool>`, `--created-by-type <valeur>`.

```bash
# Modèle de contenu éditorial, avec page de détail
creopse content-model add service editorial-content internal \
  --title "en:Service" --title "fr:Service" \
  --data-structure @.creopse/content-models/Service/data-structure.json \
  --title-field-name name --has-permalink true

# Modèle de données soumises par les visiteurs (ex. formulaire de contact)
creopse content-model add contact-form-messages user-data user-editable \
  --title "en:Contact Messages" --title "fr:Messages de contact" \
  --data-structure @.creopse/content-models/ContactFormMessages/data-structure.json

# Ajout d'items
creopse content-model item-add service --title "en:Energy Audit" --data @.creopse/content-models/Service/items/energy-audit.json
creopse content-model item-edit 12 --title "en:Renamed"
creopse content-model remove service --force
```

::: warning
`--has-permalink true` marque seulement le modèle comme éligible à une page de détail — cela ne câble pas la route. Le câblage réel se fait via `creopse permalink add` (voir ci-dessous).
:::

---

### `creopse permalink` (alias `perm`)

Associe un préfixe d'URL à un contenu (item de modèle de contenu, ou type de contenu natif news) et, optionnellement, à la page qui le rend. Sans cette étape, aucune page de détail n'est jamais atteinte, même parfaitement codée et attachée à sa page — voir [Permaliens](../development/permalinks) pour le détail complet.

| Sous-commande | Alias | Description |
| --- | --- | --- |
| `add <path-prefix> <content-type>` | `make` | Crée un permalien |
| `remove` | `delete` | Supprime un permalien (`-f, --force`) |
| `edit` | `update` | Met à jour un permalien |

- `content-type` : `news-tag`, `news-category`, `news-article`, ou `content-model`.
- **Options `add`** : `--content-id <valeur>` (requis si `content-type=content-model` ; id ou nom du modèle), `--content-param <valeur>` (champ utilisé pour résoudre la cible — `id` ou `slug`, défaut `id`), `--page <name>` (page utilisée pour rendre ce contenu).
- **`remove`/`edit`** identifient la cible avec exactement un de `--id <id>`, `--path-prefix <prefix>`, ou `--content-model <name>`.
- **Options `edit`** : `--new-path-prefix <prefix>`, `--content-param <valeur>`, `--page <name>` (`none` pour désassocier). Le contenu ciblé (`content-type`/`content-id`) ne peut pas être changé une fois fixé.

```bash
# Un modèle de contenu, résolu par id (défaut)
creopse permalink add /services content-model --content-id service --page service-details

# Les articles de news, résolus par slug
creopse permalink add /actualites news-article --content-param slug --page news-details

# Modifier, identifié par son préfixe actuel
creopse permalink edit --path-prefix /services --new-path-prefix /nos-services

# Supprimer, identifié par son modèle de contenu
creopse permalink remove --content-model service --force
```

---

### `creopse menu` (alias `men`)

Gère les menus de navigation. Un menu est assigné à une **location** (`header`, `footer`...) ; les **items** sont les entrées de navigation ; **groupes** et **types** servent à catégoriser/styler les items (dropdowns notamment) — voir [Menus](../development/menus) pour le détail des cas d'usage.

| Sous-commande | Alias | Description |
| --- | --- | --- |
| `add <name>` | `make` | Crée un menu |
| `remove <name>` | `delete` | Supprime un menu (`-f, --force`) |
| `edit <name>` | `update` | Met à jour un menu |
| `item-add <menu>` | `item-make` | Crée un item de menu |
| `item-remove <id>` | `item-delete` | Supprime un item (`-f, --force`) |
| `item-edit <id>` | `item-update` | Met à jour un item |
| `item-group-add/-remove/-edit <name>` | `item-group-make/-delete/-update` | Groupes de menu |
| `item-type-add/-remove/-edit <name>` | `item-type-make/-delete/-update` | Types de menu |
| `location-add/-remove/-edit <name>` | `location-make/-delete/-update` | Locations de menu |

**Options `menu add/edit`** : `--title`/`--description` (répétables), `--data <json>`, `--location <name>` (`none` pour désassigner en `edit`).
**Options `item-add`/`item-edit`** : `--title`/`--description` (répétables), `--path`, `--url`, `--controller`, `--parent <id>` (`none` en `edit`), `--position`, `--target-type` (`external-link`/`page-link`/`content-link`), `--is-active`/`--is-visible` (bool), `--color`, `--icon`, `--image`, `--page <name>` (`none` en `edit`), `--section-key`, `--menu-item-group`, `--menu-item-type`, `--content-type` (`news-tag`/`news-category`/`news-article`/`content-model`), `--content-id`.
**Options groupe/type/location `add`** : `--description` (répétable). **`edit`** : `--new-name`, `--description`.

```bash
creopse menu location-add header --description "en:Site header"
creopse menu add main --title "en:Main Menu" --location header
creopse menu item-add main --title "en:Home" --page home --target-type page-link --position 1
creopse menu item-add main --title "en:About" --path "/about" --parent 1 --menu-item-type dropdown
```

---

### `creopse media` (alias `med`)

Gère les fichiers médias et leurs enregistrements en base. Un **fichier** vit sur le disque, un **enregistrement** (`MediaFile`) est l'entrée en base — les deux peuvent être supprimés indépendamment.

| Sous-commande | Alias | Description |
| --- | --- | --- |
| `upload <path>` | `add` | Upload un fichier local |
| `replace <id> <path>` | | Remplace le fichier sous-jacent d'un enregistrement |
| `remove-file <path>` | | Supprime un fichier du disque (`-f, --force`) |
| `remove-record <id>` | | Supprime un enregistrement `MediaFile` (`--permanent`, `-f, --force`) |
| `restore <id>` | | Restaure un enregistrement supprimé (soft delete) |
| `purge` | | Supprime définitivement tous les enregistrements soft-deleted (`-f, --force`) |

**Options `upload`** : `--folder <name>` (défaut `uploads`), `--filename <name>`, `--metadata <json>`, `--sender <id>`.
**Options `replace`** : `--folder`, `--filename`, `--metadata`.
`remove-record --permanent` force la suppression définitive (sinon soft delete, restaurable via `restore`).

```bash
creopse media upload ./logo.png --folder branding --filename "Company Logo"
creopse media replace 42 ./banner-v2.jpg
creopse media remove-file branding/logo.png --force
creopse media remove-record 42
creopse media restore 42
creopse media purge --force
```

---

### `creopse base-info` (alias `info`)

Gère les informations de base de la plateforme (nom, coordonnées, réseaux sociaux...) consommées par `getAppInformationValue()` — voir [Utilitaires](../development/utilities).

| Sous-commande | Description |
| --- | --- |
| `update <pairs...>` | Met à jour les entrées d'information de base avec des paires `key=value` (valeur possible en `@chemin/fichier`) |

```bash
creopse base-info update name="My App" email=hello@app.com phone="+33123456789"
creopse base-info update description=@description.txt
creopse base-info update facebook="https://facebook.com/myapp" twitter="https://twitter.com/myapp"
```

## Exemples

```bash
# Installer le package
creopse install

# Ajouter plusieurs sections en une fois
creopse section add HeroBanner ContactForm Footer

# Supprimer une section et son entrée en base de données
creopse section remove HeroBanner

# Ajouter et supprimer un widget
creopse widget add NewsletterForm
creopse widget remove NewsletterForm

# Créer une page et lui attacher une section
creopse page add contact --title "en:Contact" --title "fr:Contact" --position 3
creopse page attach-section contact ContactForm --data @.creopse/sections/ContactForm/fake-data.json

# Créer un modèle de contenu, un item, et le permalien associé
creopse content-model add service editorial-content internal --title "en:Service" --has-permalink true
creopse content-model item-add service --title "en:Energy Audit" --data '{"index":{"name":"{\"en\":\"Energy Audit\",\"fr\":\"Audit énergétique\"}"}}'
creopse permalink add /services content-model --content-id service --page service-details

# Créer un menu et un item pointant vers une page
creopse menu add main --title "en:Main Menu" --location header
creopse menu item-add main --title "en:Home" --page home --target-type page-link --position 1
```
