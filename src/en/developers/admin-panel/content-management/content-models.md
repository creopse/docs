---
layout: doc
---

# Content Models

This section manages the site's [content models](../../development/content-models) — their structure and their items — and corresponds to the [`creopse content-model`](../../resources/cli#creopse-content-model-alias-cm) CLI group.

![Content Models](/images/screenshots/en/light/content-models.png#light-only)
![Content Models](/images/screenshots/en/dark/content-models.png#dark-only)

## Model list

A set of tabs filters models by category:

- **All**
- **Editorial content** — models managed from the admin panel (`intent: editorial-content`).
- **User entries** — models fed by site visitors, e.g. contact form messages (`intent: user-data`).
- **System data** — models natively provided by Creopse.

A **Search** field filters by name. The **Add content model** button opens the creation form for a new model (name, title per language, data structure, field used as title, permalink eligibility).

## A model row

Each model displays:

- **Data Structure** — edits the model's fields (equivalent to `--data-structure` in the CLI).
- Pencil icon — edits the model's general information (title, description...).
- Trash icon — deletes the model.
- The model's name.
- Two tags: its `intent` (e.g. "Editorial content") and its `access-scope` (e.g. "Internal (system + administration)") — see [Content Models](../../development/content-models#intent-and-access-scope) for details on these values.
- **Open** — accesses the model's item list (creating, editing, deleting items).

::: tip For developers
Creating models and items can also be scripted through the CLI — see [`creopse content-model`](../../resources/cli#creopse-content-model-alias-cm). A model with a detail page then needs to be wired through a [permalink](./permalinks).
:::

::: tip See also
An end-user–oriented version of this section exists in the [User Guide](../../../users/sections/content-management).
:::
