---
layout: doc
---

# Utilities

Alongside [sections and widgets](./sections-widgets) and [content models](./content-models), Creopse exposes two levels of API that a component can consume: **composables** (Vue) / **hooks** (React) that give access to platform data (`@creopse/vue`/`@creopse/react`), and **pure utility functions** shared by both stacks (`@creopse/utils`).

::: tip Vue vs React
Composables/hooks share the same name and signature across both stacks — only the syntax differs. On Vue, `const { tr } = useHelper()` returns values directly usable in the template (no `.value` to manage for functions, only for the few `Ref`s documented below). On React, everything is usable as-is, with no unwrapping needed. Anything coming from `@creopse/utils` (`formatDate`, `hexToRgba`...) is strictly identical on both stacks.
:::

## Available composables / hooks

| Composable / Hook | Role |
| --- | --- |
| `useHelper()` | Cross-cutting functions: translation, file/link resolution, responsive breakpoints, active language. |
| `useContent()` | Page, section, content model, and base information data. |
| `useMenu()` | Reading menus and their items, link resolution. |
| `useNews()` | Articles, categories, tags, and comments (news). |
| `useVideo()` | Video categories and items. |
| `useNewsletter()` | Newsletter subscription by email or phone. |
| `useApi()` | Generic HTTP requests to the API. |
| `useProps()` | Reactive props of the current page (Inertia). |
| `useConfig()` | Plugin configuration (base URL, locale...). |

## `useHelper()`

