---
layout: doc
---

# API & Endpoints

Creopse expose une API REST complète sous `/api` — c'est elle que consomme l'interface d'administration, mais aussi n'importe quel client externe (application mobile, intégration tierce) qui voudrait diffuser le contenu ailleurs que via le frontend intégré.

## Conventions

### Format de réponse

Toutes les réponses suivent la même enveloppe JSON :

```json
{
  "data": { "...": "..." },
  "message": "Optionnel",
  "errorCode": "Optionnel"
}
```

`data` contient le résultat (objet, tableau, ou objet paginé selon l'endpoint) ; `message`/`errorCode` n'apparaissent qu'en cas de besoin (erreurs notamment).

### Casse des clés

Les clés JSON échangées avec le client sont en **camelCase**, converties automatiquement en snake_case côté serveur et inversement — envoyer et recevoir en camelCase, quelle que soit la convention utilisée en interne (base de données, code PHP).

### Authentification

Voir [Authentification](./authentication) pour le détail. En résumé : `auth:sanctum` protège la plupart des routes d'écriture et certaines routes de lecture, en acceptant indifféremment une session (interface d'administration) ou un token Bearer (clients externes). La plupart de ces routes exigent aussi une permission nommée, indiquée dans la colonne **Accès** ; un compte désactivé est refusé sur toutes. Chaque groupe ci-dessous précise ce qui est public.

### Limitation de requêtes

