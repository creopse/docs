---
layout: doc
---

# Menus

A menu is assigned to a **location** (`header`, `footer`...); **items** are the navigation entries; **groups** and **types** categorize/style items — notably for dropdowns. Without this step, a scaffolded Header or Footer has nothing to display in development.

See the [CLI reference](../resources/cli#creopse-menu-alias-men) for the complete syntax, and [Menu Management](../admin-panel/content-management/menus) for the admin panel equivalent.

## Locations, menus, and items

A **location** is a rendering slot (header, footer, sidebar...). A **menu** is assigned to a location and groups **items** — each item can have sub-items (`--parent <id>`), forming dropdowns.

```bash
creopse menu location-add header --description "en:Site header"
creopse menu add main --title "en:Main Menu" --location header
creopse menu item-add main --title "en:Home" --page home --target-type page-link --position 1
creopse menu item-add main --title "en:About" --path "/about" --parent 1 --menu-item-type dropdown
```

## An item's target (`--target-type`)

| `target-type` | Usage | Associated options |
| --- | --- | --- |
| `external-link` | A raw URL (internal or external) | `--url` or `--path` |
| `page-link` | To a [page](./pages) created in Creopse | `--page <name>` |
| `content-link` | To a [content model](./content-models) item or a native news content type | `--content-type`, `--content-id` |

## Consuming a menu in a component

Always go through `useMenu()` — never a hardcoded `href` or a manually built list:

```ts
const { getMenuItemsByLocation, getMenuHref, openMenu } = useMenu()

const items = getMenuItemsByLocation('header', true)
```

```vue
<a :href="getMenuHref(item)" @click.prevent="openMenu(item)">{{ tr(item.title) }}</a>
```

This pattern is the same for the main menu, a submenu (`item.subMenuItems`), or a location-based list (Header, Footer). See [Sections & Widgets](./sections-widgets#links-and-cta-buttons) for rendering details, and [Utilities](./utilities#usemenu) for the complete signature of `useMenu()`.

## Resolving a `menu-item-link` field

A `menu-item-link` field (used for a section CTA button, for example) accepts either the id of an existing menu item, or a raw URL. It resolves through `getLinkFromMenuItemId` (`useMenu()`) and `openLink` (`useHelper()`) rather than using the value directly:

```vue
<a :href="getLinkFromMenuItemId(field)" @click.prevent="openLink(field)">{{ tr(label) }}</a>
```

See [Field types](./sections-widgets#field-types) for the rule of choosing between `menu-item-link` and `text` based on how the field is used.
