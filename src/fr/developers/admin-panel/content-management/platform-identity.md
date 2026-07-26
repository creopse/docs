---
layout: doc
---

# Identité de la plateforme

Cette page regroupe les informations globales du site — celles consommées dans les templates via `getAppInformationValue()` (voir [Utilitaires](../../development/utilities#usecontent)) plutôt que définies dans une structure de section. Elle comporte trois onglets : **Informations de base**, **Identité visuelle** et **Réseaux sociaux**.

## Informations de base

![Informations de base](/images/screenshots/fr/light/basic-information.png#light-only)
![Informations de base](/images/screenshots/fr/dark/basic-information.png#dark-only)

| Champ | Description |
| --- | --- |
| Nom du site | Nom affiché de la plateforme (clé `name`). |
| Email | Adresse de contact principale (clé `email`). |
| Téléphone | Numéro de contact principal (clé `phone`). |
| Adresse | Adresse physique (clé `address`). |
| Code postal | Code postal associé (clé `postalCode`). |
| Description | Présentation courte du site, traduisible par langue via le sélecteur en haut du champ (clé `description`). |

## Identité visuelle

Onglet dédié aux médias et couleurs de marque : logo, logo monochrome, icône/favicon, icône monochrome, et couleurs primaire, secondaire et d'accent (clés `logo`, `oneColorLogo`, `icon`, `oneColorIcon`, `primaryColor`, `secondaryColor`, `accentColor`). Ces valeurs alimentent notamment `appPrimaryColor`/`appSecondaryColor`/`appAccentColor`/`logo`/`icon` côté `useContent()`.

## Réseaux sociaux

Un champ URL par réseau social supporté — ne renseigner que les réseaux réellement utilisés par le site, un champ vide n'affiche pas l'icône correspondante dans le Header/Footer :

```
facebook, twitter, instagram, whatsapp, linkedin, youtube, pinterest, snapchat,
tiktok, telegram, discord, reddit, tumblr, vimeo, twitch, github, dribbble,
behance, medium, stackOverflow, threads, messenger, playstore, appstore
```

::: tip Pour les développeurs
Ces valeurs peuvent aussi être renseignées en ligne de commande via [`creopse base-info update`](../../resources/cli#creopse-base-info-alias-info) — pratique pour les peupler automatiquement lors de l'intégration d'un template plutôt que de repasser par cette page manuellement.
:::
