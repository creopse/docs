---
layout: doc
---

# FAQ

Common questions about developing Creopse templates. For anything not covered here, browse the rest of the [developer documentation](../getting-started/introduction) or [report a bug](https://github.com/creopse/creopse/issues).

## Sections & Widgets

### My CTA button doesn't lead anywhere, why?

If the field is of type `menu-item-link`, the `href` must be resolved through `getLinkFromMenuItemId(field)` and navigation handled through `openLink(field)` — never a raw `href` on the field's value. See [Links and CTA buttons](../development/sections-widgets#links-and-cta-buttons).

### My scaffolded Header/Footer shows no navigation links

A Header/Footer component only displays the items returned by `getMenuItemsByLocation('header'|'footer')` — if no location, menu, or item has been created in the database yet, the list is naturally empty. See [Menus](../development/menus).

### Why doesn't the source template's carousel/modal/accordion work anymore once integrated?

No plugin JS script (Bootstrap, lightbox...) should remain functional in a final component — these behaviors are reimplemented natively (Vue/React). The `data-bs-toggle` attribute can stay for CSS styling, but no longer drives the behavior. See [Interactive behaviors](../development/sections-widgets#interactive-behaviors).

### How do I choose between `text`, `i18n-text`, and `i18n-editor` for a field?

`text` for anything non-translatable (URL, proper name); `i18n-text` for a short translatable string (title, label); `i18n-editor` for any description, regardless of length — never `i18n-textarea`. See [Field types](../development/sections-widgets#field-types).

### Can the same section appear twice on a page with different content?

Yes, using a distinct `--link-id` on each attachment (`creopse page attach-section home Hero --link-id top`, `--link-id bottom`...). See [Attaching sections](../development/pages#attaching-sections).

## Content models & permalinks

### When should I use a content model instead of a section collection?

As soon as content follows a "list + detail" pattern (each element has its own detail page) — Services, Projects, Team... A plain section collection is enough for content that's always displayed as a block on the same page. See [When to use a content model](../development/content-models#when-to-use-a-content-model).

### I set `--has-permalink true` on my model but the detail page returns a 404

That flag only marks the model as eligible — it wires no route. The permalink needs to be created separately with `creopse permalink add`. See [Permalinks](../development/permalinks).

### How do I choose between resolving a permalink by `id` or by `slug`?

`id` by default for a custom content model, unless a dedicated field (e.g. `slug`) actually exists in its structure. For news articles/categories/tags (native structure), `slug` is the idiomatic choice. See [Permalinks](../development/permalinks#choosing-content-param).

## Pages

### How do I keep a Footer (or Header) strictly identical across all pages?

With `creopse page set-section-source`, which points one section instance to another's data source — rather than manually duplicating the same data on every page. See [Sharing data across pages](../development/pages#sharing-data-across-pages).

### What's the difference between disabling a section and detaching it?

`toggle-section-status` disables an instance without removing it (useful for a section that's ready but not yet meant to be published); `detach-section` removes it permanently — reserve this for attachment mistakes. See [Pages](../development/pages#enabling-disabling-or-detaching-an-instance).

## Vue vs React

### How do I choose between Vue and React, and can I switch later?

The choice is made at install time (`creopse install -t vue|react`) and shapes the rest of development (conventions, components). There's no automatic switch once the project is up and running — see [Template structure](../development/template-structure).

### Is documentation coverage the same for Vue and React?

Both stacks share the same API (`@creopse/utils`, the same composables/hooks named identically), but Vue patterns are backed by more real-world examples than React's at this stage — see [Sections & Widgets](../development/sections-widgets).

## Miscellaneous

### Where are all the available CLI commands documented?

In the [CLI reference](./cli), which covers `section`, `widget`, `page`, `content-model`, `permalink`, `menu`, `media`, and `base-info`.

### How do I update Creopse to a newer version?

See [Updating Creopse](../development/updating-creopse).
