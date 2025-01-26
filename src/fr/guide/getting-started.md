---
layout: doc
---

# Pour commencer

Bienvenue dans la documentation de **Creopse** ! Ce guide vous aidera à démarrer avec Creopse, un système de gestion de contenu (CMS) hybride basé sur Laravel 10. Suivez les étapes ci-dessous pour installer et commencer à utiliser Creopse rapidement.

## Prérequis

Avant d'installer Creopse, assurez-vous que votre environnement remplit les conditions suivantes :

- Laravel 10
- PHP 8.1 ou supérieur
- Composer
- pnpm

## Installation

### 1. Installer Laravel

Pour commencer, créez un nouveau projet Laravel :

```bash
composer create-project laravel/laravel:^10.0 nom-du-projet
```

Remplacez `nom-du-projet` par le nom souhaité pour le répertoire de votre projet.

---

### 2. Ajouter Creopse à Votre Projet

Ensuite, ajoutez le package Creopse à votre projet Laravel avec Composer :

```bash
composer require creopse/creopse
```

Cela ajoutera Creopse à votre projet Laravel.

---

### 3. Installer les Fichiers de Creopse

Exécutez la commande Artisan suivante pour publier les fichiers de configuration et les ressources nécessaires :

```bash
php artisan creopse:install
```

---

### 4. Configurer la Base de Données

Mettez à jour votre fichier `.env` avec les informations de connexion à votre base de données :

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nom_de_votre_base
DB_USERNAME=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
```

Après avoir mis à jour le fichier `.env`, exécutez les migrations et insérez les données initiales :

```bash
php artisan migrate --seed
```

---

### 5. Lancer le Serveur de Développement

Pour compiler les ressources frontend et démarrer le serveur de développement, utilisez :

```bash
pnpm dev
```

---

### 6. Accéder au Panneau d'Administration

Une fois l'installation terminée, vous pouvez accéder au panneau d'administration de Creopse en naviguant à l'adresse suivante :

<http://votre-domaine/creopse/login>

Connectez-vous avec les identifiants que vous avez configurés (ou les identifiants par défaut si fournis lors de l'installation).

## Et Après ?

Explorez les sections suivantes pour en savoir plus sur Creopse :

- [Configuration](./configuration.md) : Personnalisez les paramètres de Creopse selon vos besoins.
- [Référence API](./api/index.md) : Découvrez les points de terminaison et les APIs disponibles pour votre projet.

**Prêt à aller plus loin ? Commencez dès aujourd'hui à personnaliser votre CMS Creopse !**
