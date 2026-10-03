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
| `POST` | `/auth/register` | Registration, if open (see [Registration](#registration)). The very first user created automatically receives the `super-admin` role. | Public |
| `POST` | `/auth/google` | Login through a Google ID token. | Public |
| `POST` | `/auth/apple` | Login through an Apple `identity_token`. | Public |
| `POST` | `/auth/phone` | Sends a verification code by SMS. | Public |
| `POST` | `/auth/phone/verify` | Validates the code sent, logs in. | Public |
| `POST` | `/auth/send-password-link` | Sends a password reset link. Always answers the same way, whether or not the address has an account. | Public |
| `POST` | `/auth/reset-password` | Resets the password using the received link, and signs the user out everywhere. | Public |
| `POST` | `/auth/edit-password` | Changes the password (`currentPassword` required), and signs out the user's other sessions and tokens. | Authenticated |
| `POST` | `/auth/edit-email` | Changes the email (`currentPassword` required) — resets verification, sends a reset link to the new address and a notice to the previous one. | Authenticated |
| `POST` | `/auth/edit-username` | Changes the username. | Authenticated |
| `GET` | `/auth/send-verification-email` | Resends the verification email. | Authenticated |
| `GET` | `/auth/verify-email/{id}/{hash}` | Validates the verification link: the `expires` and `signature` of the received link are required. | Authenticated |
| `GET` | `/auth/logout/{guard?}` | Logs out (revokes the token in mobile mode, invalidates the session otherwise). `guard`: `web` or `admin`. | Authenticated |
| `GET` | `/auth/disable-account` | Disables the current account (`account_status`) without deleting it, and revokes its tokens and sessions. | Authenticated |
| `GET` | `/auth/tokens/{name}` | Lists the user's active tokens by name. | Authenticated |
| `POST` | `/auth/tokens/revoke/{id}` | Revokes a specific token. | Authenticated |
| `POST` | `/auth/profile` | Attaches an admin profile to a user. | Authenticated — own account, or `create-user` permission |
| `PUT` | `/auth/profile/{id}` | Updates an admin profile. | Authenticated — own profile, or `edit-user` permission |

The `guard` parameter accepted by `/auth/login` and `/auth/register` can only be `web` or `admin`, the two guards defined in `config/auth.php`.

`account_status` is always computed server-side and cannot be sent by the client: the very first account is enabled, every later one is created disabled until an administrator enables it. This applies to every registration path (email, Google, Apple, phone).

## Registration

Creating an account is only possible if registration is open. Two settings, both **off** by default, control it from **App Settings** in the admin panel:

| Setting | Applies to |
| --- | --- |
| `allowAdminRegistration` | Registration from the admin panel (requests sent with `guard: admin`). |
| `allowSiteRegistration` | Registration from a site built on a template, or any other client: every other request, including Google, Apple, and phone sign-up. |

When registration is closed, the request is refused with `403` and the `auth/registration_disabled` error code, before any account is created or any SMS is sent. Existing accounts can still sign in with every method. The very first account can always be created, since it becomes the platform's `super-admin`.

Both settings are part of `/app-settings/public`, so a template can hide its sign-up form when registration is closed.

## Disabled and pending accounts

A disabled account — including a freshly registered one awaiting approval — is refused on every authenticated route (core and plugins) with `403` and the `auth/user_disabled` error code. Only the onboarding steps remain reachable: creating the profile (`POST /auth/profile`), sending and validating the verification email, and logging out.

Login checks the status before opening a session. Disabling an account, by an administrator or by its owner, revokes its tokens and, with the `database` session driver, its web sessions.

## Logging in through a third-party provider

These methods are meant for sites built on a template; the admin panel only uses email/username login.

| Provider | Mechanism | Enabled when |
| --- | --- | --- |
| Google | Verifies the ID token through the `Google\Client` SDK, audience included. | `GOOGLE_CLIENT_ID` is set (`config/services.php`). |
| Apple | Verifies the received `identity_token` JWT against Apple's public keys (JWKS), and checks that its audience matches `APPLE_CLIENT_ID`. | `APPLE_CLIENT_ID` is set (`config/services.php`). |
| Phone | Verification code sent by SMS, through Twilio Verify (`TWILIO_SID`/`TWILIO_TOKEN`/`TWILIO_SERVICE`). | Twilio is configured. |

A method that isn't configured answers `403` with the `auth/method_disabled` error code.

Google and Apple match an existing account by email only when the provider reports the address as verified. If no account matches, one is created if [registration](#registration) is open (`auth_type` set accordingly), then logged in following the mode determined above.

For the phone:

- The **server** picks the SMS provider: `CREOPSE_PHONE_AUTH_PROVIDER`, or else the first configured one. Twilio is currently the only provider; another one can be added by implementing the `PhoneVerifier` contract and listing it in `PhoneVerifierResolver`. The client can't choose it.
- The provider generates, expires, and checks the codes: a Twilio Verify code works once and expires after 10 minutes.
- After **5 wrong codes** for the same number, the code is discarded (`auth/code_expired`) and a new one must be requested. A wrong code returns `422` with `auth/code_verification_failed`.
- `/auth/phone` always answers `200`, whether the number has an account or not, so it doesn't tell which numbers are registered. A code is only sent to a known number, or to an unknown one when `allow_registration: true` is sent and [registration](#registration) is open (otherwise nothing arrives).
- For a sign-up, `firstname`, `lastname` and `preferences` are sent with `/auth/phone`. The account is only created by `/auth/phone/verify`, once the code is checked, and only if registration is still open. Like any other sign-up, it then waits for an administrator's approval (`403`, `auth/user_disabled`), except the very first account.
- A number with no account and no pending sign-up fails at `/auth/phone/verify` like a wrong code.

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

Admin routes are protected by named permissions, matching the admin panel screens that use them:

| Action | Permission |
| --- | --- |
| List, search users, list administrators | `view-users` |
| Create, import users (`POST /users`, `POST /users/import`) | `create-user` |
| Edit a user (`PUT /users/{user}`) | `edit-user` |
| Delete a user (`DELETE /users/{user}`) | `delete-user` |
| Read roles | `view-roles` or `manage-roles`, or one of `view-users`/`create-user`/`edit-user` (the Users screen lists roles) |
| Create, edit, delete roles | `manage-roles` |
| Read permissions | `view-permissions` or `manage-permissions` |
| Create, edit, delete permissions | `manage-permissions` |

`PUT /users/self/{user}` only lets a user change their own profile fields (`avatar`, `firstname`, `lastname`, `phone`, `address`, `location`, `preferences`): roles, status, and password are ignored there. The [API reference](./api-endpoints) lists the permission each route requires.

A plugin can declare its own permissions with `registerPermissions()` (see [Plugin basics](../plugins-development/basics)). They are created under the same `admin` guard, so a plugin route is protected with the same `permission:xxx` middleware as a core route.

## Passwords

Every password a user sets — registration, reset, change, account creation by an administrator or by the installer — must be at least 8 characters long and contain a letter and a digit (`PasswordPolicy::complexity()`).

## Error codes

The authentication-specific `errorCode` values:

| Code | Meaning |
| --- | --- |
| `auth/invalid_credentials` | Wrong identifier or password — same answer for both. |
| `auth/user_disabled` | Disabled or pending account. |
| `auth/registration_disabled` | Registration is closed for this client. |
| `auth/method_disabled` | Google, Apple, or phone sign-in isn't configured. |
| `auth/wrong_password` | Wrong current password (password or email change). |
| `auth/invalid_token` | Invalid provider token, or invalid email verification link. |
| `auth/code_verification_failed` | Wrong phone code. |
| `auth/code_expired` | Phone code discarded after too many attempts — request a new one. |

## Configuration

| File | Content |
| --- | --- |
| `config/auth.php` | Guards (`web`, `admin`), providers, user model. |
| `config/sanctum.php` | Stateful domains (`SANCTUM_STATEFUL_DOMAINS`), guards checked (`web`, `admin`), token expiration. |
| `config/permission.php` | `spatie/laravel-permission` configuration (tables, cache). |
| `config/services.php` | Google, Apple, and Twilio credentials. |
| `config/creopse.php` | `phone_auth_provider` (`CREOPSE_PHONE_AUTH_PROVIDER`). |
