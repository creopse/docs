---
layout: doc
---

# Permaliens

Cette rubrique câble le préfixe d'URL public de chaque type de contenu vers la page qui le rend — sans quoi une page de détail (article, service...) n'est jamais atteignable, même déjà codée. Elle correspond côté CLI au groupe [`creopse permalink`](../../resources/cli#creopse-permalink-alias-perm).

![Permaliens des contenus](/images/screenshots/fr/light/content-permalinks.png#light-only)
![Permaliens des contenus](/images/screenshots/fr/dark/content-permalinks.png#dark-only)

## Structure du formulaire

Les permaliens sont regroupés par type de contenu, chaque groupe étant repliable :

- **News** — un bloc par type natif (Articles, Categories, Etiquettes).
- **Modèles de contenu** — un bloc par [modèle de contenu](./content-models) créé sur le site.

Chaque bloc propose trois champs :

| Champ | Rôle |
| --- | --- |
| **Préfixe du chemin** | Le segment d'URL public, ex. `/news/article`. |
| **Paramètre de contenu** | Le champ utilisé pour résoudre l'URL — `id` ou `slug` selon le type de contenu. |
| **Page de contenu** | La page qui rend ce contenu (doit déjà exister). |

Un seul bouton **Enregistrer** en haut de page applique toutes les modifications en une fois.

::: tip Pour les développeurs
`slug` est l'usage idiomatique pour les articles/catégories/étiquettes de news (champ natif) ; pour un modèle de contenu personnalisé, `id` reste le défaut sauf si un champ dédié existe réellement dans sa structure. Voir [Permaliens](../../development/permalinks) pour le détail complet, et [`creopse permalink`](../../resources/cli#creopse-permalink-alias-perm) pour scripter cette configuration via la CLI.
:::
