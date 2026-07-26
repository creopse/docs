---
layout: doc
---

# Gestion d'accès

Définissez qui peut faire quoi dans l'interface d'administration, à travers deux notions complémentaires : les **rôles** et les **permissions**.

## Rôles

Un rôle regroupe un ensemble de permissions et se distribue aux utilisateurs (voir [Gestion des utilisateurs](./user-management)). Trois rôles existent par défaut : **Super Administrateur** (accès total), **Administrateur** (gestion opérationnelle, sans accès aux paramètres les plus sensibles) et **Utilisateur** (accès standard). Le bouton **Ajouter un rôle** permet d'en créer un nouveau, et **Gérer les permissions** d'ajuster la liste globale des permissions disponibles.

![Rôles](/images/screenshots/fr/light/roles.png#light-only)
![Rôles](/images/screenshots/fr/dark/roles.png#dark-only)

## Permissions

Une permission autorise une action précise (ex. « Utiliser l'éditeur visuel », « Gérer les extensions »). Chaque permission a un nom technique et un contexte (ex. **Admin**). **Ajouter une permission** en crée une nouvelle.

![Permissions](/images/screenshots/fr/light/permissions.png#light-only)
![Permissions](/images/screenshots/fr/dark/permissions.png#dark-only)

::: tip
Modifiez les permissions d'un rôle avec précaution — cela affecte immédiatement tous les utilisateurs auxquels ce rôle est attribué.
:::