Toutes les routes sous `/api` sont soumises à une limite (`CREOPSE_RATE_LIMIT`, défaut `600`/minute), appliquée par IP ou par utilisateur authentifié selon `rate_limit_by` — voir [Configuration](./configuration#seuil-de-requetes).

### CORS

Les origines autorisées correspondent aux domaines listés dans `SANCTUM_STATEFUL_DOMAINS` (voir [Authentification](./authentication)) — `https://` uniquement en production, `http://`/`https://` en développement. Les cookies (`supports_credentials`) sont supportés pour les requêtes de l'interface d'administration.

## Contenu (pages, sections, menus, modèles de contenu, permaliens)

Le cœur de l'API — consommé aussi bien par l'interface d'administration (écriture) que par les templates frontend (lecture).

| Méthode | Route | Accès |
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
| `POST` `PUT` `DELETE` | mêmes ressources | `manage-content` |
| `GET` | `/content-models`, `/content-models/{content_model}` | Public |
| `POST` `PUT` `DELETE` | `/content-models`, `/content-models/{content_model}` | `manage-content` |
| `GET` | `/content-model/items`, `/content-model/items/{contentModelItem}` | Public |
| `POST` `PUT` `DELETE` | `/content-model/items`, `/content-model/items/{contentModelItem}` | `manage-content` |
| `POST` `PUT` `DELETE` | `/content-model/user-items` (+ `/{id}`) | Public — soumission par un visiteur (formulaires) |
| `PUT` | `/content-model-items/position` | `manage-content` |
| `POST` | `/content-model-items/list` | `manage-content` |
| `GET` | `/content-model-items/search/{query?}/{contentModelId?}` | `manage-content` |
| `PUT` | `/content-model-items/related/{contentModelItem}` | `manage-content` |
| `GET` | `/permalinks`, `/permalinks/{permalink}` | Public |
| `POST` `PUT` `DELETE` | `/permalinks`, `/permalinks/{permalink}` | `manage-content` |

## News

| Méthode | Route | Accès |
| --- | --- | --- |
| `GET` | `/news-articles`, `/news-articles/{newsArticle}` | Public |
| `GET` | `/news-articles/headlines/{limit?}`, `/news-articles/random/{limit?}`, `/news-articles/categories`, `/news-articles/search/{query?}`, `/news-articles/list/months` | Public |
| `POST` | `/news-articles/list` | Public |
| `POST` `PUT` `DELETE` | `/news-articles`, `/news-articles/{newsArticle}` (+ `force`/`restore`) | `manage-news` |
| `GET` | `/news-categories`, `/news-categories/{newsCategory}`, `/news-categories/articles` (+ `/{id}`) | Public |
| `POST` `PUT` `DELETE` | `/news-categories`, `/news-categories/{newsCategory}` (+ `position`, `force`, `restore`) | `manage-news` |
| `GET` `POST` | `/news-comments`, `/news-comments/{newsComment}` | Public — y compris la création (`POST`) |
| `PUT` `DELETE` | `/news-comments/{newsComment}` (+ `force`/`restore`) | `manage-news` |
| `GET` | `/news-tags`, `/news-tags/{newsTag}`, `/news-tags/articles` (+ `/{id}`) | Public |
| `POST` `PUT` `DELETE` | `/news-tags`, `/news-tags/{newsTag}` (+ `force`/`restore`) | `manage-news` |

## Vidéos

| Méthode | Route | Accès |
| --- | --- | --- |
| `GET` | `/video-items`, `/video-items/{videoItem}` | Public |
| `GET` | `/video-categories`, `/video-categories/{videoCategory}`, `/video-categories/items` (+ `/{id}`) | Public |
| `POST` `PUT` `DELETE` | `/video-items`, `/video-items/{videoItem}` (+ `force`/`restore`) | `manage-content` |
| `PUT` | `/video-items/youtube/channel-videos` | `manage-content` |
| `POST` `PUT` `DELETE` | `/video-categories`, `/video-categories/{videoCategory}` (+ `position`, `force`, `restore`) | `manage-content` |
| `GET` `PUT` | `/video-settings` | `manage-content` |

## Publicités

| Méthode | Route | Accès |
| --- | --- | --- |
| `GET` | `/ads`, `/ads/{ad}` | Public |
| `GET` | `/ad-identifiers`, `/ad-identifiers/{ad_identifier}` | Public |
| `POST` `PUT` `DELETE` | `/ads`, `/ads/{ad}` | `manage-content` |
| `POST` `PUT` `DELETE` | `/ad-identifiers`, `/ad-identifiers/{ad_identifier}` | `manage-content` |

## Newsletter

| Méthode | Route | Accès |
| --- | --- | --- |
| `POST` | `/newsletter/emails`, `/newsletter/phones` | Public — auto-inscription |
| `GET` `PUT` `DELETE` | `/newsletter/emails`, `/newsletter/phones` (+ `/{id}`) | `manage-content` |
| `GET` `POST` `PUT` `DELETE` | `/newsletter/campaigns` (+ `/{campaign}`) | `manage-content` |

## Utilisateurs, rôles et permissions

Voir [Authentification](./authentication#roles-et-permissions) pour le détail des guards et permissions nommées.

| Méthode | Route | Accès |
| --- | --- | --- |
| `GET` | `/roles`, `/roles/{role}` | `view-roles`, `manage-roles`, `view-users`, `create-user` ou `edit-user` |
| `POST` `PUT` `DELETE` | `/roles`, `/roles/{role}` | `manage-roles` |
| `GET` | `/permissions`, `/permissions/{permission}` | `view-permissions` ou `manage-permissions` |
| `POST` `PUT` `DELETE` | `/permissions`, `/permissions/{permission}` | `manage-permissions` |
| `GET` | `/roles/user/{user?}`, `/permissions/user/{user?}` | Authentifié — son propre compte, ou `view-users` |
| `GET` | `/users/{user}` | Authentifié — son propre compte, ou permission `view-users` |
| `GET` `POST` | `/users`, `/users/list`, `/users/search/{query?}`, `/users/type/administrators` | `view-users` |
| `POST` | `/users`, `/users/import` | `create-user` |
| `PUT` | `/users/{user}` | `edit-user` |
| `DELETE` | `/users/{user}` | `delete-user` |
| `PUT` | `/users/self/{user}` | Authentifié — son propre compte ; champs de profil uniquement |
| `GET` | `/user/permissions/{user?}`, `/user/sessions/{user?}`, `/user/devices/{user?}`, `/user/place/{user?}`, `/user/roles/{user?}` | Authentifié — son propre compte, ou `view-users` |
| `GET` | `/user/email/{email}`, `/user/phone/{phone}`, `/user/username/{username}` | Authentifié — son propre compte, ou `view-users` |
| `GET` | `/user-sessions`, `/user-devices`, `/user-place` | `view-users` |
| `GET` `POST` `PUT` `DELETE` | `/user-sessions`, `/user-devices`, `/user-place` (`/{id}`) | Authentifié — ses propres données, ou `view-users` |

## Médiathèque

| Méthode | Route | Accès |
| --- | --- | --- |
| `GET` | `/media-files`, `/media-files/{mediaFile}`, `/media-files/search/{query?}`, `/media-files/list/months` | `view-media`, `upload-media`, `delete-media`, ou une permission d'édition de contenu ou d'actualités |
| `POST` | `/media-files/list`, `/media-files/paths/list` | idem |
| `POST` | `/media-files/upload`, `/media-files/replace/{mediaFile}` | `upload-media` |
| `POST` | `/media-files/delete` | `delete-media` |
| `DELETE` | `/media-files/{mediaFile}` (+ `force`, `force/all`) | `delete-media` |
| `PUT` | `/media-files/restore/{mediaFile}` | `delete-media` |

Aucune route de la médiathèque n'est publique, contrairement aux autres ressources de contenu. Les éditeurs de contenu et d'actualités peuvent la consulter, car leurs éditeurs intègrent le sélecteur de médias.

Les uploads (`/media-files/upload`, `/media-files/replace`, `/file/upload`, `/file/replace`) refusent les fichiers qu'un serveur web pourrait exécuter ou qu'un navigateur afficherait comme une page — PHP, scripts CGI, `.htaccess`, HTML —, contrôlés à la fois sur le nom et sur le contenu. Tous les autres types, SVG compris, sont acceptés, dans la limite de `CREOPSE_UPLOAD_MAX_SIZE_KB`.

## Notifications

| Méthode | Route | Accès |
| --- | --- | --- |
| `GET` | `/notifications`, `/notifications/unread`, `/notifications/read` | Authentifié |
| `PUT` | `/notifications/mark/{notification}`, `/notifications/mark-all` | Authentifié — ses propres notifications uniquement |
| `DELETE` | `/notifications/{notification}` | Authentifié — ses propres notifications uniquement |

## Statistiques

Alimentent la [Vue d'ensemble](../admin-panel/content-management/getting-started) de l'administration.

| Méthode | Route | Accès |
| --- | --- | --- |
| `GET` | `/visits`, `/visitors` | `view-dashboard` |
| `GET` | `/count/users`, `/count/administrators`, `/count/others` | `view-dashboard` |
| `GET` | `/count/news-articles` (+ `/status/{status}`, `/author/{id}`), `/count/news-categories`, `/count/news-comments`, `/count/news-tags` | `view-dashboard`, ou une permission d'actualités |
| `GET` | `/count/media-files` (+ `/type/{type}`, `/trashed`) | `view-dashboard`, ou une permission de médias |

## Plugins

Voir [Développement de plugins](../plugins-development/basics#lister-installer-et-gerer-les-plugins) pour le détail du cycle de vie.

| Méthode | Route | Accès |
| --- | --- | --- |
| `GET` | `/plugins`, `/plugins/{id}` | `manage-plugins` |
| `POST` | `/plugins/install` | `manage-plugins` |
| `PUT` | `/plugins/{id}/update`, `/plugins/{id}/enable`, `/plugins/{id}/disable` | `manage-plugins` |
| `DELETE` | `/plugins/{id}/uninstall` | `manage-plugins` |

## Divers

| Méthode | Route | Description | Accès |
| --- | --- | --- | --- |
| `POST` | `/email` | Envoi d'un email via le driver de mail configuré. | `manage-content` |
| `POST` | `/sms` | Envoi d'un SMS via le fournisseur configuré. | `manage-content` |
| `POST` | `/file/upload`, `/file/replace` | Upload de fichiers génériques (hors médiathèque). | `upload-media` |
| `POST` | `/file/delete` | Suppression d'un fichier générique. | `delete-media` |
| `POST` | `/file/download`, `/file/check` | Lecture d'un fichier générique, déjà public. | Authentifié |
| `GET` | `/translations/{locale}` | Chaînes de traduction de l'interface pour une langue donnée. | Public |
| `GET` | `/app-settings/public` | Sous-ensemble de réglages autorisé (allowlist) — suffisant pour afficher le branding sur les pages d'authentification avant l'ouverture d'une session. | Public |
| `GET` | `/app-information` | [Informations de base](../admin-panel/content-management/platform-identity) — aucun secret, tout l'index est donc public. | Public |
| `GET` | `/app-settings` | Réglages complets. Les clés d'API de traduction ne sont renvoyées qu'aux éditeurs de contenu, d'actualités et de réglages. | Authentifié |
| `PUT` | `/app-settings` | | `manage-app-settings` |
| `PUT` | `/app-information` | Modifiées depuis l'écran Contenu de l'administration. | `manage-content` |

::: tip
`/app-settings/public` et l'index de `/app-information` contournent volontairement `auth:sanctum` — la page de connexion et les autres écrans pré-auth en ont besoin pour afficher le branding avant qu'une session existe. `/app-settings/public` n'expose qu'une allowlist explicite de clés (`AppSettingController::PUBLIC_KEYS`, plus toute clé `appearance.*`) ; une nouvelle clé de réglage ajoutée plus tard reste par défaut derrière `auth:sanctum` sur l'index complet `/app-settings`. `/app-information` n'a aucun champ sensible, exposer tout son index est donc sûr — mais les écritures sur les deux restent authentifiées.
:::

## Installation & serveur

Ces routes servent principalement l'assistant d'installation web (voir [Installation](../getting-started/installation)) plutôt qu'une intégration externe classique.

| Méthode | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Vérification de l'état du serveur. |
| `POST` | `/server/configure` | Configuration initiale du serveur (URL, etc.). |
| `GET` | `/database` | Vérification de connectivité sur la connexion configurée — accessible quel que soit l'état du verrou d'installation, car les pages d'authentification la vérifient avant qu'une session existe. |
| `GET` `POST` | `/database/test`, `/database/create`, `/database/migrate`, `/database/seed` | Connexion à/création/migration/seed d'une base arbitraire pendant l'installation — protégé par le verrou d'installation. |
| `POST` | `/install/finalize`, `/install/create-admin` | Finalisation de l'installation, création du premier compte administrateur. |
