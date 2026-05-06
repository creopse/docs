---
layout: doc
---

# Configuration

Creopse permet de faire certaines configurations au niveau de l'interface d'administration et du backend. Ces configurations sont stockées dans des fichiers distincts.

## Configuration de l'interface d'administration

La configuration de l'interface d'administration est stockée dans le fichier `public/creopse/config.jsonc`.

### Structure du fichier de configuration

#### Configuration de l'API

```jsonc
{
  "apiBaseUrl": "https://creopse.test"
}
```

##### `apiBaseUrl`

- **Description** : URL de base utilisée pour tous les appels vers l'API. Par exemple, si votre endpoint est `/users`, l'URL complète sera `https://creopse.test/users`.
- **Valeur par défaut** : `"https://creopse.test"`

---

#### Mode développement

```jsonc
{
  "forceDevMode": false
}
```

##### `forceDevMode`

- **Description** : Force l'application à s'exécuter en mode développement, même en production. Permet notamment de modifier les structures de données de tous les éléments de contenu de l'interface d'administration dans un environnement déployé.
- **Valeur par défaut** : `false`

:::warning
Ne pas activer en production sauf besoin explicite de débogage.
:::

## Configuration du backend

La configuration du backend est stockée dans le fichier `config/creopse.php` avec Laravel.

### Structure du fichier de configuration

#### Modèle Utilisateur

```php
return [
  'user_model' => \App\Models\User::class,
]
```

##### `user_model`

- **Description** : Spécifie la classe du modèle utilisateur utilisée par le package. Généralement requis pour l'authentification, les relations ou toute autre fonctionnalité liée à l'entité utilisateur.
- **Valeur par défaut** : `\App\Models\User::class`

---

#### Seeder les données par défaut

```php
return [
  'seed_default_data' => true,
]
```

##### `seed_default_data`

- **Description** : Détermine si le package doit seeder la base de données avec les données par défaut lors de l'exécution des migrations ou des seeders. Les données concernées sont : l'utilisateur par défaut, le contenu par défaut, les permaliens de base et les paramètres par défaut. Définissez cette valeur sur `false` pour désactiver ce comportement, par exemple si vous voulez lancer vos propres seeds après l'initialisation des données.
- **Valeur par défaut** : `true`

---

#### Seuil de requêtes

```php
return [
  'rate_limit' => env('CREOPSE_RATE_LIMIT', 600),

  'rate_limit_by' => 'ip',
]
```

##### `rate_limit`

- **Description** : Définit le nombre maximal de requêtes autorisées par minute pour les routes ou fonctionnalités protégées par une limitation de requêtes. Cette valeur peut être surchargée par la variable d'environnement `CREOPSE_RATE_LIMIT`.
- **Valeur par défaut** : `600`

##### `rate_limit_by`

- **Description** : Définit les critères d'application de la limitation de requêtes. Les options disponibles sont :
  - `'ip'` : Limitation par l'adresse IP du client.
  - `'user'` : Limitation par l'utilisateur authentifié.
- **Valeur par défaut** : `'ip'`

---

#### Compression des réponses HTTP

Contrôle la compression automatique des réponses HTTP. Lorsqu'il est activé, le middleware négocie le meilleur algorithme disponible (Brotli > Gzip > Deflate) en fonction de l'en-tête `Accept-Encoding` du client. Brotli nécessite l'extension PECL `ext-brotli` ainsi qu'une connexion HTTPS. Gzip et Deflate requièrent l'extension `ext-zlib` (intégrée par défaut dans PHP).

```php
return [
  'compression' => [

    'enabled' => env('CREOPSE_COMPRESSION', true),

    'level' => env('CREOPSE_COMPRESSION_LEVEL', 5),

    'min_length' => env('CREOPSE_COMPRESSION_MIN_LENGTH', 1024),

  ],
]
```

##### `compression.enabled`

- **Description** : Active ou désactive entièrement la compression des réponses. Définissez cette valeur sur `false` si la compression est déjà gérée en amont (Nginx, Caddy, CloudFront...).
- **Valeur par défaut** : `true`

##### `compression.level`

- **Description** : Niveau de compression appliqué à tous les algorithmes. Gzip / Deflate acceptent une valeur entre `0` (aucune compression) et `9` (maximum). Brotli entre `0` et `11`. Le niveau `5` est le compromis idéal recommandé pour les réponses PHP en temps réel — des niveaux plus élevés offrent des rendements décroissants et augmentent la charge CPU.
- **Valeur par défaut** : `5`

##### `compression.min_length`

- **Description** : Taille minimale (en octets) de la réponse requise pour déclencher la compression. Compresser de faibles charges utiles (payloads) est contre-productif : le poids des en-têtes de compression peut à lui seul dépasser le gain d'espace obtenu.
- **Valeur par défaut** : `1024`

---

## Variables d'environnement

Tableau récapitulatif de toutes les variables d'environnement exposées par Creopse.

| Variable                          | Config associée              | Valeur par défaut |
| --------------------------------- | ---------------------------- | ----------------- |
| `CREOPSE_RATE_LIMIT`              | `rate_limit`                 | `600`             |
| `CREOPSE_COMPRESSION`             | `compression.enabled`        | `true`            |
| `CREOPSE_COMPRESSION_LEVEL`       | `compression.level`          | `5`               |
| `CREOPSE_COMPRESSION_MIN_LENGTH`  | `compression.min_length`     | `1024`            |
