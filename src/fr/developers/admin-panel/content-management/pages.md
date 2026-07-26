---
layout: doc
---

# Pages

Cette rubrique (repérable dans le menu latéral sous l'intitulé **Sections de page**) gère les pages du site et l'assemblage de leurs sections. Elle correspond côté CLI au groupe [`creopse page`](../../resources/cli#creopse-page-alias-pag).

![Pages](/images/screenshots/fr/light/page-management.png#light-only)
![Pages](/images/screenshots/fr/dark/page-management.png#dark-only)

## Liste des pages

Un champ **Filtrer les pages** permet de rechercher une page par nom dans la liste. En bas de liste :

- **Ajouter une page** — crée une nouvelle page (titre par langue, position d'affichage).
- **Réorganiser les pages** — modifie l'ordre des pages dans la liste (n'affecte pas leur URL).

## Détail d'une page

En sélectionnant une page dans la liste :

- **Modifier la page** — édite le titre (par langue), le contenu et la position de la page.
- **Supprimer** — supprime la page.
- **Ouvrir l'éditeur visuel** — bascule vers l'[éditeur visuel](./visual-editor) pour cette page.

### Sections attachées

Chaque section attachée à la page apparaît dans une liste ordonnée, avec :

- une poignée de réordonnancement (glisser-déposer) ;
- une case à cocher **Afficher** — active/désactive l'instance sans la détacher (équivalent de `creopse page toggle-section-status`) ;
- le nom de la section ;
- un bouton **Données & Paramètres** — édite les données et réglages de cette instance précise de section ;
- un compteur (« X Section(s) ») en bas de liste.

Le bloc **Insérer ou retirer des sections** permet d'attacher une nouvelle instance de section à la page, ou d'en détacher une existante.

::: tip Pour les développeurs
La création de pages et l'attachement de sections (avec `link-id`, ordre, activation) peuvent aussi être scriptés via la CLI — voir [Pages](../../development/pages) et le détail du fonctionnement des sections dans [Sections & Widgets](../../development/sections-widgets).
:::

::: tip Voir aussi
Une version orientée utilisateur final de cette rubrique existe dans le [Guide Utilisateur](../../../users/sections/content-management).
:::
