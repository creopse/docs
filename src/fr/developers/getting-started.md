---
layout: doc
---

# Pour commencer

Bienvenue dans la documentation de **Creopse** ! Ce guide vous aidera à démarrer avec Creopse, un système de gestion de contenu (CMS) hybride basé sur Laravel. Suivez les étapes ci-dessous pour installer et commencer à utiliser Creopse rapidement.

## Prérequis

Avant d'installer Creopse, assurez-vous que votre environnement remplit les conditions suivantes :

### Configuration système

- **Laravel**: La version 10, 11 ou 12 est requise.
- **PHP**:
  - Laravel 10: version minimale 8.1
  - Laravel 11 & 12: version minimale 8.2
- **Composer**: Pour gérer les dépendances.
- **pnpm**: Nécessaire pour gérer et builder les assets frontend.

### Connaissances requises

Étant donné que **Creopse** est un **système de gestion de contenu hybride (CMS)** basé sur **Laravel** et **Inertia.js**, il est recommandé d’avoir des connaissances sur :

- **Laravel** : Compréhension du routage, des middlewares, des migrations et de l’ORM Eloquent.
- **Inertia.js** : Savoir comment il connecte Laravel (backend) avec un framework frontend moderne.
- **Vue.js 3 ou React** : Vous pouvez utiliser **Vue 3 ou React** comme framework frontend avec Inertia.js.

Si vous débutez avec **Inertia.js**, **Vue.js** ou **React**, il est conseillé de consulter leur documentation avant d'utiliser Creopse :

- [Documentation Laravel](https://laravel.com/docs)
- [Documentation Inertia.js](https://inertiajs.com)
- [Documentation Vue.js 3](https://vuejs.org)
- [Documentation React](https://react.dev)

Avec ces prérequis en place, vous serez prêt à installer et utiliser **Creopse** efficacement !

## Installation

### 1. Installer Laravel

Pour commencer, créez un nouveau projet Laravel :

**Pour Laravel 10:**

```bash
composer create-project laravel/laravel:^10.0 nom-du-projet
```

**Pour Laravel 11:**

```bash
composer create-project laravel/laravel:^11.0 nom-du-projet
```

**Pour Laravel 12:**

```bash
composer create-project laravel/laravel:^12.0 nom-du-projet
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

Pour mettre en place Creopse dans votre projet, exécutez la commande suivante pour publier sa configuration et les fichiers requis :

#### Si [Creopse CLI] (<https://github.com/creopse/cli>) est installé globalement

```bash
creopse install
```

#### Sinon, utilisez la commande Laravel Artisan

- Pour un frontend **Vue**:

```bash
php artisan creopse:install -t vue
```

- Pour un frontend **React:**

```bash
php artisan creopse:install -t react
```

Cette commande va :

- Publier les fichiers de configuration nécessaires.
- Configurer les répertoires et ressources essentiels de Creopse pour le frontend vue ou react.

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
- [Référence API](./development/api-endpoints.md) : Découvrez les endpoints et les APIs disponibles pour votre projet.

**Prêt à aller plus loin ? Commencez dès aujourd'hui à personnaliser votre CMS Creopse !**
