---
layout: doc
---

# Interface en ligne de commande

Un utilitaire en ligne de commande pour gérer les composants de sections et de widgets (Vue ou React) dans l'écosystème Creopse.

## Prérequis

- Projet Laravel ou Adonis avec Creopse installé

## Installation

```bash
npm install -g @creopse/cli
```

## Utilisation

```bash
creopse [commande] [options]
```

## Commandes disponibles

### `creopse install`

Installe le package Creopse dans votre projet Laravel ou Adonis. Si `--template` n'est pas précisé, la CLI vous invite à choisir le template avant de poursuivre.

**Options :**

- `-t, --template <template>` – Sélectionne le template frontend (vue ou react).
- `--no-force` – Désactive le mode force (activé par défaut).

---

### `creopse section`

Gère les composants de sections (Vue ou React).

#### `creopse section add <name...>`

Ajoute un ou plusieurs composants de sections dans `resources/js/components/sections`, en créant automatiquement leurs entrées en base de données si elles n'existent pas.

#### `creopse section remove <name...>`

Supprime un ou plusieurs composants de sections, en supprimant automatiquement leurs entrées en base de données si elles existent.

---

### `creopse widget`

Gère les composants de widgets (Vue ou React).

#### `creopse widget add <name...>`

Ajoute un ou plusieurs composants de widgets dans `resources/js/components/widgets`.

#### `creopse widget remove <name...>`

Supprime un ou plusieurs fichiers de composants de widgets.

## Exemples

```bash
# Installer le package
creopse install

# Ajouter une section
creopse section add HeroBanner

# Supprimer une section et son entrée en base de données
creopse section remove HeroBanner

# Ajouter un widget
creopse widget add NewsletterForm

# Supprimer un widget
creopse widget remove NewsletterForm

# Ajouter plusieurs sections en une fois
creopse section add HeroBanner ContactForm Footer
```