| Member | Signature | Description |
| --- | --- | --- |
| `tr` | `(data, lang?) => string` | Translates an `i18n-text` field. |
| `rHtml` | `(data, lang?) => string` | Translates and resolves an `i18n-editor` field (always through `v-html`/`dangerouslySetInnerHTML`). |
| `fileUrl` | `(path) => string` | Absolute URL of a file (`storage/<path>`). |
| `getImage` | `(path, size?) => Promise<string>` | URL of the requested thumbnail (`small`/`medium`/`large`/`original`), falling back to the original if missing. |
| `getVideoThumbnail` | `(path) => string` | URL of a video's thumbnail. |
| `resolveUrl` | `(path) => string` | Resolves a relative path to the API's base URL. |
| `openLink` | `(entity) => void` | Opens a link (menu id, raw URL, or Inertia route) — see [Links and CTA buttons](./sections-widgets#links-and-cta-buttons). |
| `languages` | `Language[]` | Available languages (`fr`, `en`). |
| `updateLang` | `(val, reload?, updateUserPrefs?) => Promise<void>` | Changes the active language. |
| `socialNetworks` | `{ name; icon }[]` | List of supported social networks (Header/Footer loop). |
| `detectSocialNetwork` | `(url) => { name; icon } \| null` | Detects the social network of a URL. |
| `isXlScreen` / `isLgScreen` / `isMdScreen` / `isSmScreen` / `is2XlScreen` | `Ref<boolean>` (Vue) | Common responsive breakpoints. |
| `currentRoutePath` | `Ref<string>` (Vue) | Current Inertia page path. |
| `displayFormErrors` | `(errors, displayError) => void` | Displays form errors through a callback. |

::: warning
`getActiveLanguage()` (used for a language selector's current value) is **not** provided by `useHelper()` — on Vue it's a function auto-imported from `laravel-vue-i18n`.
:::

## `useContent()`

| Member | Signature | Description |
| --- | --- | --- |
| `getSectionRootData` | `(key?) => any` | A section's singleton fields (equivalent to `getSectionData(key)?.index`). |
| `getSectionData` | `(key?) => any` | A section's full data (singletons + collections). |
| `getSectionSettings` | `(key?) => any` | A section's display settings. |
| `getSectionSettingsGroup` / `getSectionSetting` | `(key?, group, name?) => any` | A specific settings group or setting. |
| `getAnySectionData` | `(sectionSlug, pageSlug, linkId?) => Promise<any>` | A section's data from any page. |
| `getContentModel` | `(name) => ContentModelModel \| undefined` | Content model by name. |
| `getContentModelItems` | `(name, activeOnly?) => Promise<ContentModelItemModel[]>` | Content model items — see [Content Models](./content-models). |
| `getPaginatedContentModelItems` | `(name, page, pageSize, activeOnly?, query?, dataFilters?, sortBy?, sortDirection?) => Promise<PaginatedContentModelItems>` | Paginated items, with filters. |
| `submitUserContentModelItem` | `(title, contentModelId, singletonsData?, collectionsData?, onSuccess?, onError?) => Promise<Response>` | Submits a user item (forms). |
| `getContentPath` | `(item, force?) => string` | Permalink path of an item or article. |
| `getAppInformationValue` | `(key, type?) => any` | A base information value (see the table below). |
| `pageData` | `PageModel \| null` | Current page data. |
| `contentModelItem` | `ContentModelItemModel \| null` | Current content model item (detail page). |
| `newsArticle` / `newsCategory` / `newsTag` | — | Current news article/category/tag. |
| `appPrimaryColor` / `appSecondaryColor` / `appAccentColor` | `string` | Configured brand colors. |
| `logo` / `icon` | `string` | Configured logo / icon URL. |

### `getAppInformationValue` keys

Never recreate a section field for one of these values — consume them directly through `getAppInformationValue('<key>')`:

```
name, icon, oneColorIcon, logo, oneColorLogo, phone, email, address, postalCode,
description, primaryColor, secondaryColor, accentColor, facebook, twitter, instagram,
whatsapp, linkedin, youtube, pinterest, snapchat, tiktok, telegram, discord, reddit,
tumblr, vimeo, twitch, github, dribbble, behance, medium, stackOverflow, threads,
messenger, playstore, appstore, additionalInfo
```

These values are managed through [`creopse base-info`](../resources/cli#creopse-base-info-alias-info).

## `useMenu()`

| Member | Signature | Description |
| --- | --- | --- |
| `getMenu` | `(name, activeOnly?, nested?) => MenuModel \| undefined` | Menu by name. |
| `getMenuByLocation` | `(name, activeOnly?, nested?) => MenuModel \| undefined` | Menu by location. |
| `getMenuItems` | `(name, visibleOnly?, nested?) => MenuItemModel[]` | Items of a menu by name. |
| `getMenuItemsByLocation` | `(name, visibleOnly?, nested?) => MenuItemModel[]` | Items by location — the most used for a Header/Footer. |
| `getMenuItemById` | `(id) => MenuItemModel \| undefined` | Item by id. |
| `getMenuGroups` / `getMenuItemsByGroup` / `getMenuGroupedItems` / `getMenuUngroupedItems` | — | Grouping items (dropdowns). |
| `getMenuHref` | `(item) => string` | Resolved `href` of a menu item. |
| `openMenu` | `(item?) => void` | Navigates to a menu item based on its `targetType`. |
| `getLinkFromMenuItemId` | `(id) => string` | Link resolved from a `menu-item-link` field. |

See the full rendering pattern in [Links and CTA buttons](./sections-widgets#links-and-cta-buttons).

## `useNews()`

| Member | Signature | Description |
| --- | --- | --- |
| `isLoading` | `Ref<boolean>` | Loading state. |
| `loadArticles` | `(params: { pageSize, page?, query?, status?, categories?, tags?, months? }) => Promise<{ articles; meta }>` | Paginated articles. |
| `loadCategories` / `loadTags` | `(filterByIsVisible?) => Promise<[]>` | Visible categories/tags. |
| `loadArticlesMonths` | `() => Promise<string[]>` | Months with articles (archives). |
| `loadArticlesCount` / `loadArticlesCountByStatus` / `loadArticlesCountByAuthor` | — | Article counters. |
| `loadComments` | `(params: { pageSize, page?, query? }) => Promise<{ comments; meta }>` | Paginated comments. |
| `addComment` | `(comment, onSuccess?, onError?) => Promise<Response>` | Adds a comment. |

Always go through this composable for a list of articles — never a section collection, see [Sections & Widgets](./sections-widgets).

## `useVideo()`

| Member | Signature | Description |
| --- | --- | --- |
| `isLoading` | `Ref<boolean>` | Loading state. |
| `loadCategories` | `(filterByIsVisible?) => Promise<VideoCategoryModel[]>` | Video categories. |
| `loadVideoItems` | `(params) => Promise<PaginatedVideoItems>` | Paginated videos. |

## `useNewsletter()`

| Member | Signature | Description |
| --- | --- | --- |
| `isLoading` | `Ref<boolean>` | Loading state. |
| `subscribeEmail` | `(email, onSuccess?, onError?) => Promise<void>` | Subscribes an email. |
| `subscribePhone` | `(phone, onSuccess?, onError?) => Promise<void>` | Subscribes a phone number (spaces stripped). |

Typical usage pattern in a Footer: see [Sections & Widgets](./sections-widgets).

## `useApi()`, `useProps()`, `useConfig()`

- **`useApi()`** — low-level methods (`request`, `getItemRequest`, `postItemRequest`, `putItemRequest`, `deleteItemRequest`, `getAllItemsRequest`, `handleError`) for HTTP calls outside the scope of the domain composables above.
- **`useProps()`** — returns the page's reactive props (Inertia data). Used to access `contentModelItem`/`article` on a detail page, see [Content Models](./content-models#consuming-a-content-model).
- **`useConfig()`** — returns the plugin configuration (`apiBaseUrl`, `apiUrl`, `locale`, `fallbackLocale`, `debug`...).

## Utility components

| Need | Vue | React |
| --- | --- | --- |
| Image with thumbnail selection | `<Image :src="..." size="large" />` | `<Image src={...} size="large" />` |
| Image resolved by a promise | `<AsyncImg :load="..." />` | `<AsyncImg load={...} />` |
| Portal/modal (no JSX equivalent to `<Teleport>`) | `<Teleport to="body">` (native Vue) | `<MountedTeleport to="body">` |
| Transition/animation | `<Transition name="...">` (native Vue) | `<CustomTransition name="fade\|slide-fade\|bounce">` |
| SVG icon of an `icon` field (data stored in the database) | `<ContentIcon :data="..." :size="42" />` | `<ContentIcon data={...} size={42} />` (`@arkn/react-icon-picker`) |
| Static icon (MDI, Bootstrap Icons...) | `<Icon icon="mdi:..." />` | `<Icon icon="mdi:..." />` (`@iconify/react`) |
| Sticky bar | `<StickyTop>` / `<StickyBottom>` | `<StickyTop>` / `<StickyBottom>` |
| Text truncation with "read more" | `<ReadMore :text="..." />` | `<ReadMore text={...} />` |

::: warning
On React, every component used in JSX must be **explicitly imported** at the top of the file (`Image` from `@creopse/react`, `Icon` from `@iconify/react`...) — unlike the Vue examples where some Creopse components are registered globally by the plugin.
:::

## Pure utility functions (`@creopse/utils`)

Shared by both stacks, importable from `@creopse/utils` or `@creopse/utils/helpers`.

### Dates

| Function | Description |
| --- | --- |
| `formatDate(date, { outPattern?, locale? })` | Formats a date — **the helper to use for any date display in a section**, rather than a local `toLocaleDateString`. |
| `reformatDate(date, { inPattern?, outPattern?, locale? })` | Converts a date from one format to another. |
| `differenceFromNow(date, { locale?, pattern? })` | Relative difference ("3 days ago"). |
| `differenceWithToday(date, { pattern?, unit? })` | Difference between a date and today. |
| `differenceBetweenDates(start, end, options?)` | Difference between two dates. |
| `getDateFromTimestamp(date, options?)` | Formats a UNIX timestamp (seconds) into a date. |
| `getCurrentTimestamp()` | Current UNIX timestamp. |

### Colors

| Function | Description |
| --- | --- |
| `hexToRgba(hex, alpha)` | Converts a hex color into `rgba(...)` — returns the complete string directly, not separate components. |
| `genRandomColor()` | Generates a random hex color. |

### Strings

| Function | Description |
| --- | --- |
| `capitalizeFirstLetter(string)` | Capitalizes the first letter. |
| `getNameInitials(name)` | Initials (2 letters) of a full name. |
| `extractNumber(string, options?)` | Extracts one or more numbers from a string. |
| `isTitleLike(value, options?)` / `extractTitleLike(data, tr, defaultValue?)` | Heuristic "title-like" field detection. |
| `replaceStringParts(str, replacements)` | Replaces several parts of a string based on a dictionary. |

### Numbers and arrays

| Function | Description |
| --- | --- |
| `getRandomInteger(min, max)` | Inclusive random integer. |
| `abbreviateNumber(number)` | Abbreviates a number (`1.2k`, `3.4M`...). |
| `removeDuplicates(arr, property)` | Deduplicates an array by a property. |
| `shuffleArray(array)` | Shuffles an array (Fisher-Yates). |

### Files, images, and URLs

| Function | Description |
| --- | --- |
| `humanFileSize(bytes, si?, dp?)` | Human-readable file size. |
| `getFileExtension(path)` | Extension of a file path. |
| `compressImage(file, options?)` | Compresses an image client-side. |
| `isExternal(path)` | True if the path is an external URL, a `mailto:`, or a `tel:`. |
| `isURL(str)` | Validates that a string is a URL. |
| `removeTrailingSlash` / `removeLeadingSlash` | Path cleanup. |

### Misc

| Function | Description |
| --- | --- |
| `sleep(ms)` | Waits the given number of milliseconds. |
| `formatTimeFromSeconds(duration, options?)` | Formats a duration as `HH:MM:SS`. |
| `slideToId(id)` | Smooth-scrolls to an element. |
| `getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)` | Distance between two coordinates (Haversine). |

::: tip
This list covers the functions most useful when building sections. `@creopse/utils` also exposes enums, domain models, and shared types (`ContentModelItemModel`, `MenuItemModel`, `AppInformationKey`...) consumed internally by the composables above.
:::
