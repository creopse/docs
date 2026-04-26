---
layout: doc
---

# Configuration

La configuration de l'interface d'administration est stockée dans le fichier `public/creopse/config.jsonc`.

## Structure du fichier de configuration

### Configuration de l'API

```jsonc
{
  "apiBaseUrl": "https://creopse.test"
}
```

#### `apiBaseUrl`

- **Description** : URL de base utilisée pour tous les appels vers l'API. Par exemple, si votre endpoint est `/users`, l'URL complète sera `https://creopse.test/users`.
- **Valeur par défaut** : `"https://creopse.test"`

---

### Mode développement

```jsonc
{
  "forceDevMode": false
}
```

#### `forceDevMode`

- **Description** : Force l'application à s'exécuter en mode développement, même en production. Permet notamment de modifier les structures de données dans un environnement déployé.
- **Valeur par défaut** : `false`

:::warning
Ne pas activer en production sauf besoin explicite de débogage.
:::
