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
| `POST` | `/auth/register` | Inscription, si elle est ouverte (voir [Inscription](#inscription)). Le tout premier utilisateur créé reçoit automatiquement le rôle `super-admin`. | Public |
| `POST` | `/auth/google` | Connexion via un ID token Google. | Public |
| `POST` | `/auth/apple` | Connexion via un `identity_token` Apple. | Public |
| `POST` | `/auth/phone` | Envoi d'un code de vérification par SMS. | Public |
| `POST` | `/auth/phone/verify` | Validation du code envoyé, connexion. | Public |
| `POST` | `/auth/send-password-link` | Envoi d'un lien de réinitialisation de mot de passe. Répond toujours de la même façon, que l'adresse ait un compte ou non. | Public |
| `POST` | `/auth/reset-password` | Réinitialisation via le lien reçu ; déconnecte l'utilisateur partout. | Public |
| `POST` | `/auth/edit-password` | Changement de mot de passe (`currentPassword` requis) ; déconnecte les autres sessions et tokens de l'utilisateur. | Authentifié |
| `POST` | `/auth/edit-email` | Changement d'email (`currentPassword` requis) — réinitialise la vérification, envoie un lien de réinitialisation à la nouvelle adresse et un avertissement à l'ancienne. | Authentifié |
| `POST` | `/auth/edit-username` | Changement d'identifiant. | Authentifié |
| `GET` | `/auth/send-verification-email` | Renvoi de l'email de vérification. | Authentifié |
| `GET` | `/auth/verify-email/{id}/{hash}` | Validation du lien de vérification : les paramètres `expires` et `signature` du lien reçu sont requis. | Authentifié |
| `GET` | `/auth/logout/{guard?}` | Déconnexion (révoque le token en mode mobile, invalide la session sinon). `guard` : `web` ou `admin`. | Authentifié |
| `GET` | `/auth/disable-account` | Désactive le compte courant (`account_status`) sans le supprimer, et révoque ses tokens et sessions. | Authentifié |
| `GET` | `/auth/tokens/{name}` | Liste les tokens actifs de l'utilisateur par nom. | Authentifié |
| `POST` | `/auth/tokens/revoke/{id}` | Révoque un token précis. | Authentifié |
| `POST` | `/auth/profile` | Rattache un profil administrateur à un utilisateur. | Authentifié — son propre compte, ou permission `create-user` |
| `PUT` | `/auth/profile/{id}` | Met à jour un profil administrateur. | Authentifié — son propre profil, ou permission `edit-user` |

Le paramètre `guard` accepté par `/auth/login` et `/auth/register` ne peut valoir que `web` ou `admin`, les deux guards définis dans `config/auth.php`.

`account_status` est toujours calculé côté serveur et ne peut pas être envoyé par le client : le tout premier compte est activé, tous les suivants sont créés désactivés jusqu'à ce qu'un administrateur les active. C'est valable pour toutes les voies d'inscription (email, Google, Apple, téléphone).

## Inscription

La création d'un compte n'est possible que si l'inscription est ouverte. Deux paramètres, tous deux **désactivés** par défaut, la contrôlent depuis les **Paramètres de l'application** dans l'interface d'administration :

| Paramètre | S'applique à |
| --- | --- |
| `allowAdminRegistration` | L'inscription depuis l'interface d'administration (requêtes envoyées avec `guard: admin`). |
| `allowSiteRegistration` | L'inscription depuis un site construit sur un template, ou tout autre client : toutes les autres requêtes, y compris l'inscription via Google, Apple et téléphone. |

Quand l'inscription est fermée, la requête est refusée avec un `403` et le code d'erreur `auth/registration_disabled`, avant toute création de compte ou tout envoi de SMS. Les comptes existants peuvent toujours se connecter par toutes les méthodes. Le tout premier compte peut toujours être créé, puisqu'il devient le `super-admin` de la plateforme.

Les deux paramètres font partie de `/app-settings/public` : un template peut ainsi masquer son formulaire d'inscription quand elle est fermée.

## Comptes désactivés ou en attente

Un compte désactivé — y compris un compte tout juste inscrit en attente de validation — est refusé sur toutes les routes authentifiées (cœur et plugins) avec un `403` et le code d'erreur `auth/user_disabled`. Seules les étapes d'accueil restent accessibles : création du profil (`POST /auth/profile`), envoi et validation de l'email de vérification, et déconnexion.

La connexion vérifie le statut avant d'ouvrir une session. La désactivation d'un compte, par un administrateur ou par son propriétaire, révoque ses tokens et, avec le driver de session `database`, ses sessions web.

## Connexion via un fournisseur tiers

Ces méthodes sont destinées aux sites construits sur un template ; l'interface d'administration n'utilise que la connexion par email/identifiant.

| Fournisseur | Mécanisme | Activé quand |
| --- | --- | --- |
| Google | Vérifie l'ID token via le SDK `Google\Client`, audience comprise. | `GOOGLE_CLIENT_ID` est défini (`config/services.php`). |
| Apple | Vérifie le JWT `identity_token` reçu contre les clés publiques Apple (JWKS), et contrôle que son audience correspond à `APPLE_CLIENT_ID`. | `APPLE_CLIENT_ID` est défini (`config/services.php`). |
| Téléphone | Code de vérification envoyé par SMS, via Twilio Verify (`TWILIO_SID`/`TWILIO_TOKEN`/`TWILIO_SERVICE`). | Twilio est configuré. |

Une méthode non configurée répond `403` avec le code d'erreur `auth/method_disabled`.

Google et Apple ne rattachent un compte existant par son email que si le fournisseur indique l'adresse comme vérifiée. Si aucun compte ne correspond, il est créé si l'[inscription](#inscription) est ouverte (`auth_type` renseigné en conséquence), puis connecté selon le mode déterminé plus haut.

Pour le téléphone :

- C'est le **serveur** qui choisit le fournisseur SMS : `CREOPSE_PHONE_AUTH_PROVIDER`, sinon le premier configuré. Twilio est pour l'instant le seul fournisseur ; on peut en ajouter un en implémentant le contrat `PhoneVerifier` et en le déclarant dans `PhoneVerifierResolver`. Le client ne peut pas le choisir.
- Le fournisseur génère, fait expirer et vérifie les codes : un code Twilio Verify ne fonctionne qu'une fois et expire au bout de 10 minutes.
- Après **5 codes erronés** pour un même numéro, le code est invalidé (`auth/code_expired`) et il faut en demander un nouveau. Un code erroné renvoie `422` avec `auth/code_verification_failed`.
- `/auth/phone` répond toujours `200`, que le numéro ait un compte ou non, pour ne pas révéler quels numéros sont inscrits. Un code n'est envoyé qu'à un numéro connu, ou à un numéro inconnu quand `allow_registration: true` est envoyé et que l'[inscription](#inscription) est ouverte (sinon rien n'arrive).
- Pour une inscription, `firstname`, `lastname` et `preferences` sont envoyés avec `/auth/phone`. Le compte n'est créé que par `/auth/phone/verify`, une fois le code vérifié, et seulement si l'inscription est toujours ouverte. Comme toute inscription, il attend ensuite la validation d'un administrateur (`403`, `auth/user_disabled`), sauf le tout premier compte.
- Un numéro sans compte ni inscription en cours échoue sur `/auth/phone/verify` comme un code erroné.

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

Les routes d'administration sont protégées par des permissions nommées, qui correspondent aux écrans de l'interface d'administration qui les utilisent :

| Action | Permission |
| --- | --- |
| Lister, rechercher les utilisateurs, lister les administrateurs | `view-users` |
| Créer, importer des utilisateurs (`POST /users`, `POST /users/import`) | `create-user` |
| Modifier un utilisateur (`PUT /users/{user}`) | `edit-user` |
| Supprimer un utilisateur (`DELETE /users/{user}`) | `delete-user` |
| Lire les rôles | `view-roles` ou `manage-roles`, ou l'une de `view-users`/`create-user`/`edit-user` (l'écran Utilisateurs liste les rôles) |
| Créer, modifier, supprimer des rôles | `manage-roles` |
| Lire les permissions | `view-permissions` ou `manage-permissions` |
| Créer, modifier, supprimer des permissions | `manage-permissions` |

`PUT /users/self/{user}` permet seulement à un utilisateur de modifier les champs de son propre profil (`avatar`, `firstname`, `lastname`, `phone`, `address`, `location`, `preferences`) : rôles, statut et mot de passe y sont ignorés. La [référence de l'API](./api-endpoints) indique la permission exigée par chaque route.

Un plugin peut déclarer ses propres permissions avec `registerPermissions()` (voir [Bases d'un plugin](../plugins-development/basics)). Elles sont créées sous le même guard `admin` : une route de plugin se protège donc avec le même middleware `permission:xxx` qu'une route du cœur.

## Mots de passe

Tout mot de passe défini par un utilisateur — inscription, réinitialisation, changement, création de compte par un administrateur ou par l'installateur — doit compter au moins 8 caractères, dont une lettre et un chiffre (`PasswordPolicy::complexity()`).

## Codes d'erreur

Les valeurs d'`errorCode` propres à l'authentification :

| Code | Signification |
| --- | --- |
| `auth/invalid_credentials` | Identifiant ou mot de passe incorrect — même réponse dans les deux cas. |
| `auth/user_disabled` | Compte désactivé ou en attente. |
| `auth/registration_disabled` | L'inscription est fermée pour ce client. |
| `auth/method_disabled` | La connexion Google, Apple ou téléphone n'est pas configurée. |
| `auth/wrong_password` | Mot de passe actuel incorrect (changement de mot de passe ou d'email). |
| `auth/invalid_token` | Token du fournisseur invalide, ou lien de vérification d'email invalide. |
| `auth/code_verification_failed` | Code téléphone incorrect. |
| `auth/code_expired` | Code téléphone invalidé après trop d'essais — en demander un nouveau. |

## Configuration

| Fichier | Contenu |
| --- | --- |
| `config/auth.php` | Guards (`web`, `admin`), providers, modèle utilisateur. |
| `config/sanctum.php` | Domaines stateful (`SANCTUM_STATEFUL_DOMAINS`), guards vérifiés (`web`, `admin`), expiration des tokens. |
| `config/permission.php` | Configuration de `spatie/laravel-permission` (tables, cache). |
| `config/services.php` | Identifiants Google, Apple et Twilio. |
| `config/creopse.php` | `phone_auth_provider` (`CREOPSE_PHONE_AUTH_PROVIDER`). |
