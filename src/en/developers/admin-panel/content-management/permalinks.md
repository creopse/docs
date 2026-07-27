---
layout: doc
---

# Permalinks

This section wires the public URL prefix of each content type to the page that renders it — without it, a detail page (article, service...) is never reachable, even once already coded. It corresponds to the [`creopse permalink`](../../resources/cli#creopse-permalink-alias-perm) CLI group.

![Content Permalinks](/images/screenshots/en/light/content-permalinks.png#light-only)
![Content Permalinks](/images/screenshots/en/dark/content-permalinks.png#dark-only)

## Form structure

Permalinks are grouped by content type, each group collapsible:

- **News** — one block per native type (Articles, Categories, Tags).
- **Content Models** — one block per [content model](./content-models) created on the site.

Each block offers three fields:

| Field | Role |
| --- | --- |
| **Path Prefix** | The public URL segment, e.g. `/news/article`. |
| **Content Param** | The field used to resolve the URL — `id` or `slug` depending on the content type. |
| **Content Page** | The page that renders this content (must already exist). |

A single **Save** button at the top of the page applies all changes at once.

::: tip For developers
`slug` is the idiomatic choice for news articles/categories/tags (native field); for a custom content model, `id` stays the default unless a dedicated field actually exists in its structure. See [Permalinks](../../development/permalinks) for the full details, and [`creopse permalink`](../../resources/cli#creopse-permalink-alias-perm) to script this configuration through the CLI.
:::
