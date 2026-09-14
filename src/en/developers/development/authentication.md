---
layout: doc
---

# Authentication

Creopse relies on [Laravel Sanctum](https://laravel.com/docs/sanctum) for authentication, with two mechanisms depending on the client type:

- **Session/cookie** for the admin interface (Inertia SPA) — the default mode for any "browser" request.
- **Bearer token** for external clients (mobile app, third-party integration) consuming the [public API](./api-endpoints).

All authentication routes live under `/auth/*`; the rest of the API's protected routes use the `auth:sanctum` middleware, which accepts either mechanism indifferently.

## Choosing the mode

The mode is determined automatically at login/registration, based on whether the `X-Client-Type: mobile` header (or `device_name`/`device_id` parameters) is present on the request:

- **Absent** → session mode: `POST /auth/login` regenerates the session server-side, the cookie is authoritative for subsequent requests.
- **Present** → token mode: a Sanctum token is issued (`mobile` ability) and returned in the response as `token`, to be sent afterward via `Authorization: Bearer <token>`. Logging in again with the same `device_id` revokes the previous token.

::: tip
For the session cookie to work cross-origin (SPA on one domain, API on another), the domain must be listed in `SANCTUM_STATEFUL_DOMAINS` (`config/sanctum.php`) — by default only `localhost`/`127.0.0.1`. See also [CORS](./api-endpoints#cors).
:::

## Endpoints

| Method | Route | Description | Access |
| --- | --- | --- | --- |
| `POST` | `/auth/login` | Login with email/username + password. | Public |
| `POST` | `/auth/register` | Registration. The very first user created automatically receives the `super-admin` role. | Public |
| `POST` | `/auth/google` | Login through a Google ID token. | Public |
| `POST` | `/auth/apple` | Login through an Apple `identity_token`. | Public |
| `POST` | `/auth/phone` | Sends a verification code by SMS. | Public |
| `POST` | `/auth/phone/verify` | Validates the code sent, logs in. | Public |
| `POST` | `/auth/send-password-link` | Sends a password reset link. | Public |
| `POST` | `/auth/reset-password` | Resets the password using the received link. | Public |
| `POST` | `/auth/edit-password` | Changes the password (logged-in user). | Authenticated |
| `POST` | `/auth/edit-email` | Changes the email — resets verification. | Authenticated |
| `POST` | `/auth/edit-username` | Changes the username. | Authenticated |
| `GET` | `/auth/send-verification-email` | Resends the verification email. | Authenticated |
| `GET` | `/auth/verify-email/{id}/{hash}` | Validates the verification link (signed URL). | Authenticated |
| `GET` | `/auth/logout/{guard?}` | Logs out (revokes the token in mobile mode, invalidates the session otherwise). | Authenticated |
| `GET` | `/auth/disable-account` | Disables the current account (`account_status`), without deleting it. | Authenticated |
| `GET` | `/auth/tokens/{name}` | Lists the user's active tokens by name. | Authenticated |
| `POST` | `/auth/tokens/revoke/{id}` | Revokes a specific token. | Authenticated |
| `POST` | `/auth/profile` | Attaches an admin profile to a user. | Authenticated — own account, or `create-user` permission |
| `PUT` | `/auth/profile/{id}` | Updates an admin profile. | Authenticated — own profile, or `edit-user` permission |

The `guard` parameter accepted by `/auth/login` and `/auth/register` can only be `web` or `admin`, the two guards defined in `config/auth.php`.

`account_status` is always computed server-side and cannot be sent by the client: the very first account is enabled, every later one is created disabled until an administrator enables it. This applies to every registration path (email, Google, Apple, phone).

## Logging in through a third-party provider

| Provider | Mechanism |
| --- | --- |
| Google | Verifies the ID token through the `Google\Client` SDK (`GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`/`GOOGLE_REDIRECT` in `config/services.php`). |
| Apple | Verifies the received `identity_token` JWT against Apple's public keys (JWKS), and checks that its audience matches `APPLE_CLIENT_ID` (`config/services.php`). |
| Phone | Verification code sent through Twilio Verify (`TWILIO_SID`/`TWILIO_TOKEN`/`TWILIO_SERVICE`) or a configured alternative SMS provider. With an alternative provider, the code expires after 10 minutes. |

In all three cases, a user is automatically created if none exists yet (`auth_type` set accordingly), then logged in following the mode determined above.

::: danger
`APPLE_CLIENT_ID` must be set for Apple login to work: without it, every token is rejected.
:::

::: warning
`laravel/socialite` is listed among the package's dependencies but is **not** used by these integrations — Google/Apple/phone authentication is implemented directly, without going through Socialite.
:::

## Sessions and active devices

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/sessions` | Unified list of active sessions: web sessions and Sanctum tokens (mobile), with the current device flagged. |
| `DELETE` | `/sessions/{type}/{id}` | Revokes a specific session or token (not possible for the current session). |
| `DELETE` | `/sessions/revoke-all` | Revokes every other session/token for the user. |

All of these routes require `auth:sanctum`.

## Roles and permissions

Access management relies on [`spatie/laravel-permission`](https://spatie.be/docs/laravel-permission). Two authentication guards exist (`web`, `admin`). Default roles and permissions are all created under the `admin` guard. See [User & Role Management](../admin-panel/user-role-management) for the admin interface equivalent.

Three default roles are provided:

| Role | Default permissions |
| --- | --- |
| `super-admin` | All permissions. Given automatically to the very first account. |
| `admin` | Dashboard, account, notifications, plugins, app settings, users, news, media, content, visual editor. |
| `user` | `view-dashboard`, `view-about`, `view-account`, `edit-account`, `view-notifications`. Given to every account created after the first one. |

`php artisan permissions:sync` recreates any missing default permission (`--check` only reports differences). It does not change role assignments.

Every `/roles` and `/permissions` route requires `auth:sanctum`, reads included. Some user management actions additionally require a named permission:

| Action | Permission |
| --- | --- |
| List, search users, list administrators | `view-users` |
| Create, import users (`POST /users`, `POST /users/import`) | `create-user` |
| Edit a user (`PUT /users/{user}`) | `edit-user` |
| Delete a user (`DELETE /users/{user}`) | `delete-user` |

A plugin can declare its own permissions with `registerPermissions()` (see [Plugin basics](../plugins-development/basics)). They are created under the same `admin` guard, so a plugin route is protected with the same `permission:xxx` middleware as a core route.

## Configuration

| File | Content |
| --- | --- |
| `config/auth.php` | Guards (`web`, `admin`), providers, user model. |
| `config/sanctum.php` | Stateful domains (`SANCTUM_STATEFUL_DOMAINS`), guards checked (`web`, `admin`), token expiration. |
| `config/permission.php` | `spatie/laravel-permission` configuration (tables, cache). |
