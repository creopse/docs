---
layout: doc
---

# Configuration

Creopse fournit un système de configuration simple et puissant qui peut être facilement personnalisé pour répondre à vos besoins. La configuration est stockée dans un fichier `config.jsonc`, situé dans le dossier `public/creopse`.

## Structure du Fichier de Configuration

Voici un aperçu des paramètres de configuration que vous pouvez personnaliser :

### Configuration de l'API

Les paramètres `apiBaseUrl` et `apiRequestHeaders` vous permettent de personnaliser l'URL de l'API et d'ajouter des en-têtes personnalisés à chaque requête API.

```jsonc
{
  // ==============================================
  // Configuration de l'API
  // ==============================================

  // URL de base pour les points de terminaison de l'API.
  // Toutes les requêtes API seront effectuées par rapport à cette URL.
  // Exemple : Si le point de terminaison est `/users`, l'URL complète sera `https://creopse.test/users`.
  "apiBaseUrl": "<https://creopse.test>",

  // En-têtes personnalisés à inclure dans chaque requête API.
  // Ces en-têtes sont envoyés avec la requête pour l'authentification ou pour fournir un contexte supplémentaire.
  "apiRequestHeaders": {
    // Clé API utilisée pour l'authentification.
    // Cette clé est nécessaire pour accéder à l'API et doit être gardée secrète.
    "X-API-Key": "c7fec755-9b0f-46e8-bd2b-ca16de3068bb"
  }
}
```

#### `apiBaseUrl`

- **Description** : Il s'agit de l'URL de base pour les points de terminaison de l'API.
- **Valeur par défaut** : `"https://creopse.test"`
- **Utilisation** : Cette URL sera utilisée comme URL racine pour toutes les requêtes API. Par exemple, si vous avez un point de terminaison `/users`, l'URL complète sera `https://creopse.test/users`.

#### `apiRequestHeaders`

- **Description** : Cela vous permet d'ajouter des en-têtes personnalisés à chaque requête API. Utilisé généralement pour l'authentification.
- **Exemple** : L'en-tête `X-API-Key` est inclus dans toutes les requêtes pour authentifier l'API.
- **Utilisation** : Remplacez la clé API par votre propre clé sécurisée.

---

### Mode Développement

Le paramètre `forceDevMode` permet de forcer l'application à s'exécuter en mode développement, même si elle est déployée dans un environnement de production. Cela est utile pour les fonctionnalités accessibles uniquement en phase de développement.

```jsonc
{
  // ==============================================
  // Mode Développement
  // ==============================================

  // Force l'application à s'exécuter en mode développement, même si elle est déployée en production.
  // Lorsqu'il est réglé sur `true`, des informations et fonctionnalités supplémentaires peuvent être activées.
  "forceDevMode": false
}
```

#### `forceDevMode`

- **Description** : Force l'application à s'exécuter en mode développement. Ce paramètre est utile pour le débogage, mais il doit être désactivé en production.
- **Valeur par défaut** : `false`
- **Utilisation** : Réglez-le sur `true` si vous souhaitez activer des fonctionnalités de débogage supplémentaires. Réglez-le sur `false` pour les déploiements en production.

## Où Trouver le Fichier de Configuration

- Le fichier de configuration se trouve à `public/creopse/config.jsonc` dans votre répertoire de projet.
- Ouvrez ce fichier pour ajuster les paramètres de l'API et du mode développement.

## Conclusion

Ce système de configuration vous permet d'adapter rapidement Creopse à votre environnement. Que vous soyez en mode développement ou en production, vous pouvez modifier le fichier `config.jsonc` pour répondre à vos besoins.
