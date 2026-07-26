---
layout: doc
---

# Sections & Widgets

Une page Creopse est composée d'instances de **sections** et de **widgets** — les deux unités de base à partir desquelles un template est construit. Cette page couvre leur création, leur structure de données et les conventions de rendu, pour les stacks Vue 3 et React 19.

## Sections vs widgets

- **Section** — bloc UI éditable, traduisible et géré depuis l'interface d'administration (Header, Hero, Services, Testimonials, Footer, Contact...). Une section possède une **structure de données** : des champs singletons et, le cas échéant, des collections et des réglages d'affichage.
- **Widget** — bloc HTML statique sans besoin de gestion de contenu (préchargeur, barre de progression de scroll, bannière de cookies statique...). Un widget **n'a aucune structure de données** : c'est du HTML/Vue (ou HTML/React) pur.

## Créer une section ou un widget

Le scaffolding se fait via la [CLI](../resources/cli), qui génère à la fois le composant frontend et son entrée en base de données :

```bash
creopse section add Header Hero Features Services Testimonials Footer Contact
creopse widget add Preloader ScrollProgress
```

Chaque section générée place son composant dans `resources/js/Sections/<NomSection>.vue` (`.tsx` en React), chaque widget dans `resources/js/Widgets/<NomWidget>.vue` (`.tsx` en React).

## Anatomie d'une section

Une section est définie par une **structure de données** et, si elle a des réglages d'affichage, une **structure de réglages**. Les deux sont soumises via `creopse section edit` :

```bash
creopse section edit Header \
  --data-structure @.creopse/sections/Header/data-structure.json \
  --settings-structure @.creopse/sections/Header/settings.json
```

### Structure de données

Le fichier `data-structure.json` contient un objet à deux niveaux : `index` pour les champs singletons, et une clé par collection au niveau racine.

```json
{
  "index": [
    {
      "key": "title",
      "type": "i18n-text",
      "label": "{\"en\":\"Title\",\"fr\":\"Titre\"}",
      "options": [],
      "required": true,
      "settings": {}
    },
    {
      "key": "text",
      "type": "i18n-editor",
      "label": "{\"en\":\"Text\",\"fr\":\"Texte\"}",
      "options": [],
      "required": false,
      "settings": {}
    }
  ],
  "features": {
    "key": "features",
    "title": "{\"en\":\"Features\",\"fr\":\"Caractéristiques\"}",
    "items": [
      {
        "key": "icon",
        "type": "icon",
        "label": "{\"en\":\"Icon\",\"fr\":\"Icône\"}",
        "options": [],
        "required": true,
        "settings": {}
      },
      {
        "key": "title",
        "type": "i18n-text",
        "label": "{\"en\":\"Title\",\"fr\":\"Titre\"}",
        "options": [],
        "required": true,
        "settings": {}
      }
    ]
  }
}
```

Une **collection** (`features` ci-dessus) n'a de sens que si le nombre d'éléments est variable. Quand le nombre de sous-éléments est fixe (par exemple deux boutons par slide), préférer des champs singletons plats (`btnOneLabel`/`btnOneUrl`/`btnTwoLabel`/`btnTwoUrl`) à une collection.

