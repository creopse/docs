---
layout: doc
---

# Gestion des utilisateurs et rôles

Cette rubrique gère les comptes ayant accès à l'interface d'administration, ainsi que les rôles et permissions qui déterminent ce que chacun peut y faire.

## Utilisateurs

![Gestion des utilisateurs](/images/screenshots/fr/light/user-management.png#light-only)
![Gestion des utilisateurs](/images/screenshots/fr/dark/user-management.png#dark-only)

La liste affiche, pour chaque utilisateur, son avatar, son nom, son type de compte, ses rôles et son email.

- **Ajouter** crée un nouveau compte utilisateur.
- **Importer**/**Exporter** permettent de gérer plusieurs comptes à la fois via un fichier.
- Le champ **Rechercher** retrouve un utilisateur précis.

## Rôles

Un rôle regroupe un ensemble de permissions et se distribue aux utilisateurs. Trois rôles existent par défaut :

| Rôle | Portée |
| --- | --- |
| **Super Administrateur** | Accès total au système, y compris la gestion des autres administrateurs. |
| **Administrateur** | Gestion opérationnelle du système, sans accès aux paramètres les plus sensibles. |
| **Utilisateur** | Accès standard aux fonctionnalités publiques et personnelles. |

![Rôles](/images/screenshots/fr/light/roles.png#light-only)
![Rôles](/images/screenshots/fr/dark/roles.png#dark-only)

**Ajouter un rôle** en crée un nouveau ; **Gérer les permissions** ouvre la liste globale des permissions disponibles.

## Permissions

Une permission autorise une action précise (ex. `use-visual-editor`, `manage-plugins`), avec un nom technique, une description et un contexte (ex. **Admin**).

![Permissions](/images/screenshots/fr/light/permissions.png#light-only)
![Permissions](/images/screenshots/fr/dark/permissions.png#dark-only)

::: warning
Modifier les permissions d'un rôle affecte immédiatement tous les utilisateurs auxquels ce rôle est attribué — sur un environnement en production, valider ce type de changement avec précaution.
:::

::: tip Voir aussi
Des versions orientées utilisateur final existent dans le Guide Utilisateur : [Gestion des utilisateurs](../../users/sections/user-management) et [Gestion d'accès](../../users/sections/access-management).
:::
