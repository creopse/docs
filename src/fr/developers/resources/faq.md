---
layout: doc
---

# FAQ

Questions fréquentes sur le développement de templates Creopse. Pour une question non couverte ici, consultez le reste de la [documentation développeur](../getting-started/introduction) ou [signalez un bug](https://github.com/creopse/creopse/issues).

## Sections & Widgets

### Mon bouton CTA ne mène nulle part, pourquoi ?

Si le champ est de type `menu-item-link`, le `href` doit être résolu via `getLinkFromMenuItemId(champ)` et la navigation gérée via `openLink(champ)` — jamais un `href` brut sur la valeur du champ. Voir [Liens et boutons CTA](../development/sections-widgets#liens-et-boutons-cta).

### Mon Header/Footer scaffoldé n'affiche aucun lien de navigation

Un composant Header/Footer ne fait qu'afficher les items renvoyés par `getMenuItemsByLocation('header'|'footer')` — s'il n'existe encore aucune location, menu ou item créés en base, la liste est naturellement vide. Voir [Menus](../development/menus).

### Pourquoi le carousel/modal/accordéon du template HTML source ne fonctionne plus une fois intégré ?

Aucun script JS de plugin (Bootstrap, lightbox...) ne doit rester fonctionnel dans un composant final — ces comportements sont ré-implémentés nativement (Vue/React). L'attribut `data-bs-toggle` peut rester pour le style CSS, mais plus pour le comportement. Voir [Comportements interactifs](../development/sections-widgets#comportements-interactifs).

### Comment choisir entre `text`, `i18n-text` et `i18n-editor` pour un champ ?

`text` pour tout ce qui n'est pas traduisible (URL, nom propre) ; `i18n-text` pour une chaîne traduisible courte (titre, label) ; `i18n-editor` pour toute description, quelle que soit sa longueur — jamais `i18n-textarea`. Voir [Types de champs](../development/sections-widgets#types-de-champs).

### Une même section peut-elle apparaître deux fois sur une page avec un contenu différent ?

Oui, via un `--link-id` distinct à chaque attachement (`creopse page attach-section home Hero --link-id top`, `--link-id bottom`...). Voir [Attacher des sections](../development/pages#attacher-des-sections).

## Modèles de contenu & permaliens

### Quand utiliser un modèle de contenu plutôt qu'une collection de section ?

Dès qu'un contenu suit un pattern « liste + détail » (chaque élément a sa propre page de détail) — Services, Projets, Équipe... Une simple collection de section suffit pour un contenu qui reste toujours affiché en bloc sur la même page. Voir [Quand utiliser un modèle de contenu](../development/content-models#quand-utiliser-un-modele-de-contenu).

### J'ai mis `--has-permalink true` sur mon modèle mais la page de détail renvoie une 404

Ce flag marque seulement le modèle comme éligible — il ne câble aucune route. Il faut créer le permalien séparément avec `creopse permalink add`. Voir [Permaliens](../development/permalinks).

### Comment choisir entre résoudre un permalien par `id` ou par `slug` ?

`id` par défaut pour un modèle de contenu personnalisé, sauf si un champ dédié (ex. `slug`) existe réellement dans sa structure. Pour les articles/catégories/tags de news (structure native), `slug` est l'usage idiomatique. Voir [Permaliens](../development/permalinks#choix-de-content-param).

## Pages

### Comment garder un Footer (ou un Header) strictement identique sur toutes les pages ?

Avec `creopse page set-section-source`, qui fait pointer une instance de section vers la source de données d'une autre — plutôt que de dupliquer manuellement les mêmes données sur chaque page. Voir [Partager les données entre pages](../development/pages#partager-les-donnees-entre-pages).

### Quelle différence entre désactiver une section et la détacher ?

`toggle-section-status` désactive une instance sans la retirer (utile pour une section prête mais pas encore publiée) ; `detach-section` la retire définitivement — à réserver aux erreurs d'attachement. Voir [Pages](../development/pages#activer-desactiver-ou-detacher-une-instance).

## Stack Vue vs React

### Comment choisir entre Vue et React, et peut-on changer après coup ?

Le choix se fait à l'installation (`creopse install -t vue|react`) et détermine toute la suite du développement (conventions, composants). Il n'y a pas de bascule automatique une fois le projet lancé — voir [Structure du template](../development/template-structure).

### La couverture de la documentation est-elle la même pour Vue et React ?

Les deux stacks partagent la même API (`@creopse/utils`, mêmes composables/hooks nommés à l'identique), mais les patterns Vue s'appuient sur davantage d'exemples réels que ceux React à ce stade — voir [Sections & Widgets](../development/sections-widgets).

## Divers

### Où sont documentées toutes les commandes CLI disponibles ?

Dans la [référence CLI](./cli), qui couvre `section`, `widget`, `page`, `content-model`, `permalink`, `menu`, `media` et `base-info`.

### Comment mettre à jour Creopse vers une nouvelle version ?

Voir [Mise à jour de Creopse](../development/updating-creopse).
