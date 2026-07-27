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

See [Authentication](./authentication) for the full picture. In short: `auth:sanctum` protects most write routes and some read routes, accepting either a session (admin interface) or a Bearer token (external clients) indifferently. Each group below states what's public.

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
| `POST` `PUT` `DELETE` | `/pages`, `/pages/{page}` | Authenticated |
| `PUT` | `/pages/position` | Authenticated |
| `GET` | `/sections` | Public |
| `GET` | `/sections/{section}` | Public |
| `GET` | `/section-data/{sectionSlug}/source/{pageSlug}/link/{linkId}` | Public |
| `POST` `PUT` `DELETE` | `/sections`, `/sections/{section}` | Authenticated |
| `PUT` | `/sections/{section}/data-source-page`, `/sections/{section}/duplicate`, `/sections/{section}/copy-data` | Authenticated |
| `GET` | `/sections/{slug}/link/{linkId}/page/{pageId}` | Authenticated |
| `GET` | `/menus`, `/menus/{menu}` | Public |
| `POST` `PUT` `DELETE` | `/menus`, `/menus/{menu}` | Authenticated |
| `GET` | `/menu/items`, `/menu/items/{menuItem}` | Public |
| `POST` `PUT` `DELETE` | `/menu/items`, `/menu/items/{menuItem}` | Authenticated |
| `PUT` | `/menu/items/position` | Authenticated |
| `GET` | `/menu-settings`, `/menu-locations`, `/menu-item-groups`, `/menu-item-types` (+ `/{id}`) | Public |
| `POST` `PUT` `DELETE` | same resources | Authenticated |
| `GET` | `/content-models`, `/content-models/{content_model}` | Public |
| `POST` `PUT` `DELETE` | `/content-models`, `/content-models/{content_model}` | Authenticated |
| `GET` | `/content-model/items`, `/content-model/items/{contentModelItem}` | Public |
| `POST` `PUT` `DELETE` | `/content-model/items`, `/content-model/items/{contentModelItem}` | Authenticated |
| `POST` `PUT` `DELETE` | `/content-model/user-items` (+ `/{id}`) | Public — visitor submission (forms) |
| `POST` | `/content-model-items/list` | Authenticated |
| `GET` | `/content-model-items/search/{query?}/{contentModelId?}` | Authenticated |
| `PUT` | `/content-model-items/related/{contentModelItem}` | Authenticated |
| `GET` | `/permalinks`, `/permalinks/{permalink}` | Public |
| `POST` `PUT` `DELETE` | `/permalinks`, `/permalinks/{permalink}` | Authenticated |

## News

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/news-articles`, `/news-articles/{newsArticle}` | Public |
| `GET` | `/news-articles/headlines/{limit?}`, `/news-articles/random/{limit?}`, `/news-articles/categories`, `/news-articles/search/{query?}`, `/news-articles/list/months` | Public |
| `POST` | `/news-articles/list` | Public |
| `POST` `PUT` `DELETE` | `/news-articles`, `/news-articles/{newsArticle}` (+ `force`/`restore`) | Authenticated |
| `GET` | `/news-categories`, `/news-categories/{newsCategory}`, `/news-categories/articles` (+ `/{id}`) | Public |
| `POST` `PUT` `DELETE` | `/news-categories`, `/news-categories/{newsCategory}` (+ `position`, `force`, `restore`) | Authenticated |
| `GET` `POST` | `/news-comments`, `/news-comments/{newsComment}` | Public — including creation (`POST`) |
| `PUT` `DELETE` | `/news-comments/{newsComment}` (+ `force`/`restore`) | Authenticated |
| `GET` | `/news-tags`, `/news-tags/{newsTag}`, `/news-tags/articles` (+ `/{id}`) | Public |
| `POST` `PUT` `DELETE` | `/news-tags`, `/news-tags/{newsTag}` (+ `force`/`restore`) | Authenticated |

## Videos

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/video-items`, `/video-items/{videoItem}` | Public |
| `GET` | `/video-categories`, `/video-categories/{videoCategory}`, `/video-categories/items` (+ `/{id}`) | Public |
| `POST` `PUT` `DELETE` | `/video-items`, `/video-items/{videoItem}` (+ `force`/`restore`) | Authenticated |
| `PUT` | `/video-items/youtube/channel-videos` | Authenticated |
| `POST` `PUT` `DELETE` | `/video-categories`, `/video-categories/{videoCategory}` (+ `position`, `force`, `restore`) | Authenticated |
| `GET` `PUT` | `/video-settings` | Authenticated |

