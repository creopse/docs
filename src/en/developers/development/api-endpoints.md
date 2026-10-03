---
layout: doc
---

# API & Endpoints

Creopse exposes a complete REST API under `/api` — it's what the admin interface itself consumes, but also any external client (mobile app, third-party integration) that wants to serve the content somewhere other than through the built-in frontend.

## Conventions

### Response format

Every response follows the same JSON envelope:

```json
{
  "data": { "...": "..." },
  "message": "Optional",
  "errorCode": "Optional"
}
```

`data` holds the result (object, array, or paginated object depending on the endpoint); `message`/`errorCode` only appear when relevant (errors in particular).

### Key casing

JSON keys exchanged with the client are **camelCase**, automatically converted to snake_case server-side and back — always send and receive camelCase, regardless of the internal convention (database, PHP code).

### Authentication

See [Authentication](./authentication) for the full picture. In short: `auth:sanctum` protects most write routes and some read routes, accepting either a session (admin interface) or a Bearer token (external clients) indifferently. Most of these routes also require a named permission, listed in the **Access** column; a disabled account is refused on all of them. Each group below states what's public.

### Rate limiting

Every route under `/api` is subject to a limit (`CREOPSE_RATE_LIMIT`, default `600`/minute), applied per IP or per authenticated user depending on `rate_limit_by` — see [Configuration](./configuration#rate-limiting).

### CORS

Allowed origins match the domains listed in `SANCTUM_STATEFUL_DOMAINS` (see [Authentication](./authentication)) — `https://` only in production, `http://`/`https://` in development. Cookies (`supports_credentials`) are supported for admin interface requests.

## Content (pages, sections, menus, content models, permalinks)

The core of the API — consumed both by the admin interface (writes) and by frontend templates (reads).

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/pages` | Public |
| `GET` | `/pages/{page}` | Public |
| `POST` `PUT` `DELETE` | `/pages`, `/pages/{page}` | `manage-content` |
| `PUT` | `/pages/position` | `manage-content` |
| `GET` | `/sections` | Public |
| `GET` | `/sections/{section}` | Public |
| `GET` | `/section-data/{sectionSlug}/source/{pageSlug}/link/{linkId}` | Public |
| `POST` `PUT` `DELETE` | `/sections`, `/sections/{section}` | `manage-content` |
| `PUT` | `/sections/{section}/data-source-page`, `/sections/{section}/duplicate`, `/sections/{section}/copy-data` | `manage-content` |
| `GET` | `/sections/{slug}/link/{linkId}/page/{pageId}` | `manage-content` |
| `GET` | `/menus`, `/menus/{menu}` | Public |
| `POST` `PUT` `DELETE` | `/menus`, `/menus/{menu}` | `manage-content` |
| `GET` | `/menu/items`, `/menu/items/{menuItem}` | Public |
| `POST` `PUT` `DELETE` | `/menu/items`, `/menu/items/{menuItem}` | `manage-content` |
| `PUT` | `/menu/items/position` | `manage-content` |
| `GET` | `/menu-settings`, `/menu-locations`, `/menu-item-groups`, `/menu-item-types` (+ `/{id}`) | Public |
| `POST` `PUT` `DELETE` | same resources | `manage-content` |
| `GET` | `/content-models`, `/content-models/{content_model}` | Public |
| `POST` `PUT` `DELETE` | `/content-models`, `/content-models/{content_model}` | `manage-content` |
| `GET` | `/content-model/items`, `/content-model/items/{contentModelItem}` | Public |
| `POST` `PUT` `DELETE` | `/content-model/items`, `/content-model/items/{contentModelItem}` | `manage-content` |
| `POST` `PUT` `DELETE` | `/content-model/user-items` (+ `/{id}`) | Public — visitor submission (forms) |
| `PUT` | `/content-model-items/position` | `manage-content` |
| `POST` | `/content-model-items/list` | `manage-content` |
| `GET` | `/content-model-items/search/{query?}/{contentModelId?}` | `manage-content` |
| `PUT` | `/content-model-items/related/{contentModelItem}` | `manage-content` |
| `GET` | `/permalinks`, `/permalinks/{permalink}` | Public |
| `POST` `PUT` `DELETE` | `/permalinks`, `/permalinks/{permalink}` | `manage-content` |

## News

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/news-articles`, `/news-articles/{newsArticle}` | Public |
| `GET` | `/news-articles/headlines/{limit?}`, `/news-articles/random/{limit?}`, `/news-articles/categories`, `/news-articles/search/{query?}`, `/news-articles/list/months` | Public |
| `POST` | `/news-articles/list` | Public |
| `POST` `PUT` `DELETE` | `/news-articles`, `/news-articles/{newsArticle}` (+ `force`/`restore`) | `manage-news` |
| `GET` | `/news-categories`, `/news-categories/{newsCategory}`, `/news-categories/articles` (+ `/{id}`) | Public |
| `POST` `PUT` `DELETE` | `/news-categories`, `/news-categories/{newsCategory}` (+ `position`, `force`, `restore`) | `manage-news` |
| `GET` `POST` | `/news-comments`, `/news-comments/{newsComment}` | Public — including creation (`POST`) |
| `PUT` `DELETE` | `/news-comments/{newsComment}` (+ `force`/`restore`) | `manage-news` |
| `GET` | `/news-tags`, `/news-tags/{newsTag}`, `/news-tags/articles` (+ `/{id}`) | Public |
| `POST` `PUT` `DELETE` | `/news-tags`, `/news-tags/{newsTag}` (+ `force`/`restore`) | `manage-news` |

## Videos

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/video-items`, `/video-items/{videoItem}` | Public |
| `GET` | `/video-categories`, `/video-categories/{videoCategory}`, `/video-categories/items` (+ `/{id}`) | Public |
| `POST` `PUT` `DELETE` | `/video-items`, `/video-items/{videoItem}` (+ `force`/`restore`) | `manage-content` |
| `PUT` | `/video-items/youtube/channel-videos` | `manage-content` |
| `POST` `PUT` `DELETE` | `/video-categories`, `/video-categories/{videoCategory}` (+ `position`, `force`, `restore`) | `manage-content` |
| `GET` `PUT` | `/video-settings` | `manage-content` |

## Ads

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/ads`, `/ads/{ad}` | Public |
| `GET` | `/ad-identifiers`, `/ad-identifiers/{ad_identifier}` | Public |
| `POST` `PUT` `DELETE` | `/ads`, `/ads/{ad}` | `manage-content` |
| `POST` `PUT` `DELETE` | `/ad-identifiers`, `/ad-identifiers/{ad_identifier}` | `manage-content` |

## Newsletter

| Method | Route | Access |
| --- | --- | --- |
| `POST` | `/newsletter/emails`, `/newsletter/phones` | Public — self-subscribe |
| `GET` `PUT` `DELETE` | `/newsletter/emails`, `/newsletter/phones` (+ `/{id}`) | `manage-content` |
| `GET` `POST` `PUT` `DELETE` | `/newsletter/campaigns` (+ `/{campaign}`) | `manage-content` |

## Users, roles, and permissions

See [Authentication](./authentication#roles-and-permissions) for guards and named permissions.

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/roles`, `/roles/{role}` | `view-roles`, `manage-roles`, `view-users`, `create-user`, or `edit-user` |
| `POST` `PUT` `DELETE` | `/roles`, `/roles/{role}` | `manage-roles` |
| `GET` | `/permissions`, `/permissions/{permission}` | `view-permissions` or `manage-permissions` |
| `POST` `PUT` `DELETE` | `/permissions`, `/permissions/{permission}` | `manage-permissions` |
| `GET` | `/roles/user/{user?}`, `/permissions/user/{user?}` | Authenticated — own account, or `view-users` |
| `GET` | `/users/{user}` | Authenticated — own account, or `view-users` permission |
| `GET` `POST` | `/users`, `/users/list`, `/users/search/{query?}`, `/users/type/administrators` | `view-users` |
| `POST` | `/users`, `/users/import` | `create-user` |
| `PUT` | `/users/{user}` | `edit-user` |
| `DELETE` | `/users/{user}` | `delete-user` |
| `PUT` | `/users/self/{user}` | Authenticated — own account; profile fields only |
| `GET` | `/user/permissions/{user?}`, `/user/sessions/{user?}`, `/user/devices/{user?}`, `/user/place/{user?}`, `/user/roles/{user?}` | Authenticated — own account, or `view-users` |
| `GET` | `/user/email/{email}`, `/user/phone/{phone}`, `/user/username/{username}` | Authenticated — own account, or `view-users` |
| `GET` | `/user-sessions`, `/user-devices`, `/user-place` | `view-users` |
| `GET` `POST` `PUT` `DELETE` | `/user-sessions`, `/user-devices`, `/user-place` (`/{id}`) | Authenticated — own records, or `view-users` |

## Media library

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/media-files`, `/media-files/{mediaFile}`, `/media-files/search/{query?}`, `/media-files/list/months` | `view-media`, `upload-media`, `delete-media`, or a content/news editing permission |
| `POST` | `/media-files/list`, `/media-files/paths/list` | same as above |
| `POST` | `/media-files/upload`, `/media-files/replace/{mediaFile}` | `upload-media` |
| `POST` | `/media-files/delete` | `delete-media` |
| `DELETE` | `/media-files/{mediaFile}` (+ `force`, `force/all`) | `delete-media` |
| `PUT` | `/media-files/restore/{mediaFile}` | `delete-media` |

No media library route is public, unlike the other content resources. Content and news editors can read the library because their editors embed the media picker.

Uploads (`/media-files/upload`, `/media-files/replace`, `/file/upload`, `/file/replace`) refuse files a web server could execute or a browser render as a page — PHP, CGI scripts, `.htaccess`, HTML — checked on both the file name and the content. Every other type, SVG included, is accepted, up to `CREOPSE_UPLOAD_MAX_SIZE_KB`.

## Notifications

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/notifications`, `/notifications/unread`, `/notifications/read` | Authenticated |
| `PUT` | `/notifications/mark/{notification}`, `/notifications/mark-all` | Authenticated — own notifications only |
| `DELETE` | `/notifications/{notification}` | Authenticated — own notifications only |

## Statistics

Power the admin panel's [Overview](../admin-panel/content-management/getting-started).

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/visits`, `/visitors` | `view-dashboard` |
| `GET` | `/count/users`, `/count/administrators`, `/count/others` | `view-dashboard` |
| `GET` | `/count/news-articles` (+ `/status/{status}`, `/author/{id}`), `/count/news-categories`, `/count/news-comments`, `/count/news-tags` | `view-dashboard`, or a news permission |
| `GET` | `/count/media-files` (+ `/type/{type}`, `/trashed`) | `view-dashboard`, or a media permission |

## Plugins

See [Plugin Development](../plugins-development/basics#listing-installing-and-managing-plugins) for the full lifecycle.

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/plugins`, `/plugins/{id}` | `manage-plugins` |
| `POST` | `/plugins/install` | `manage-plugins` |
| `PUT` | `/plugins/{id}/update`, `/plugins/{id}/enable`, `/plugins/{id}/disable` | `manage-plugins` |
| `DELETE` | `/plugins/{id}/uninstall` | `manage-plugins` |

## Miscellaneous

| Method | Route | Description | Access |
| --- | --- | --- | --- |
| `POST` | `/email` | Sends an email through the configured mail driver. | `manage-content` |
| `POST` | `/sms` | Sends an SMS through the configured provider. | `manage-content` |
| `POST` | `/file/upload`, `/file/replace` | Upload of generic files (outside the media library). | `upload-media` |
| `POST` | `/file/delete` | Deletion of a generic file. | `delete-media` |
| `POST` | `/file/download`, `/file/check` | Reading a generic file, already public. | Authenticated |
| `GET` | `/translations/{locale}` | Interface translation strings for a given language. | Public |
| `GET` | `/app-settings/public` | Allowlisted subset of settings — enough to render branding on auth pages before a session exists. | Public |
| `GET` | `/app-information` | [Platform identity](../admin-panel/content-management/platform-identity) — no secrets, so the whole index is public. | Public |
| `GET` | `/app-settings` | Full settings. The translation API keys are only returned to content, news, and settings editors. | Authenticated |
| `PUT` | `/app-settings` | | `manage-app-settings` |
| `PUT` | `/app-information` | Edited from the admin's Content screen. | `manage-content` |

::: tip
`/app-settings/public` and the `/app-information` index deliberately bypass `auth:sanctum` — the login page and other pre-auth screens need them to render branding before a session exists. `/app-settings/public` exposes only an explicit allowlist of keys (`AppSettingController::PUBLIC_KEYS`, plus any `appearance.*` key); a new setting key added later stays behind `auth:sanctum` on the full `/app-settings` index by default. `/app-information` has no sensitive fields at all, so exposing its whole index is safe — but writes to both stay authenticated.
:::

## Installation & server

These routes mainly serve the web install wizard (see [Installation](../getting-started/installation)) rather than a typical external integration.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Server health check. |
| `POST` | `/server/configure` | Initial server configuration (URL, etc.). |
| `GET` | `/database` | Connectivity check for the configured connection — reachable regardless of installation lock state, since auth pages check it before a session can exist. |
| `GET` `POST` | `/database/test`, `/database/create`, `/database/migrate`, `/database/seed` | Connects to/creates/migrates/seeds an arbitrary database during installation — gated behind the installation lock. |
| `POST` | `/install/finalize`, `/install/create-admin` | Finalizes installation, creates the first administrator account. |
