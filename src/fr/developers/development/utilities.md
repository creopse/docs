---
layout: doc
---

# Utilitaires

En complément des [sections et widgets](./sections-widgets) et des [modèles de contenu](./content-models), Creopse expose deux niveaux d'API consommables depuis un composant : des **composables** (Vue) / **hooks** (React) qui donnent accès aux données de la plateforme (`@creopse/vue`/`@creopse/react`), et des **fonctions utilitaires pures** partagées par les deux stacks (`@creopse/utils`).

::: tip Vue vs React
Les composables/hooks portent le même nom et la même signature sur les deux stacks — seule la syntaxe change. Côté Vue, `const { tr } = useHelper()` retourne des valeurs directement exploitables dans le template (pas de `.value` à gérer pour les fonctions, uniquement pour les quelques `Ref` documentées ci-dessous). Côté React, tout est exploitable tel quel, sans déréférencement. Tout ce qui vient de `@creopse/utils` (`formatDate`, `hexToRgba`...) est strictement identique dans les deux stacks.
:::

## Composables / hooks disponibles

| Composable / Hook | Rôle |
| --- | --- |
| `useHelper()` | Fonctions transverses : traduction, résolution de fichiers/liens, responsive, langue active. |
| `useContent()` | Données de page, sections, modèles de contenu, informations de base. |
| `useMenu()` | Lecture des menus et de leurs items, résolution de liens. |
| `useNews()` | Articles, catégories, tags et commentaires (actualités). |
| `useVideo()` | Catégories et items vidéo. |
| `useNewsletter()` | Abonnement newsletter par email ou téléphone. |
| `useApi()` | Requêtes HTTP génériques vers l'API. |
| `useProps()` | Props réactives de la page courante (Inertia). |
| `useConfig()` | Configuration du plugin (URL de base, locale...). |

## `useHelper()`

