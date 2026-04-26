---
layout: doc
---

# Installation

## A. Avec un backend Laravel

### 1. Installer Laravel

Créez un nouveau projet Laravel :

**Laravel 10 :**

```bash
composer create-project laravel/laravel:^10.0 nom-du-projet
```

**Laravel 11 :**

```bash
composer create-project laravel/laravel:^11.0 nom-du-projet
```

**Laravel 12 :**

```bash
composer create-project laravel/laravel:^12.0 nom-du-projet
```

Remplacez `nom-du-projet` par le nom souhaité pour le répertoire de votre projet.

---

### 2. Ajouter Creopse à votre projet

Ajoutez le package Creopse via Composer :

```bash
composer require creopse/creopse
```

---

### 3. Installer les fichiers de Creopse

Exécutez la commande d'installation pour publier les fichiers de configuration et initialiser la structure frontend de votre projet.

#### Si [Creopse CLI](https://github.com/creopse/cli) est installé globalement

```bash
creopse install
```

#### Sinon, via Artisan

Pour un frontend **Vue** :

```bash
php artisan creopse:install -t vue
```

Pour un frontend **React** :

```bash
php artisan creopse:install -t react
```

:::info
Cette commande génère également un fichier `install.lock` dans `public/creopse`,
qui active le wizard de configuration au premier accès à `/creopse/`.
:::

---

### 4. Lancer le serveur de développement

Quelle que soit l'approche de configuration choisie (automatique ou manuelle ci-dessous),
cette étape est nécessaire pour compiler les assets et démarrer le rendu du site :

```bash
pnpm dev
```

---

### 5. Configuration

Deux approches sont disponibles. **Choisissez l'une ou l'autre**, pas les deux.

#### Option A — Configuration automatique (recommandée)

Naviguez vers l'interface d'administration :

```
http://votre-domaine/creopse/
```

Le wizard vous guidera pour configurer :

- L'URL du serveur.
- La connexion à la base de données.
- Le compte administrateur.

Une fois la configuration terminée, le fichier `install.lock` est supprimé automatiquement.

#### Option B — Configuration manuelle

**5.1. Configurer la base de données**

Mettez à jour votre fichier `.env` :

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nom_de_votre_base
DB_USERNAME=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
```

Puis exécutez les migrations et les seeders :

```bash
php artisan migrate --seed
```

**5.2. Supprimer le fichier `install.lock`**

Supprimez le fichier `public/creopse/install.lock` pour débloquer l'accès à l'interface
d'administration. Tant que ce fichier est présent, toute visite sur `/creopse/` est
redirigée vers le wizard d'installation.

```bash
rm public/creopse/install.lock
```

**5.3. Adapter le fichier `public/creopse/config.jsonc`**

Modifiez la valeur de `apiBaseUrl` pour qu'elle corresponde à l'URL de votre backend :

```jsonc
{
  "apiBaseUrl": "https://votre-domaine"
}
```

**5.4. Accéder à l'interface d'administration**

```
http://votre-domaine/creopse/
```

Connectez-vous avec les identifiants par défaut :

- **Nom d'utilisateur** : `admin`
- **Mot de passe** : `admin`

:::warning
Changez ces identifiants immédiatement après la première connexion.
:::

## B. Avec un backend Adonis

Le support Adonis est en cours de développement. Suivez les releases sur
[GitHub](https://github.com/creopse) pour être notifié de sa disponibilité.
