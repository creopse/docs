---
layout: doc
---

# Command-Line Interface

A command-line utility for managing sections, widgets, pages, content models, permalinks, menus, media, and base information across the Creopse ecosystem (Vue or React).

## Requirements

- Laravel or Adonis project with Creopse installed

## Installation

```bash
npm install -g @creopse/cli
```

## Usage

```bash
creopse [command] [options]
```

## General conventions

- **Group aliases**: `sec` ↔ `section`, `wid` ↔ `widget`, `pag` ↔ `page`, `cm` ↔ `content-model`, `perm` ↔ `permalink`, `men` ↔ `menu`, `med` ↔ `media`, `info` ↔ `base-info`, `plg` ↔ `plugin`.
- **Subcommand aliases**: each pair `add`/`make`, `remove`/`delete`, `edit`/`update` is equivalent.
- **JSON options** (`--data`, `--settings`, `--data-structure`, `--settings-structure`, `--metadata`) accept either an inline JSON string or an `@path/file.json` reference — the `@` prefix loads the file instead of trying to parse the value as literal JSON.
- **Localized options** (`--title`, `--description`, `--link-title`) are repeatable and take a `locale:value` pair, for example `--title "en:Home" --title "fr:Accueil"`.

::: tip
The `@` prefix is required to pass a file path to a JSON option. Without it, the CLI tries to parse the value itself as JSON and fails:

```bash
creopse section edit Header --data-structure @.creopse/sections/Header/data-structure.json
```

:::

## Available commands

### `creopse install`

Installs the Creopse package in your Laravel or Adonis project. If `--template` is not specified, the CLI prompts you to choose one before proceeding.

**Options:**

- `-t, --template <template>` – Selects the frontend template (vue or react).
- `--no-force` – Disables force mode (enabled by default).

---

### `creopse section` (alias `sec`)

Manages section components (Vue or React). A section is an editable, translatable UI block managed from the admin panel — see [Sections & Widgets](../development/sections-widgets).

| Subcommand | Alias | Description |
| --- | --- | --- |
| `add <name...>` | `make` | Adds one or more sections (component + database entry) |
| `remove <name...>` | `delete` | Removes one or more sections (`-f, --force`) |
| `edit <name>` | `update` | Updates a section's title, data structure and/or settings structure |

**`add` options** (a single name at a time when options are passed): `-t, --title <locale:value>` (repeatable), `--data-structure <json|@path>`, `--settings-structure <json|@path>`.
**`edit` options**: same as `add`.

```bash
# Batch scaffolding
creopse section add Header Hero Features Services Testimonials Footer Contact

# Update a section's data structure and settings
creopse section edit Header \
  --data-structure @.creopse/sections/Header/data-structure.json \
  --settings-structure @.creopse/sections/Header/settings.json
```

---

### `creopse widget` (alias `wid`)

Manages widget components (Vue or React). A widget is a static HTML block with no content management needs (preloader, scroll progress bar...) — no data structure.

| Subcommand | Alias | Description |
| --- | --- | --- |
| `add <name...>` | `make` | Adds one or more widgets |
| `remove <name...>` | `delete` | Removes one or more widgets (`-f, --force`) |

```bash
creopse widget add Preloader ScrollProgress
```

---

### `creopse page` (alias `pag`)

Manages site pages. A page is a top-level entity (title, optional content, display position); sections are not created with the page but attached separately through the instance subcommands below — see [Pages](../development/pages) for detailed use cases.

| Subcommand | Alias | Description |
| --- | --- | --- |
| `add <name>` | `make` | Creates an empty page |
| `edit <name>` | `update` | Updates the title, content and/or position |
| `remove <name>` | `delete` | Removes a page (`-f, --force`) |
| `attach-section <page> <section>` | | Attaches a section instance to a page |
| `detach-section <page> <section>` | | Detaches a specific instance (`-f, --force`) |
| `order-sections <page>` | | Sets the display order of a page's sections |
| `set-section-source <page> <section>` | | Sets or clears an instance's data source page |
| `toggle-section-status <page> <section>` | | Enables or disables an instance |
| `update-section-content <page> <section>` | `edit-section-content` | Updates an instance's title, data and/or settings |

**`add`/`edit` options**: `-t, --title <locale:value>` (repeatable), `--content <text>`, `--position <number>` (`add` default: `0`).
**`attach-section` options**: `--link-id <id>` (default `default`), `--link-title <locale:value>` (repeatable), `--data <json|@path>`, `--settings <json|@path>`, `--source-page <name>`, `--source-link-id <id>` (default `default`).
**`order-sections` options**: `--item <section:link-id>` (repeatable, in the desired display order).
**`set-section-source` options**: `--link-id <id>`, `--source-page <name>` (`none` to clear), `--source-link-id <id>`.
**`toggle-section-status` options**: `--link-id <id>`, `--disabled <bool>` (default `true`).
**`update-section-content` options**: `--link-id <id>`, `--link-title <locale:value>` (repeatable), `--data <json|@path>`, `--settings <json|@path>`.