## Ads

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/ads`, `/ads/{ad}` | Public |
| `GET` | `/ad-identifiers`, `/ad-identifiers/{ad_identifier}` | Public |
| `POST` `PUT` `DELETE` | `/ads`, `/ads/{ad}` | Authenticated |
| `POST` `PUT` `DELETE` | `/ad-identifiers`, `/ad-identifiers/{ad_identifier}` | Authenticated |

## Newsletter

| Method | Route | Access |
| --- | --- | --- |
| `POST` | `/newsletter/emails`, `/newsletter/phones` | Public — self-subscribe |
| `GET` `PUT` `DELETE` | `/newsletter/emails`, `/newsletter/phones` (+ `/{id}`) | Authenticated |
| `GET` `POST` `PUT` `DELETE` | `/newsletter/campaigns` (+ `/{campaign}`) | Authenticated |

## Users, roles, and permissions

See [Authentication](./authentication#roles-and-permissions) for guards and named permissions.

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/roles`, `/permissions` | Public |
| `POST` `PUT` `DELETE` | `/roles`, `/permissions` (+ `/{id}`) | Authenticated |
| `GET` | `/roles/user/{user?}`, `/permissions/user/{user?}` | Authenticated |
| `GET` | `/users`, `/users/{user}`, `/users/search/{query?}`, `/users/type/administrators` | Authenticated |
| `POST` | `/users`, `/users/import` | Authenticated + `action-add-user` permission |
| `PUT` | `/users/{user}` | Authenticated + `action-edit-user` permission |
| `DELETE` | `/users/{user}` | Authenticated + `action-delete-user` permission |
| `PUT` | `/users/self/{user}` | Authenticated |
| `GET` | `/user/permissions/{user?}`, `/user/sessions/{user?}`, `/user/devices/{user?}`, `/user/place/{user?}`, `/user/roles/{user?}` | Authenticated |
| `GET` | `/user/email/{email}`, `/user/phone/{phone}`, `/user/username/{username}` | Authenticated |
| `GET` `POST` `PUT` `DELETE` | `/user-sessions`, `/user-devices`, `/user-place` (+ `/{id}`) | Authenticated |

## Media library

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/media-files`, `/media-files/{mediaFile}`, `/media-files/search/{query?}`, `/media-files/list/months` | Authenticated |
| `POST` | `/media-files/list`, `/media-files/paths/list`, `/media-files/upload` | Authenticated |
| `POST` | `/media-files/replace/{mediaFile}`, `/media-files/delete` | Authenticated |
| `DELETE` | `/media-files/{mediaFile}` (+ `force`, `force/all`) | Authenticated |
| `PUT` | `/media-files/restore/{mediaFile}` | Authenticated |

No media library route is public, unlike the other content resources.

## Notifications

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/notifications`, `/notifications/unread`, `/notifications/read` | Authenticated |
| `PUT` | `/notifications/mark/{notification}`, `/notifications/mark-all` | Authenticated |
| `DELETE` | `/notifications/{notification}` | Authenticated |

## Statistics

All authenticated — power the admin panel's [Overview](../admin-panel/content-management/getting-started).

| Method | Route |
| --- | --- |
| `GET` | `/visits`, `/visitors` |
| `GET` | `/count/users`, `/count/administrators`, `/count/others` |
| `GET` | `/count/news-articles` (+ `/status/{status}`, `/author/{id}`), `/count/news-categories`, `/count/news-comments`, `/count/news-tags` |
| `GET` | `/count/media-files` (+ `/type/{type}`, `/trashed`) |

## Plugins

See [Plugin Development](../plugins-development/basics#listing-installing-and-managing-plugins) for the full lifecycle.

| Method | Route | Access |
| --- | --- | --- |
| `GET` | `/plugins`, `/plugins/{id}` | Public |
| `POST` | `/plugins/install` | Authenticated |
| `PUT` | `/plugins/{id}/update`, `/plugins/{id}/enable`, `/plugins/{id}/disable` | Authenticated |
| `DELETE` | `/plugins/{id}/uninstall` | Authenticated |

## Miscellaneous

| Method | Route | Description | Access |
| --- | --- | --- | --- |
| `POST` | `/email` | Sends an email through the configured mail driver. | Authenticated |
| `POST` | `/sms` | Sends an SMS through the configured provider. | Authenticated |
| `POST` | `/file/upload`, `/file/replace`, `/file/delete`, `/file/download`, `/file/check` | Upload/management of generic files (outside the media library). | Authenticated |
| `GET` | `/translations/{locale}` | Interface translation strings for a given language. | Public |
| `GET` `PUT` | `/app-settings`, `/app-information` | Global settings and [platform identity](../admin-panel/content-management/platform-identity). | Public |

::: tip
`app-settings`/`app-information` aren't protected by `auth:sanctum` at the route level — keep this in mind if either is extended.
:::

## Installation & server

These routes mainly serve the web install wizard (see [Installation](../getting-started/installation)) rather than a typical external integration.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Server health check. |
| `POST` | `/server/configure` | Initial server configuration (URL, etc.). |
| `GET` `POST` | `/database` (+ `/test`, `/create`, `/migrate`, `/seed`) | Connection, creation, and migration of the database during installation. |
| `POST` | `/install/finalize`, `/install/create-admin` | Finalizes installation, creates the first administrator account. |