| Membre | Signature | Description |
| --- | --- | --- |
| `tr` | `(data, lang?) => string` | Traduit un champ `i18n-text`. |
| `rHtml` | `(data, lang?) => string` | Traduit et résout un champ `i18n-editor` (toujours via `v-html`/`dangerouslySetInnerHTML`). |
| `fileUrl` | `(path) => string` | URL absolue d'un fichier (`storage/<path>`). |
| `getImage` | `(path, size?) => Promise<string>` | URL de la miniature demandée (`small`/`medium`/`large`/`original`), repli sur l'original si absente. |
| `getVideoThumbnail` | `(path) => string` | URL de la miniature d'une vidéo. |
| `resolveUrl` | `(path) => string` | Résout une URL relative vers l'URL de base de l'API. |
| `openLink` | `(entity) => void` | Ouvre un lien (id de menu, URL brute, ou route Inertia) — voir [Liens et boutons CTA](./sections-widgets#liens-et-boutons-cta). |
| `languages` | `Language[]` | Langues disponibles (`fr`, `en`). |
| `updateLang` | `(val, reload?, updateUserPrefs?) => Promise<void>` | Change la langue active. |
| `socialNetworks` | `{ name; icon }[]` | Liste des réseaux sociaux supportés (boucle Header/Footer). |
| `detectSocialNetwork` | `(url) => { name; icon } \| null` | Détecte le réseau social d'une URL. |
| `isXlScreen` / `isLgScreen` / `isMdScreen` / `isSmScreen` / `is2XlScreen` | `Ref<boolean>` (Vue) | Points de rupture responsive courants. |
| `currentRoutePath` | `Ref<string>` (Vue) | Chemin de la page Inertia courante. |
| `displayFormErrors` | `(errors, displayError) => void` | Affiche les erreurs de formulaire via un callback. |

::: warning
`getActiveLanguage()` (utilisé pour la valeur courante d'un sélecteur de langue) n'est **pas** fourni par `useHelper()` — c'est une fonction auto-importée de `laravel-vue-i18n` côté Vue.
:::

## `useContent()`

| Membre | Signature | Description |
| --- | --- | --- |
| `getSectionRootData` | `(key?) => any` | Champs singletons d'une section (équivalent de `getSectionData(key)?.index`). |
| `getSectionData` | `(key?) => any` | Données complètes d'une section (singletons + collections). |
| `getSectionSettings` | `(key?) => any` | Réglages d'affichage d'une section. |
| `getSectionSettingsGroup` / `getSectionSetting` | `(key?, group, name?) => any` | Groupe ou réglage précis. |
| `getAnySectionData` | `(sectionSlug, pageSlug, linkId?) => Promise<any>` | Données d'une section depuis n'importe quelle page. |
| `getContentModel` | `(name) => ContentModelModel \| undefined` | Modèle de contenu par nom. |
| `getContentModelItems` | `(name, activeOnly?) => Promise<ContentModelItemModel[]>` | Items d'un modèle de contenu — voir [Modèles de contenu](./content-models). |
| `getPaginatedContentModelItems` | `(name, page, pageSize, activeOnly?, query?, dataFilters?, sortBy?, sortDirection?) => Promise<PaginatedContentModelItems>` | Items paginés, avec filtres. |
| `submitUserContentModelItem` | `(title, contentModelId, singletonsData?, collectionsData?, onSuccess?, onError?) => Promise<Response>` | Soumet un item utilisateur (formulaires). |
| `getContentPath` | `(item, force?) => string` | Chemin permalien d'un item ou d'un article. |
| `getAppInformationValue` | `(key, type?) => any` | Valeur d'une information de base (voir tableau ci-dessous). |
| `pageData` | `PageModel \| null` | Données de la page courante. |
| `contentModelItem` | `ContentModelItemModel \| null` | Item de modèle de contenu courant (page de détail). |
| `newsArticle` / `newsCategory` / `newsTag` | — | Article/catégorie/tag de news courant. |
| `appPrimaryColor` / `appSecondaryColor` / `appAccentColor` | `string` | Couleurs de marque configurées. |
| `logo` / `icon` | `string` | URL du logo / de l'icône configurés. |

### Clés `getAppInformationValue`

Ne jamais recréer un champ de section pour l'une de ces valeurs — les consommer directement via `getAppInformationValue('<clé>')` :

```
name, icon, oneColorIcon, logo, oneColorLogo, phone, email, address, postalCode,
description, primaryColor, secondaryColor, accentColor, facebook, twitter, instagram,
whatsapp, linkedin, youtube, pinterest, snapchat, tiktok, telegram, discord, reddit,
tumblr, vimeo, twitch, github, dribbble, behance, medium, stackOverflow, threads,
messenger, playstore, appstore, additionalInfo
```

Ces valeurs sont gérées via [`creopse base-info`](../resources/cli#creopse-base-info-alias-info).

## `useMenu()`

| Membre | Signature | Description |
| --- | --- | --- |
| `getMenu` | `(name, activeOnly?, nested?) => MenuModel \| undefined` | Menu par nom. |
| `getMenuByLocation` | `(name, activeOnly?, nested?) => MenuModel \| undefined` | Menu par location. |
| `getMenuItems` | `(name, visibleOnly?, nested?) => MenuItemModel[]` | Items d'un menu par nom. |
| `getMenuItemsByLocation` | `(name, visibleOnly?, nested?) => MenuItemModel[]` | Items par location — le plus utilisé pour un Header/Footer. |
| `getMenuItemById` | `(id) => MenuItemModel \| undefined` | Item par id. |
| `getMenuGroups` / `getMenuItemsByGroup` / `getMenuGroupedItems` / `getMenuUngroupedItems` | — | Regroupement d'items (dropdowns). |
| `getMenuHref` | `(item) => string` | `href` résolu d'un item de menu. |
| `openMenu` | `(item?) => void` | Navigue vers un item de menu selon son `targetType`. |
| `getLinkFromMenuItemId` | `(id) => string` | Lien résolu depuis un champ `menu-item-link`. |

Voir le pattern de rendu complet dans [Liens et boutons CTA](./sections-widgets#liens-et-boutons-cta).

## `useNews()`

| Membre | Signature | Description |
| --- | --- | --- |
| `isLoading` | `Ref<boolean>` | État de chargement. |
| `loadArticles` | `(params: { pageSize, page?, query?, status?, categories?, tags?, months? }) => Promise<{ articles; meta }>` | Articles paginés. |
| `loadCategories` / `loadTags` | `(filterByIsVisible?) => Promise<[]>` | Catégories/tags visibles. |
| `loadArticlesMonths` | `() => Promise<string[]>` | Mois disposant d'articles (archives). |
| `loadArticlesCount` / `loadArticlesCountByStatus` / `loadArticlesCountByAuthor` | — | Compteurs d'articles. |
| `loadComments` | `(params: { pageSize, page?, query? }) => Promise<{ comments; meta }>` | Commentaires paginés. |
| `addComment` | `(comment, onSuccess?, onError?) => Promise<Response>` | Ajoute un commentaire. |

Toujours passer par ce composable pour une liste d'articles — jamais une collection de section, voir [Sections & Widgets](./sections-widgets).

## `useVideo()`

| Membre | Signature | Description |
| --- | --- | --- |
| `isLoading` | `Ref<boolean>` | État de chargement. |
| `loadCategories` | `(filterByIsVisible?) => Promise<VideoCategoryModel[]>` | Catégories vidéo. |
| `loadVideoItems` | `(params) => Promise<PaginatedVideoItems>` | Vidéos paginées. |

## `useNewsletter()`

| Membre | Signature | Description |
| --- | --- | --- |
| `isLoading` | `Ref<boolean>` | État de chargement. |
| `subscribeEmail` | `(email, onSuccess?, onError?) => Promise<void>` | Abonne un email. |
| `subscribePhone` | `(phone, onSuccess?, onError?) => Promise<void>` | Abonne un numéro (espaces supprimés). |

Pattern d'usage typique dans un Footer : voir [Sections & Widgets](./sections-widgets).

## `useApi()`, `useProps()`, `useConfig()`

- **`useApi()`** — méthodes bas niveau (`request`, `getItemRequest`, `postItemRequest`, `putItemRequest`, `deleteItemRequest`, `getAllItemsRequest`, `handleError`) pour des appels HTTP hors du périmètre des composables métier ci-dessus.
- **`useProps()`** — retourne les props réactives de la page (données Inertia). Utilisé pour accéder à `contentModelItem`/`article` sur une page de détail, voir [Modèles de contenu](./content-models#consommer-un-modele-de-contenu).
- **`useConfig()`** — retourne la configuration du plugin (`apiBaseUrl`, `apiUrl`, `locale`, `fallbackLocale`, `debug`...).

## Composants utilitaires

| Besoin | Vue | React |
| --- | --- | --- |
| Image avec sélection de miniature | `<Image :src="..." size="large" />` | `<Image src={...} size="large" />` |
| Image résolue par une promesse | `<AsyncImg :load="..." />` | `<AsyncImg load={...} />` |
| Portail/modal (pas d'équivalent JSX à `<Teleport>`) | `<Teleport to="body">` (natif Vue) | `<MountedTeleport to="body">` |
| Transition/animation | `<Transition name="...">` (natif Vue) | `<CustomTransition name="fade\|slide-fade\|bounce">` |
| Icône SVG d'un champ `icon` (donnée en base) | `<ContentIcon :data="..." :size="42" />` | `<ContentIcon data={...} size={42} />` (`@arkn/react-icon-picker`) |
| Icône statique (MDI, Bootstrap Icons...) | `<Icon icon="mdi:..." />` | `<Icon icon="mdi:..." />` (`@iconify/react`) |
| Barre collante | `<StickyTop>` / `<StickyBottom>` | `<StickyTop>` / `<StickyBottom>` |
| Troncature de texte avec « lire plus » | `<ReadMore :text="..." />` | `<ReadMore text={...} />` |

::: warning
Côté React, chaque composant utilisé dans le JSX doit être **explicitement importé** en tête de fichier (`Image` depuis `@creopse/react`, `Icon` depuis `@iconify/react`...) — contrairement aux exemples Vue où certains composants Creopse sont enregistrés globalement par le plugin.
:::

## Fonctions utilitaires pures (`@creopse/utils`)

Communes aux deux stacks, importables depuis `@creopse/utils` ou `@creopse/utils/helpers`.

### Dates

| Fonction | Description |
| --- | --- |
| `formatDate(date, { outPattern?, locale? })` | Formate une date — **le helper à utiliser pour tout affichage de date dans une section**, plutôt qu'un `toLocaleDateString` local. |
| `reformatDate(date, { inPattern?, outPattern?, locale? })` | Convertit une date d'un format à un autre. |
| `differenceFromNow(date, { locale?, pattern? })` | Différence relative (« il y a 3 jours »). |
| `differenceWithToday(date, { pattern?, unit? })` | Différence entre une date et aujourd'hui. |
| `differenceBetweenDates(start, end, options?)` | Différence entre deux dates. |
| `getDateFromTimestamp(date, options?)` | Formate un timestamp UNIX (secondes) en date. |
| `getCurrentTimestamp()` | Timestamp UNIX courant. |

### Couleurs

| Fonction | Description |
| --- | --- |
| `hexToRgba(hex, alpha)` | Convertit un hexadécimal en `rgba(...)` — renvoie directement la chaîne complète, pas des composantes séparées. |
| `genRandomColor()` | Génère un hexadécimal aléatoire. |

### Chaînes de caractères

| Fonction | Description |
| --- | --- |
| `capitalizeFirstLetter(string)` | Met en majuscule la première lettre. |
| `getNameInitials(name)` | Initiales (2 lettres) d'un nom composé. |
| `extractNumber(string, options?)` | Extrait un ou plusieurs nombres d'une chaîne. |
| `isTitleLike(value, options?)` / `extractTitleLike(data, tr, defaultValue?)` | Détection heuristique de champ « titre ». |
| `replaceStringParts(str, replacements)` | Remplace plusieurs parties d'une chaîne selon un dictionnaire. |

### Nombres et tableaux

| Fonction | Description |
| --- | --- |
| `getRandomInteger(min, max)` | Entier aléatoire inclusif. |
| `abbreviateNumber(number)` | Abrège un nombre (`1.2k`, `3.4M`...). |
| `removeDuplicates(arr, property)` | Déduplique un tableau selon une propriété. |
| `shuffleArray(array)` | Mélange un tableau (Fisher-Yates). |

### Fichiers, images et URLs

| Fonction | Description |
| --- | --- |
| `humanFileSize(bytes, si?, dp?)` | Taille de fichier lisible. |
| `getFileExtension(path)` | Extension d'un chemin de fichier. |
| `compressImage(file, options?)` | Compresse une image côté client. |
| `isExternal(path)` | Vrai si le chemin est une URL externe, un `mailto:` ou un `tel:`. |
| `isURL(str)` | Valide qu'une chaîne est une URL. |
| `removeTrailingSlash` / `removeLeadingSlash` | Nettoyage de chemin. |

### Divers

| Fonction | Description |
| --- | --- |
| `sleep(ms)` | Attend le nombre de millisecondes donné. |
| `formatTimeFromSeconds(duration, options?)` | Formate une durée en `HH:MM:SS`. |
| `slideToId(id)` | Défilement en douceur vers un élément. |
| `getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)` | Distance entre deux coordonnées (Haversine). |

::: tip
Cette liste couvre les fonctions les plus utiles à la construction de sections. `@creopse/utils` expose également des enums, modèles de domaine et types partagés (`ContentModelItemModel`, `MenuItemModel`, `AppInformationKey`...) consommés en interne par les composables ci-dessus.
:::
