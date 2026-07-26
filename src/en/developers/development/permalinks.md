---
layout: doc
---

# Permalinks

A permalink associates a public URL prefix with content — an item of a [content model](./content-models), or a native content type (a news article, category, or tag) — and, optionally, with the [page](./pages) that renders it. It's a standalone entity, distinct from the content model itself.

::: warning
`creopse content-model add --has-permalink true` only marks a model as **eligible** for a permalink — it wires no route. Without an actual permalink created, `getContentPath(item)` never reaches a detail page, even once it's perfectly coded and attached.
:::

See the [CLI reference](../resources/cli#creopse-permalink-alias-perm) for the complete syntax.

## Targeted content types

| `content-type` | Target |
| --- | --- |
| `content-model` | An item of a content model created through `creopse content-model add`. |
| `news-article` | A native news article. |
| `news-category` | A native news category. |
| `news-tag` | A native news tag. |

A `news-*` permalink is only useful if the template actually has a listing or detail page dedicated to that content type — don't create one by default.

## Choosing `--content-param`

Determines which field of the target item is used to resolve the URL:

| `content-type` | Possible values | How to choose |
| --- | --- | --- |
| `content-model` | `id` (default), or any field defined in the model's structure | `id` by default; use a dedicated field (e.g. `slug`) only if it actually exists in the model's structure. |
| `news-article` / `news-category` / `news-tag` | `id` or `slug` | `slug` is the idiomatic choice for a readable URL — natively available on these models. |

## Creating a permalink

```bash
# A content model, resolved by id (default)
creopse permalink add /services content-model --content-id service --page service-details

# News articles, resolved by slug
creopse permalink add /news news-article --content-param slug --page news-details
```

- `<path-prefix>`: public URL prefix (e.g. `/services/my-item`).
- `--content-id`: required only for `content-type=content-model` — the model's name or id.
- `--page`: name of the previously created detail page that renders this content.

## Editing or removing a permalink

```bash
creopse permalink edit --path-prefix /services --new-path-prefix /our-services
creopse permalink remove --content-model service --force
```

`edit`/`remove` identify the target with exactly one of `--id`, `--path-prefix`, or `--content-model`. The targeted content (`content-type`/`content-id`) cannot be changed once set — remove and recreate the permalink rather than trying to reassign it.

## Resolving on the component side

```ts
const { getContentPath } = useContent()

const href = getContentPath(item) // item: ContentModelItemModel | NewsArticleModel | ...
```

See [Utilities](./utilities#usecontent) for the complete signature of `getContentPath` and the other members of `useContent()`.

::: tip
This wiring can also be done from the admin panel — see [Permalinks](../admin-panel/content-management/permalinks).
:::
