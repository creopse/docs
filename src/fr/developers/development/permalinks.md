---
layout: doc
---

# Permaliens

Un permalien associe un préfixe d'URL public à un contenu — un item de [modèle de contenu](./content-models), ou un type de contenu natif (article, catégorie ou tag de news) — et, optionnellement, à la [page](./pages) qui le rend. C'est une entité à part entière, distincte du modèle de contenu lui-même.

::: warning
`creopse content-model add --has-permalink true` marque seulement un modèle comme **éligible** à un permalien — cela ne câble aucune route. Sans un permalien réellement créé, `getContentPath(item)` ne mène jamais à une page de détail, même une fois celle-ci parfaitement codée et attachée.
:::

Voir la [référence CLI](../resources/cli#creopse-permalink-alias-perm) pour la syntaxe complète.

## Types de contenu ciblés

| `content-type` | Cible |
| --- | --- |
| `content-model` | Un item d'un modèle de contenu créé via `creopse content-model add`. |
| `news-article` | Un article de news natif. |
| `news-category` | Une catégorie de news native. |
| `news-tag` | Un tag de news natif. |

Un permalien `news-*` n'est utile que si le template a effectivement une page de listing ou de détail dédiée à ce type de contenu — ne pas en créer par réflexe.

## Choix de `--content-param`

Détermine quel champ de l'item cible est utilisé pour résoudre l'URL :

| `content-type` | Valeurs possibles | Comment choisir |
| --- | --- | --- |
| `content-model` | `id` (défaut), ou tout champ défini dans la structure du modèle | `id` par défaut ; utiliser un champ dédié (ex. `slug`) uniquement s'il existe réellement dans la structure du modèle. |
| `news-article` / `news-category` / `news-tag` | `id` ou `slug` | `slug` est l'usage idiomatique pour une URL lisible — disponible nativement sur ces modèles. |

## Créer un permalien

```bash
# Un modèle de contenu, résolu par id (défaut)
creopse permalink add /services content-model --content-id service --page service-details

# Les articles de news, résolus par slug
creopse permalink add /actualites news-article --content-param slug --page news-details
```

- `<path-prefix>` : préfixe d'URL public (ex. `/services/mon-item`).
- `--content-id` : requis uniquement pour `content-type=content-model` — nom ou id du modèle.
- `--page` : nom de la page de détail créée au préalable qui rend ce contenu.

## Modifier ou supprimer un permalien

```bash
creopse permalink edit --path-prefix /services --new-path-prefix /nos-services
creopse permalink remove --content-model service --force
```

`edit`/`remove` identifient la cible avec exactement un de `--id`, `--path-prefix`, ou `--content-model`. Le contenu ciblé (`content-type`/`content-id`) ne peut pas être changé une fois fixé — supprimer et recréer le permalien plutôt que de tenter de le réassigner.

## Résolution côté composant

```ts
const { getContentPath } = useContent()

const href = getContentPath(item) // item : ContentModelItemModel | NewsArticleModel | ...
```

Voir [Utilitaires](./utilities#usecontent) pour la signature complète de `getContentPath` et des autres membres de `useContent()`.

::: tip
Ce câblage se fait aussi depuis l'interface d'administration — voir [Permaliens](../admin-panel/content-management/permalinks).
:::
