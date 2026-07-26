---
layout: doc
---

# Modèles de contenu

Cette rubrique gère les [modèles de contenu](../../development/content-models) du site — leur structure et leurs items — et correspond côté CLI au groupe [`creopse content-model`](../../resources/cli#creopse-content-model-alias-cm).

![Modèles de contenu](/images/screenshots/fr/light/content-models.png#light-only)
![Modèles de contenu](/images/screenshots/fr/dark/content-models.png#dark-only)

## Liste des modèles

Un jeu d'onglets filtre les modèles par catégorie :

- **Tous**
- **Contenu éditorial** — modèles gérés depuis l'administration (`intent: editorial-content`).
- **Entrées utilisateur** — modèles alimentés par les visiteurs du site, ex. messages de formulaire (`intent: user-data`).
- **Données système** — modèles fournis nativement par Creopse.

Un champ **Rechercher** filtre par nom. Le bouton **Ajouter un modèle de contenu** ouvre la création d'un nouveau modèle (nom, titre par langue, structure de données, champ utilisé comme titre, éligibilité à un permalien).

## Une ligne de modèle

Chaque modèle affiche :

- **Structure de données** — édite les champs du modèle (équivalent de `--data-structure` en CLI).
- Icône crayon — modifie les informations générales du modèle (titre, description...).
- Icône corbeille — supprime le modèle.
- Le nom du modèle.
- Deux étiquettes : son `intent` (ex. « Contenu éditorial ») et son `access-scope` (ex. « Interne (système + administration) ») — voir [Modèles de contenu](../../development/content-models#intent-et-access-scope) pour le détail de ces valeurs.
- **Ouvrir** — accède à la liste des items du modèle (création, édition, suppression d'items).

::: tip Pour les développeurs
La création de modèles et d'items peut aussi être scriptée via la CLI — voir [`creopse content-model`](../../resources/cli#creopse-content-model-alias-cm). Un modèle avec une page de détail doit ensuite être câblé via un [permalien](./permalinks).
:::

::: tip Voir aussi
Une version orientée utilisateur final de cette rubrique existe dans le [Guide Utilisateur](../../../users/sections/content-management).
:::
