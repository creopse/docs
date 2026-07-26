---
layout: doc
---

# Gestion des médias

La médiathèque centralise les images, vidéos, audios et documents du site. Un fichier importé ici peut être réutilisé sur n'importe quelle page ou dans n'importe quel modèle de contenu sans être téléversé à nouveau.

![Médiathèque](/images/screenshots/fr/light/media-library.png#light-only)
![Médiathèque](/images/screenshots/fr/dark/media-library.png#dark-only)

## Organisation

- Les onglets **Tous / Image / Vidéo / Audio / Document / Autre** filtrent par type de fichier.
- Le filtre **Mois** et le champ **Rechercher** affinent la liste.
- L'onglet **Corbeille** regroupe les fichiers supprimés (suppression réversible).

## Actions

**Ajouter** téléverse un nouveau fichier. Chaque fichier propose ensuite quatre actions : voir ses informations, le dupliquer, le modifier (nom, texte alternatif...) et le supprimer. Une case à cocher par fichier permet d'appliquer une action à plusieurs fichiers sélectionnés à la fois.

::: tip Pour les développeurs
Ces mêmes opérations sont scriptables via [`creopse media`](../resources/cli#creopse-media-alias-med) — utile pour peupler la médiathèque en lot lors de l'intégration d'un template plutôt que de téléverser chaque fichier manuellement. Un **fichier** sur disque et son **enregistrement** en base (`MediaFile`) peuvent être supprimés indépendamment l'un de l'autre.
:::

::: tip Voir aussi
Une version orientée utilisateur final de cette rubrique existe dans le [Guide Utilisateur](../../users/sections/media-library).
:::
