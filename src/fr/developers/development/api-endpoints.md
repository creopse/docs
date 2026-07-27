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

Voir [Authentification](./authentication) pour le détail. En résumé : `auth:sanctum` protège la plupart des routes d'écriture et certaines routes de lecture, en acceptant indifféremment une session (interface d'administration) ou un token Bearer (clients externes). Chaque groupe ci-dessous précise ce qui est public.

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
| `POST` `PUT` `DELETE` | `/pages`, `/pages/{page}` | Authentifié |
| `PUT` | `/pages/position` | Authentifié |
| `GET` | `/sections` | Public |
| `GET` | `/sections/{section}` | Public |
| `GET` | `/section-data/{sectionSlug}/source/{pageSlug}/link/{linkId}` | Public |
| `POST` `PUT` `DELETE` | `/sections`, `/sections/{section}` | Authentifié |
| `PUT` | `/sections/{section}/data-source-page`, `/sections/{section}/duplicate`, `/sections/{section}/copy-data` | Authentifié |
| `GET` | `/sections/{slug}/link/{linkId}/page/{pageId}` | Authentifié |
| `GET` | `/menus`, `/menus/{menu}` | Public |
| `POST` `PUT` `DELETE` | `/menus`, `/menus/{menu}` | Authentifié |
| `GET` | `/menu/items`, `/menu/items/{menuItem}` | Public |
| `POST` `PUT` `DELETE` | `/menu/items`, `/menu/items/{menuItem}` | Authentifié |
| `PUT` | `/menu/items/position` | Authentifié |
| `GET` | `/menu-settings`, `/menu-locations`, `/menu-item-groups`, `/menu-item-types` (+ `/{id}`) | Public |
| `POST` `PUT` `DELETE` | mêmes ressources | Authentifié |
| `GET` | `/content-models`, `/content-models/{content_model}` | Public |
| `POST` `PUT` `DELETE` | `/content-models`, `/content-models/{content_model}` | Authentifié |
| `GET` | `/content-model/items`, `/content-model/items/{contentModelItem}` | Public |
| `POST` `PUT` `DELETE` | `/content-model/items`, `/content-model/items/{contentModelItem}` | Authentifié |
| `POST` `PUT` `DELETE` | `/content-model/user-items` (+ `/{id}`) | Public — soumission par un visiteur (formulaires) |
| `POST` | `/content-model-items/list` | Authentifié |
| `GET` | `/content-model-items/search/{query?}/{contentModelId?}` | Authentifié |
| `PUT` | `/content-model-items/related/{contentModelItem}` | Authentifié |
| `GET` | `/permalinks`, `/permalinks/{permalink}` | Public |
| `POST` `PUT` `DELETE` | `/permalinks`, `/permalinks/{permalink}` | Authentifié |

## News

| Méthode | Route | Accès |
| --- | --- | --- |
| `GET` | `/news-articles`, `/news-articles/{newsArticle}` | Public |
| `GET` | `/news-articles/headlines/{limit?}`, `/news-articles/random/{limit?}`, `/news-articles/categories`, `/news-articles/search/{query?}`, `/news-articles/list/months` | Public |
| `POST` | `/news-articles/list` | Public |
| `POST` `PUT` `DELETE` | `/news-articles`, `/news-articles/{newsArticle}` (+ `force`/`restore`) | Authentifié |
| `GET` | `/news-categories`, `/news-categories/{newsCategory}`, `/news-categories/articles` (+ `/{id}`) | Public |
| `POST` `PUT` `DELETE` | `/news-categories`, `/news-categories/{newsCategory}` (+ `position`, `force`, `restore`) | Authentifié |
| `GET` `POST` | `/news-comments`, `/news-comments/{newsComment}` | Public — y compris la création (`POST`) |
| `PUT` `DELETE` | `/news-comments/{newsComment}` (+ `force`/`restore`) | Authentifié |
| `GET` | `/news-tags`, `/news-tags/{newsTag}`, `/news-tags/articles` (+ `/{id}`) | Public |
| `POST` `PUT` `DELETE` | `/news-tags`, `/news-tags/{newsTag}` (+ `force`/`restore`) | Authentifié |

## Vidéos

| Méthode | Route | Accès |
| --- | --- | --- |
| `GET` | `/video-items`, `/video-items/{videoItem}` | Public |
| `GET` | `/video-categories`, `/video-categories/{videoCategory}`, `/video-categories/items` (+ `/{id}`) | Public |
| `POST` `PUT` `DELETE` | `/video-items`, `/video-items/{videoItem}` (+ `force`/`restore`) | Authentifié |
| `PUT` | `/video-items/youtube/channel-videos` | Authentifié |
| `POST` `PUT` `DELETE` | `/video-categories`, `/video-categories/{videoCategory}` (+ `position`, `force`, `restore`) | Authentifié |
| `GET` `PUT` | `/video-settings` | Authentifié |

## Publicités

| Méthode | Route | Accès |
| --- | --- | --- |
| `GET` | `/ads`, `/ads/{ad}` | Public |
| `GET` | `/ad-identifiers`, `/ad-identifiers/{ad_identifier}` | Public |
| `POST` `PUT` `DELETE` | `/ads`, `/ads/{ad}` | Authentifié |
| `POST` `PUT` `DELETE` | `/ad-identifiers`, `/ad-identifiers/{ad_identifier}` | Authentifié |

## Newsletter