```bash
# Create a page
creopse page add home --title "en:Home" --title "fr:Accueil" --position 1

# Attach two instances of the same section to different spots
creopse page attach-section home Hero --link-id top --link-title "en:Hero Top" --data @.creopse/sections/Hero/fake-data.json
creopse page attach-section home Hero --link-id bottom --data '{"heading":"Footer hero"}'

# Reorder sections and disable the bottom instance
creopse page order-sections home --item "Hero:top" --item "Hero:bottom"
creopse page toggle-section-status home Hero --link-id bottom --disabled true

# Share an instance's data from another page (e.g. an identical Footer everywhere)
creopse page set-section-source about Footer --link-id bottom --source-page home --source-link-id bottom

# Detach an instance
creopse page detach-section home Hero --link-id top --force
```

::: tip
`set-section-source` avoids manually duplicating the same data on every page for a section meant to stay identical everywhere (Footer, Header). A future change on the source page automatically propagates to the pages that depend on it.
:::

---

### `creopse content-model` (alias `cm`)

Manages content models. A content model defines a structure; items are the actual records — see [Content Models](../development/content-models).

| Subcommand | Alias | Description |
| --- | --- | --- |
| `add <name> <intent> <access-scope>` | `make` | Creates a content model |
| `remove <name>` | `delete` | Removes a content model (`-f, --force`) |
| `edit <name>` | `update` | Updates a content model |
| `item-add <content-model>` | `item-make` | Creates an item |
| `item-remove <id>` | `item-delete` | Removes an item (`-f, --force`) |
| `item-edit <id>` | `item-update` | Updates an item |

- `intent`: `editorial-content` (content managed from the admin panel) or `user-data` (content submitted by site visitors).
- `access-scope`: `internal` (paired with `editorial-content`) or `user-editable` (paired with `user-data`).
- **`add` options**: `--title`/`--description` (repeatable), `--image <value>`, `--data-structure <json|@path>`, `--title-field-name <value>`, `--has-permalink <bool>`.
- **`edit` options**: same as `add`, plus `--intent`, `--access-scope`.
- **`item-add` options**: `--title` (repeatable), `--data <json|@path>`, `--is-active <bool>` (default `true`), `--created-by-type <value>` (`user`/`admin`/`system`, default `system`).
- **`item-edit` options**: `--content-model <name>` (moves the item to another model), `--title` (repeatable), `--data <json|@path>`, `--is-active <bool>`, `--created-by-type <value>`.

```bash
# Editorial content model, with a detail page
creopse content-model add service editorial-content internal \
  --title "en:Service" --title "fr:Service" \
  --data-structure @.creopse/content-models/Service/data-structure.json \
  --title-field-name name --has-permalink true

# User-submitted data model (e.g. contact form)
creopse content-model add contact-form-messages user-data user-editable \
  --title "en:Contact Messages" --title "fr:Messages de contact" \
  --data-structure @.creopse/content-models/ContactFormMessages/data-structure.json

# Adding items
creopse content-model item-add service --title "en:Energy Audit" --data @.creopse/content-models/Service/items/energy-audit.json
creopse content-model item-edit 12 --title "en:Renamed"
creopse content-model remove service --force
```

::: warning
`--has-permalink true` only flags the model as eligible for a detail page — it does not wire the route. The actual wiring happens through `creopse permalink add` (see below).
:::

---

### `creopse permalink` (alias `perm`)

Associates a URL prefix with content (a content model item, or a native news content type) and, optionally, with the page that renders it. Without this step, no detail page is ever reached, even once perfectly coded and attached to its page — see [Permalinks](../development/permalinks) for the complete details.

| Subcommand | Alias | Description |
| --- | --- | --- |
| `add <path-prefix> <content-type>` | `make` | Creates a permalink |
| `remove` | `delete` | Removes a permalink (`-f, --force`) |
| `edit` | `update` | Updates a permalink |

- `content-type`: `news-tag`, `news-category`, `news-article`, or `content-model`.
- **`add` options**: `--content-id <value>` (required if `content-type=content-model`; model id or name), `--content-param <value>` (field used to resolve the target — `id` or `slug`, default `id`), `--page <name>` (page used to render this content).
- **`remove`/`edit`** identify the target with exactly one of `--id <id>`, `--path-prefix <prefix>`, or `--content-model <name>`.
- **`edit` options**: `--new-path-prefix <prefix>`, `--content-param <value>`, `--page <name>` (`none` to unlink). The targeted content itself (`content-type`/`content-id`) cannot be changed once set.

