---
layout: doc
---

# Modèles de contenu

Un **modèle de contenu** (`content-model`) définit une structure de champs ; ses **items** sont les enregistrements réels qui s'y conforment. C'est le mécanisme à utiliser dès qu'un contenu suit un pattern « liste + détail » plutôt qu'un contenu unique porté par une section — Services, Projets, Membres d'équipe, offres de formation, etc.

## Quand utiliser un modèle de contenu

Un modèle de contenu est nécessaire dès qu'un composant a besoin d'afficher une **liste d'éléments identiques** dont chacun a sa **propre page de détail** (`Services.vue` + `ServiceDetails.vue`, `Projects.vue` + `ProjectDetails.vue`...). C'est le signe distinctif face à une simple [collection de section](./sections-widgets#anatomie-d-une-section) : un composant qui consomme des items de modèle de contenu s'appuie sur `getContentModelItems`/`getPaginatedContentModelItems` (voir [Consommer un modèle de contenu](#consommer-un-modele-de-contenu) ci-dessous) et `getContentPath(item)` (voir [Utilitaires](./utilities)) plutôt que sur `getSectionData`/`getSectionRootData` seuls.

![Modèle de contenu, items et permalien](/images/development/content-model-flow-fr-light.svg#light-only)
![Modèle de contenu, items et permalien](/images/development/content-model-flow-fr-dark.svg#dark-only)

## `intent` et `access-scope`

Chaque modèle de contenu est créé avec un couple `intent`/`access-scope` qui détermine qui produit la donnée :

| Type de contenu | `intent` | `access-scope` | Exemples |
| --- | --- | --- | --- |
| Contenu géré uniquement depuis l'administration (éditorial, catalogue) | `editorial-content` | `internal` | Services, Projets, Équipe, Articles, offres de formation |
| Contenu soumis par les visiteurs du site | `user-data` | `user-editable` | Messages de formulaire de contact, inscriptions |

La distinction porte sur **qui produit la donnée à l'origine** (l'équipe éditoriale vs le visiteur du site), pas sur qui peut la consulter ensuite — un catalogue de services reste `editorial-content`/`internal` même si un administrateur peut le modifier depuis l'interface.

## Créer un modèle de contenu

Voir la [référence CLI](../resources/cli#creopse-content-model-alias-cm) pour la syntaxe complète.

```bash
creopse content-model add service editorial-content internal \
  --title "en:Service" --title "fr:Service" \
  --data-structure @.creopse/content-models/Service/data-structure.json \
  --title-field-name name \
  --has-permalink true
```

- `--title-field-name` : le champ de la structure utilisé comme titre d'affichage en administration (généralement `name` ou `title`).
- `--has-permalink` : `true` dès que le modèle a une page de détail dédiée. **Ce flag seul ne câble rien** — il marque juste le modèle comme éligible. La route réelle (préfixe d'URL + page cible) se câble séparément avec `creopse permalink add`, voir [Permaliens](../resources/cli#creopse-permalink-alias-perm).

## Structure de données

La structure d'un modèle de contenu suit uniquement la partie « singletons » du format utilisé par les sections : un tableau de champs, sans clé `index` imbriquée (un modèle de contenu n'a généralement pas de collections, seulement des champs plats).

```json
[
  { "key": "name", "type": "i18n-text", "label": "{\"en\":\"Name\",\"fr\":\"Nom\"}", "options": [], "required": true, "settings": {} },
  { "key": "content", "type": "i18n-editor", "label": "{\"en\":\"Content\",\"fr\":\"Contenu\"}", "options": [], "required": false, "settings": {} },
  { "key": "image", "type": "image", "label": "{\"en\":\"Image\",\"fr\":\"Image\"}", "options": [], "required": true, "settings": {} },
  { "key": "parentService", "type": "content-model-item", "label": "{\"en\":\"Parent service\",\"fr\":\"Service parent\"}", "options": [], "required": false, "settings": {} }
]
```

Les mêmes [types de champs](./sections-widgets#types-de-champs) et règles de choix que pour une section s'appliquent (`i18n-editor` pour toute description, `text` pour les noms propres et URLs, etc.).

## Ajouter des items

```bash
creopse content-model item-add service --title "en:Energy Audit" --data @.creopse/content-models/Service/items/energy-audit.json
creopse content-model item-edit 12 --title "en:Renamed"
```

Le fichier `--data` suit la même imbrication `index` qu'une fake data de section (un objet `{"index": {...}}`), même si la structure elle-même est plate :

```json
{
  "index": {
    "name": "{\"en\":\"Energy Audit\",\"fr\":\"Audit énergétique\"}",
    "content": "{\"en\":\"<p>...</p>\",\"fr\":\"<p>...</p>\"}",
    "image": "content/energy-audit.jpg"
  }
}
```

Cette imbrication se retrouve directement côté composant de détail, qui accède aux champs via `contentModelItem?.contentModelData?.index?.name` — l'omettre en écrivant la fake data d'un item produit un rendu vide côté détail.

## Consommer un modèle de contenu

### Liste

```ts
const { getContentModelItems, getPaginatedContentModelItems } = useContent()

// Tous les items actifs
const services = await getContentModelItems('service')

// Pagination serveur, avec filtres
const { items, total, currentPage } = await getPaginatedContentModelItems(
  'service',
  1,
  9,
  true,
)
```

Utiliser `getContentModelItems` pour un petit volume chargé en une fois, `getPaginatedContentModelItems` dès qu'une pagination ou un filtrage serveur est nécessaire.

### Détail

Dans une page de détail (`ServiceDetails.vue`/`ServiceDetails.tsx`), l'item courant est exposé via `useProps()` :

```vue
<script setup lang="ts">
const { contentModelItem } = useProps()
const item = contentModelItem?.contentModelData
</script>

<template>
  <h1>{{ tr(item?.index?.name) }}</h1>
  <div v-html="rHtml(item?.index?.content)"></div>
</template>
```

```tsx
const { contentModelItem } = useProps()
const item = contentModelItem?.contentModelData

return (
  <>
    <h1>{tr(item?.index?.name)}</h1>
    <div dangerouslySetInnerHTML={{ __html: rHtml(item?.index?.content) }} />
  </>
)
```

## Store partagé pour un modèle réutilisé sur plusieurs sections (Vue)

Quand un même modèle de contenu (peu d'items) est consommé par plusieurs sections — typiquement une paire liste/détail comme Services ou Projects — charger les items une seule fois dans un store Pinia au démarrage évite les appels redondants à `getContentModelItems` :

```ts
// resources/js/stores/content.ts
import type { ContentModelItemModel } from '@creopse/utils'

interface ContentState {
  services: ContentModelItemModel['data'][]
}

export const useContentStore = defineStore('content', {
  state: (): ContentState => ({ services: [] }),
})
```

```ts
// resources/js/composables/dataloader.ts
export const useDataloader = () => {
  const { services } = storeToRefs(useContentStore())
  const { getContentModelItems } = useContent()

  const initializeData = async () => {
    services.value = (await getContentModelItems('service')) || []
  }

  return { initializeData }
}
```

```vue
<!-- resources/js/App.vue -->
<script setup lang="ts">
const { initializeData } = useDataloader()
initializeData()
</script>
```

Ce pattern est optionnel et n'a de sens que pour un modèle à faible volume consommé par plusieurs sections. Pour un modèle consommé par une seule section, appeler `getContentModelItems` directement dans le composant. Pour un modèle à fort volume nécessitant filtrage/pagination, préférer `getPaginatedContentModelItems` à la demande plutôt que ce store (qui charge tout en mémoire).

::: warning
Ce pattern repose sur Pinia, spécifique à la stack Vue — il n'existe pas d'équivalent standardisé côté React sur l'écosystème Creopse actuel. Sur un projet React, un mécanisme de state partagé (Context, Zustand...) doit être mis en place au cas par cas.
:::

## Permaliens

`--has-permalink true` seul ne suffit pas à rendre une page de détail accessible : voir [Permaliens](./permalinks) pour câbler effectivement le préfixe d'URL du modèle vers sa [page](./pages) de détail.