| Méthode | Route | Accès |
| --- | --- | --- |
| `POST` | `/newsletter/emails`, `/newsletter/phones` | Public — auto-inscription |
| `GET` `PUT` `DELETE` | `/newsletter/emails`, `/newsletter/phones` (+ `/{id}`) | Authentifié |
| `GET` `POST` `PUT` `DELETE` | `/newsletter/campaigns` (+ `/{campaign}`) | Authentifié |

## Utilisateurs, rôles et permissions

Voir [Authentification](./authentication#roles-et-permissions) pour le détail des guards et permissions nommées.

| Méthode | Route | Accès |
| --- | --- | --- |
| `GET` | `/roles`, `/permissions` | Public |
| `POST` `PUT` `DELETE` | `/roles`, `/permissions` (+ `/{id}`) | Authentifié |
| `GET` | `/roles/user/{user?}`, `/permissions/user/{user?}` | Authentifié |
| `GET` | `/users`, `/users/{user}`, `/users/search/{query?}`, `/users/type/administrators` | Authentifié |
| `POST` | `/users`, `/users/import` | Authentifié + permission `action-add-user` |
| `PUT` | `/users/{user}` | Authentifié + permission `action-edit-user` |
| `DELETE` | `/users/{user}` | Authentifié + permission `action-delete-user` |
| `PUT` | `/users/self/{user}` | Authentifié |
| `GET` | `/user/permissions/{user?}`, `/user/sessions/{user?}`, `/user/devices/{user?}`, `/user/place/{user?}`, `/user/roles/{user?}` | Authentifié |
| `GET` | `/user/email/{email}`, `/user/phone/{phone}`, `/user/username/{username}` | Authentifié |
| `GET` `POST` `PUT` `DELETE` | `/user-sessions`, `/user-devices`, `/user-place` (+ `/{id}`) | Authentifié |

## Médiathèque

| Méthode | Route | Accès |
| --- | --- | --- |
| `GET` | `/media-files`, `/media-files/{mediaFile}`, `/media-files/search/{query?}`, `/media-files/list/months` | Authentifié |
| `POST` | `/media-files/list`, `/media-files/paths/list`, `/media-files/upload` | Authentifié |
| `POST` | `/media-files/replace/{mediaFile}`, `/media-files/delete` | Authentifié |
| `DELETE` | `/media-files/{mediaFile}` (+ `force`, `force/all`) | Authentifié |
| `PUT` | `/media-files/restore/{mediaFile}` | Authentifié |

Aucune route de la médiathèque n'est publique, contrairement aux autres ressources de contenu.

## Notifications

| Méthode | Route | Accès |
| --- | --- | --- |
| `GET` | `/notifications`, `/notifications/unread`, `/notifications/read` | Authentifié |
| `PUT` | `/notifications/mark/{notification}`, `/notifications/mark-all` | Authentifié |
| `DELETE` | `/notifications/{notification}` | Authentifié |

## Statistiques

Toutes authentifiées — alimentent la [Vue d'ensemble](../admin-panel/content-management/getting-started) de l'administration.

| Méthode | Route |
| --- | --- |
| `GET` | `/visits`, `/visitors` |
| `GET` | `/count/users`, `/count/administrators`, `/count/others` |
| `GET` | `/count/news-articles` (+ `/status/{status}`, `/author/{id}`), `/count/news-categories`, `/count/news-comments`, `/count/news-tags` |
| `GET` | `/count/media-files` (+ `/type/{type}`, `/trashed`) |

## Plugins

Voir [Développement de plugins](../plugins-development/basics#lister-installer-et-gerer-les-plugins) pour le détail du cycle de vie.

| Méthode | Route | Accès |
| --- | --- | --- |
| `GET` | `/plugins`, `/plugins/{id}` | Public |
| `POST` | `/plugins/install` | Authentifié |
| `PUT` | `/plugins/{id}/update`, `/plugins/{id}/enable`, `/plugins/{id}/disable` | Authentifié |
| `DELETE` | `/plugins/{id}/uninstall` | Authentifié |

## Divers

| Méthode | Route | Description | Accès |
| --- | --- | --- | --- |
| `POST` | `/email` | Envoi d'un email via le driver de mail configuré. | Authentifié |
| `POST` | `/sms` | Envoi d'un SMS via le fournisseur configuré. | Authentifié |
| `POST` | `/file/upload`, `/file/replace`, `/file/delete`, `/file/download`, `/file/check` | Upload/gestion de fichiers génériques (hors médiathèque). | Authentifié |
| `GET` | `/translations/{locale}` | Chaînes de traduction de l'interface pour une langue donnée. | Public |
| `GET` `PUT` | `/app-settings`, `/app-information` | Réglages globaux et [informations de base](../admin-panel/content-management/platform-identity) de la plateforme. | Public |

::: tip
`app-settings`/`app-information` ne sont pas protégées par `auth:sanctum` au niveau de la route — à garder en tête si l'un ou l'autre est étendu.
:::

## Installation & serveur

Ces routes servent principalement l'assistant d'installation web (voir [Installation](../getting-started/installation)) plutôt qu'une intégration externe classique.

| Méthode | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Vérification de l'état du serveur. |
| `POST` | `/server/configure` | Configuration initiale du serveur (URL, etc.). |
| `GET` `POST` | `/database` (+ `/test`, `/create`, `/migrate`, `/seed`) | Connexion, création et migration de la base pendant l'installation. |
| `POST` | `/install/finalize`, `/install/create-admin` | Finalisation de l'installation, création du premier compte administrateur. |
