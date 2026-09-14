---
layout: doc
---

# Authentification

Creopse s'appuie sur [Laravel Sanctum](https://laravel.com/docs/sanctum) pour l'authentification, avec deux mécanismes selon le type de client :

- **Session/cookie** pour l'interface d'administration (SPA Inertia) — c'est le mode par défaut pour toute requête « navigateur ».
- **Token Bearer** pour les clients externes (application mobile, intégration tierce) consommant l'[API publique](./api-endpoints).

Toutes les routes d'authentification vivent sous `/auth/*` ; les autres routes protégées de l'API utilisent le middleware `auth:sanctum`, qui accepte indifféremment l'un ou l'autre mécanisme.

## Choisir le mode

Le mode est déterminé automatiquement à la connexion/l'inscription, selon la présence de l'en-tête `X-Client-Type: mobile` (ou des paramètres `device_name`/`device_id`) sur la requête :

- **Absent** → mode session : `POST /auth/login` régénère la session côté serveur, le cookie fait foi pour les requêtes suivantes.
- **Présent** → mode token : un token Sanctum est émis (ability `mobile`) et renvoyé dans la réponse sous `token`, à envoyer ensuite via `Authorization: Bearer <token>`. Une reconnexion avec le même `device_id` révoque l'ancien token.

::: tip
Pour que le cookie de session fonctionne en cross-origin (SPA sur un domaine, API sur un autre), le domaine doit figurer dans `SANCTUM_STATEFUL_DOMAINS` (`config/sanctum.php`) — par défaut `localhost`/`127.0.0.1` uniquement. Voir aussi [CORS](./api-endpoints#cors).
:::

## Endpoints

| Méthode | Route | Description | Accès |
| --- | --- | --- | --- |
| `POST` | `/auth/login` | Connexion par email/identifiant + mot de passe. | Public |
| `POST` | `/auth/register` | Inscription. Le tout premier utilisateur créé reçoit automatiquement le rôle `super-admin`. | Public |
| `POST` | `/auth/google` | Connexion via un ID token Google. | Public |
| `POST` | `/auth/apple` | Connexion via un `identity_token` Apple. | Public |
| `POST` | `/auth/phone` | Envoi d'un code de vérification par SMS. | Public |
| `POST` | `/auth/phone/verify` | Validation du code envoyé, connexion. | Public |
| `POST` | `/auth/send-password-link` | Envoi d'un lien de réinitialisation de mot de passe. | Public |
| `POST` | `/auth/reset-password` | Réinitialisation via le lien reçu. | Public |
| `POST` | `/auth/edit-password` | Changement de mot de passe (utilisateur connecté). | Authentifié |
| `POST` | `/auth/edit-email` | Changement d'email — réinitialise la vérification. | Authentifié |
| `POST` | `/auth/edit-username` | Changement d'identifiant. | Authentifié |
| `GET` | `/auth/send-verification-email` | Renvoi de l'email de vérification. | Authentifié |
| `GET` | `/auth/verify-email/{id}/{hash}` | Validation du lien de vérification (URL signée). | Authentifié |
| `GET` | `/auth/logout/{guard?}` | Déconnexion (révoque le token en mode mobile, invalide la session sinon). | Authentifié |
| `GET` | `/auth/disable-account` | Désactive le compte courant (`account_status`), sans le supprimer. | Authentifié |
| `GET` | `/auth/tokens/{name}` | Liste les tokens actifs de l'utilisateur par nom. | Authentifié |
| `POST` | `/auth/tokens/revoke/{id}` | Révoque un token précis. | Authentifié |
| `POST` | `/auth/profile` | Rattache un profil administrateur à un utilisateur. | Authentifié — son propre compte, ou permission `create-user` |
| `PUT` | `/auth/profile/{id}` | Met à jour un profil administrateur. | Authentifié — son propre profil, ou permission `edit-user` |

Le paramètre `guard` accepté par `/auth/login` et `/auth/register` ne peut valoir que `web` ou `admin`, les deux guards définis dans `config/auth.php`.

`account_status` est toujours calculé côté serveur et ne peut pas être envoyé par le client : le tout premier compte est activé, tous les suivants sont créés désactivés jusqu'à ce qu'un administrateur les active. C'est valable pour toutes les voies d'inscription (email, Google, Apple, téléphone).

## Connexion via un fournisseur tiers

| Fournisseur | Mécanisme |
| --- | --- |
| Google | Vérifie l'ID token via le SDK `Google\Client` (`GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`/`GOOGLE_REDIRECT` dans `config/services.php`). |
| Apple | Vérifie le JWT `identity_token` reçu contre les clés publiques Apple (JWKS), et contrôle que son audience correspond à `APPLE_CLIENT_ID` (`config/services.php`). |
| Téléphone | Code de vérification envoyé via Twilio Verify (`TWILIO_SID`/`TWILIO_TOKEN`/`TWILIO_SERVICE`) ou un fournisseur SMS alternatif configuré. Avec un fournisseur alternatif, le code expire au bout de 10 minutes. |

Dans les trois cas, un utilisateur est créé automatiquement s'il n'existe pas encore (`auth_type` renseigné en conséquence), puis connecté selon le mode déterminé plus haut.

::: danger
`APPLE_CLIENT_ID` doit être défini pour que la connexion Apple fonctionne : sans lui, tous les tokens sont rejetés.
:::

::: warning
`laravel/socialite` figure parmi les dépendances du package, mais n'est **pas** utilisé par ces intégrations — l'authentification Google/Apple/téléphone est implémentée directement, sans passer par Socialite.
:::

## Sessions et appareils actifs

| Méthode | Route | Description |
| --- | --- | --- |
| `GET` | `/sessions` | Liste unifiée des sessions actives : sessions web et tokens Sanctum (mobile), avec l'appareil courant marqué. |
| `DELETE` | `/sessions/{type}/{id}` | Révoque une session ou un token précis (impossible pour la session courante). |
| `DELETE` | `/sessions/revoke-all` | Révoque toutes les autres sessions/tokens de l'utilisateur. |

Toutes ces routes nécessitent `auth:sanctum`.

## Rôles et permissions

La gestion des accès s'appuie sur [`spatie/laravel-permission`](https://spatie.be/docs/laravel-permission). Deux guards d'authentification existent (`web`, `admin`). Les rôles et permissions par défaut sont tous créés sous le guard `admin`. Voir [Gestion d'accès](../admin-panel/user-role-management) pour l'équivalent depuis l'interface d'administration.

Trois rôles sont fournis par défaut :

| Rôle | Permissions par défaut |
| --- | --- |
| `super-admin` | Toutes les permissions. Attribué automatiquement au tout premier compte. |
| `admin` | Tableau de bord, compte, notifications, plugins, paramètres de l'application, utilisateurs, actualités, médias, contenu, éditeur visuel. |
| `user` | `view-dashboard`, `view-about`, `view-account`, `edit-account`, `view-notifications`. Attribué à chaque compte créé après le premier. |

`php artisan permissions:sync` recrée les permissions par défaut manquantes (`--check` se contente de signaler les écarts). La commande ne modifie pas les attributions des rôles.

Toutes les routes `/roles` et `/permissions` nécessitent `auth:sanctum`, lectures comprises. Certaines actions de gestion des utilisateurs exigent en plus une permission nommée :

| Action | Permission |
| --- | --- |
| Lister, rechercher les utilisateurs, lister les administrateurs | `view-users` |
| Créer, importer des utilisateurs (`POST /users`, `POST /users/import`) | `create-user` |
| Modifier un utilisateur (`PUT /users/{user}`) | `edit-user` |
| Supprimer un utilisateur (`DELETE /users/{user}`) | `delete-user` |

Un plugin peut déclarer ses propres permissions avec `registerPermissions()` (voir [Bases d'un plugin](../plugins-development/basics)). Elles sont créées sous le même guard `admin` : une route de plugin se protège donc avec le même middleware `permission:xxx` qu'une route du cœur.

## Configuration

| Fichier | Contenu |
| --- | --- |
| `config/auth.php` | Guards (`web`, `admin`), providers, modèle utilisateur. |
| `config/sanctum.php` | Domaines stateful (`SANCTUM_STATEFUL_DOMAINS`), guards vérifiés (`web`, `admin`), expiration des tokens. |
| `config/permission.php` | Configuration de `spatie/laravel-permission` (tables, cache). |