```bash
# A content model, resolved by id (default)
creopse permalink add /services content-model --content-id service --page service-details

# News articles, resolved by slug
creopse permalink add /news news-article --content-param slug --page news-details

# Edit, identified by its current prefix
creopse permalink edit --path-prefix /services --new-path-prefix /our-services

# Remove, identified by its content model
creopse permalink remove --content-model service --force
```

---

### `creopse menu` (alias `men`)

Manages navigation menus. A menu is assigned to a **location** (`header`, `footer`...); **items** are the navigation entries; **groups** and **types** categorize/style items (notably dropdowns) — see [Menus](../development/menus) for detailed use cases.

| Subcommand | Alias | Description |
| --- | --- | --- |
| `add <name>` | `make` | Creates a menu |
| `remove <name>` | `delete` | Removes a menu (`-f, --force`) |
| `edit <name>` | `update` | Updates a menu |
| `item-add <menu>` | `item-make` | Creates a menu item |
| `item-remove <id>` | `item-delete` | Removes an item (`-f, --force`) |
| `item-edit <id>` | `item-update` | Updates an item |
| `item-group-add/-remove/-edit <name>` | `item-group-make/-delete/-update` | Menu item groups |
| `item-type-add/-remove/-edit <name>` | `item-type-make/-delete/-update` | Menu item types |
| `location-add/-remove/-edit <name>` | `location-make/-delete/-update` | Menu locations |

**`menu add/edit` options**: `--title`/`--description` (repeatable), `--data <json>`, `--location <name>` (`none` to unassign on `edit`).
**`item-add`/`item-edit` options**: `--title`/`--description` (repeatable), `--path`, `--url`, `--controller`, `--parent <id>` (`none` on `edit`), `--position`, `--target-type` (`external-link`/`page-link`/`content-link`), `--is-active`/`--is-visible` (bool), `--color`, `--icon`, `--image`, `--page <name>` (`none` on `edit`), `--section-key`, `--menu-item-group`, `--menu-item-type`, `--content-type` (`news-tag`/`news-category`/`news-article`/`content-model`), `--content-id`.
**Group/type/location `add` options**: `--description` (repeatable). **`edit`**: `--new-name`, `--description`.

```bash
creopse menu location-add header --description "en:Site header"
creopse menu add main --title "en:Main Menu" --location header
creopse menu item-add main --title "en:Home" --page home --target-type page-link --position 1
creopse menu item-add main --title "en:About" --path "/about" --parent 1 --menu-item-type dropdown
```

---

### `creopse media` (alias `med`)

Manages media files and their database records. A **file** lives on disk, a **record** (`MediaFile`) is the database entry — both can be removed independently.

| Subcommand | Alias | Description |
| --- | --- | --- |
| `upload <path>` | `add` | Uploads a local file |
| `replace <id> <path>` | | Replaces the underlying file of a record |
| `remove-file <path>` | | Removes a file from disk (`-f, --force`) |
| `remove-record <id>` | | Removes a `MediaFile` record (`--permanent`, `-f, --force`) |
| `restore <id>` | | Restores a soft-deleted record |
| `purge` | | Permanently deletes all soft-deleted records (`-f, --force`) |

**`upload` options**: `--folder <name>` (default `uploads`), `--filename <name>`, `--metadata <json>`, `--sender <id>`.
**`replace` options**: `--folder`, `--filename`, `--metadata`.
`remove-record --permanent` forces permanent deletion (otherwise a soft delete, restorable via `restore`).

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

Manages the platform's base information (name, contact details, social networks...) consumed via `getAppInformationValue()` — see [Utilities](../development/utilities).

| Subcommand | Description |
| --- | --- |
| `update <pairs...>` | Updates base information entries with `key=value` pairs (a value can be `@path/file`) |

```bash
creopse base-info update name="My App" email=hello@app.com phone="+33123456789"
creopse base-info update description=@description.txt
creopse base-info update facebook="https://facebook.com/myapp" twitter="https://twitter.com/myapp"
```

## Examples

```bash
# Install the package
creopse install

# Add multiple sections at once
creopse section add HeroBanner ContactForm Footer

# Remove a section and its DB record
creopse section remove HeroBanner

# Add and remove a widget
creopse widget add NewsletterForm
creopse widget remove NewsletterForm

# Create a page and attach a section to it
creopse page add contact --title "en:Contact" --title "fr:Contact" --position 3
creopse page attach-section contact ContactForm --data @.creopse/sections/ContactForm/fake-data.json

# Create a content model, an item, and its permalink
creopse content-model add service editorial-content internal --title "en:Service" --has-permalink true
creopse content-model item-add service --title "en:Energy Audit" --data '{"index":{"name":"{\"en\":\"Energy Audit\",\"fr\":\"Audit énergétique\"}"}}'
creopse permalink add /services content-model --content-id service --page service-details

# Create a menu and an item pointing to a page
creopse menu add main --title "en:Main Menu" --location header
creopse menu item-add main --title "en:Home" --page home --target-type page-link --position 1
```