![Singleton vs Collection](/images/core-concepts/singleton-vs-collection-fr-light.svg#light-only)
![Singleton vs Collection](/images/core-concepts/singleton-vs-collection-fr-dark.svg#dark-only)

## Types de champs

| Type | Usage |
| --- | --- |
| `text` | Chaîne non traduisible : URL, nom propre, donnée technique. |
| `i18n-text` | Chaîne traduisible courte (titre, label, tagline). |
| `textarea` | Zone de texte non traduisible (rare). |
| `editor` | Éditeur riche non traduisible (rare). |
| `i18n-editor` | Éditeur riche traduisible — type canonique pour tout champ description. |
| `number` | Valeur numérique. |
| `checkbox`, `switch`, `slider`, `range-slider` | Champs numériques/booléens. |
| `single-select`, `multi-select` | Champs de sélection. |
| `date`, `daterange`, `datetime`, `datetimerange`, `year`, `yearrange`, `month`, `monthrange`, `quarter`, `quarterrange`, `week` | Champs de date. |
| `image`, `gallery`, `audio`, `video`, `document`, `file` | Champs média. |
| `news-article`, `news-articles`, `news-category`, `news-categories`, `news-tag`, `news-tags` | Références vers du contenu news natif. |
| `icon`, `icons`, `color`, `gradient` | Icône(s) et couleur(s). |
| `content-model-item` | Référence vers un item d'un [modèle de contenu](./content-models) (ex. un service parent). |
| `content-model-items` | Référence vers plusieurs items d'un modèle de contenu. |
| `menu-item-link` | Lien hybride pour boutons CTA/navigation : supporte à la fois une référence à un item de menu (id numérique) et une URL brute. |
| `list`, `i18n-list`, `albums` | Champs liste. |

::: warning
`i18n-textarea` existe mais ne doit jamais être utilisé — même pour un texte court, si le champ contient du HTML riche ou une description substantielle, c'est `i18n-editor` qui s'applique.
:::

### Règles de choix

- **`i18n-text`** pour toute chaîne traduisible courte et non formatée (titres, labels, taglines, libellés de bouton).
- **`text`** pour tout ce qui n'est pas traduisible : URLs, noms propres, données techniques.
- **Champs de formulaire soumis par le visiteur** (contact, newsletter) : toujours `text`/`checkbox`, jamais `i18n-*`.
- **`menu-item-link` vs `text`** pour un lien : si le lien doit rester pilotable depuis la gestion des [menus](./menus) (cohérence de navigation globale, CTA de header), utiliser `menu-item-link` ; si le composant utilise directement la valeur comme URL sans passer par le système de menu (CTA autonome de section), `text` reste légitime.
- **Ne jamais dupliquer une donnée globale** déjà accessible via `getAppInformationValue()` (nom du site, coordonnées, réseaux sociaux, couleurs de marque...) — voir [Utilitaires](./utilities#usecontent).

## Consommer les données dans un composant

### Avec un frontend Vue

```vue
<script setup lang="ts">
const props = defineProps<SectionProps>()

const { tr, rHtml, fileUrl } = useHelper()
const { getSectionRootData, getSectionData, getSectionSettings } = useContent()

const sectionData = getSectionRootData(props.sectionKey)
const features = getSectionData(props.sectionKey)?.features ?? []
const settings = getSectionSettings(props.sectionKey)
</script>

<template>
  <h2>{{ tr(sectionData?.title) }}</h2>
  <div v-html="rHtml(sectionData?.text)"></div>

  <div v-for="feature in features" :key="feature.key">
    <ContentIcon :data="feature.icon" :size="42" />
    <h3>{{ tr(feature.title) }}</h3>
  </div>
</template>
```

### Avec un frontend React

```tsx
const Section: React.FC<SectionProps> = (props) => {
  const { tr, rHtml, fileUrl } = useHelper()
  const { getSectionRootData, getSectionData, getSectionSettings } = useContent()

  const sectionData = getSectionRootData(props.sectionKey)
  const features = getSectionData(props.sectionKey)?.features ?? []
  const settings = getSectionSettings(props.sectionKey)

  return (
    <>
      <h2>{tr(sectionData?.title)}</h2>
      <div dangerouslySetInnerHTML={{ __html: rHtml(sectionData?.text) }} />

      {features.map((feature) => (
        <div key={feature.key}>
          <ContentIcon data={feature.icon} size={42} />
          <h3>{tr(feature.title)}</h3>
        </div>
      ))}
    </>
  )
}
```

`tr(field)` traduit un champ `i18n-text`, `rHtml(field)` rend le HTML d'un champ `i18n-editor` (toujours via `v-html`/`dangerouslySetInnerHTML`, jamais interpolé en texte), `fileUrl(field)` résout l'URL absolue d'un champ média. Voir [Utilitaires](./utilities) pour la liste complète des composables/hooks disponibles.

## Rendu conditionnel

Lorsqu'une paire de champs doit être entièrement renseignée pour être affichée (typiquement un bouton avec label + URL) :

```vue
<a v-if="data?.btnUrl && tr(data?.btnText)" :href="data.btnUrl">{{ tr(data.btnText) }}</a>
```

```tsx
{data?.btnUrl && tr(data?.btnText) && (
  <a href={data.btnUrl}>{tr(data.btnText)}</a>
)}
```

## Liens et boutons CTA

Pour un champ `menu-item-link`, le `href` se résout via `getLinkFromMenuItemId(champ)` et la navigation passe par `openLink(champ)`, plutôt que le comportement natif du lien — cela permet de gérer uniformément les deux cas possibles (id de menu ou URL brute) :

```vue
<a
  v-if="slide.btnUrl && tr(slide.btnLabel)"
  :href="getLinkFromMenuItemId(slide.btnUrl)"
  @click.prevent="openLink(slide.btnUrl)">
  {{ tr(slide.btnLabel) }}
</a>
```

Tout lien issu directement du système de menu (item de menu principal, sous-menu, liste positionnée par location) suit le même pattern transverse, avec `getMenuHref`/`openMenu` :

```vue
<a :href="getMenuHref(item)" @click.prevent="openMenu(item)">{{ tr(item.title) }}</a>
```

Jamais de `href` en dur ni de navigation directe sur un lien de menu ou un CTA `menu-item-link`. Voir [Menus](./menus) pour la mise en place des locations/menus/items consommés ici.

## Comportements interactifs

Le HTML source d'un template statique repose souvent sur des plugins JS (Bootstrap, Swiper, lightbox...) — ces comportements doivent être ré-implémentés nativement plutôt que conservés tels quels :

- **Carousels/sliders faits main** (hero plein écran avec overlay, par exemple) : état local + `setInterval` démarré/nettoyé au montage/démontage du composant, jamais de plugin JS tiers pour ce cas.
- **Swiper** : toujours via le binding officiel du framework (`swiper/vue` ou `swiper/react`), jamais le markup vanille `swiper-container`/`swiper-slide` du template source.
- **Modals** : `Teleport`/`MountedTeleport` + état local, jamais `data-bs-toggle="modal"` fonctionnel.
- **Accordéons** (FAQ, contenu détaillé) : état = index ouvert, jamais `data-bs-toggle="collapse"` fonctionnel.
- **Compteurs animés** : déclenchés une seule fois via un observateur d'intersection (`IntersectionObserver`), pas au chargement de la page.

::: warning
Aucun script JS de plugin (Bootstrap, carousels, modals, accordéons) ne doit rester fonctionnel dans un composant final — l'attribut peut rester pour le style CSS, mais le comportement doit être entièrement porté par le framework.
:::

## Widgets

Un widget suit les mêmes étapes de création et d'adaptation du HTML qu'une section, mais sans structure de données ni fake data — c'est un composant purement statique. Il n'expose donc pas de `sectionKey` consommable via `useContent()`.

## Bilinguisme

Tout composant de section (et sa fake data) est bilingue FR/EN par défaut, même si le template HTML source fourni n'existe que dans une seule langue.
