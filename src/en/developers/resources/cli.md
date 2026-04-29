---
layout: doc
---

# Command-Line Interface

A command-line utility for managing section and widget components (Vue or React) in the Creopse ecosystem.

## Requirements

- Laravel or Adonis project with Creopse installed

## Installation

```bash
npm install -g @creopse/cli
```

## Usage

```bash
creopse [command] [options]
```

## Available Commands

### `creopse install`

Installs the Creopse package in your Laravel or Adonis project. If `--template` is not specified, the CLI will prompt you to choose before proceeding.

**Options:**

- `-t, --template <template>` – Selects the frontend template (vue or react).
- `--no-force` – Disable force mode (enabled by default).

---

### `creopse section`

Manage section components (Vue or React).

#### `creopse section add <name...>`

Add one or more section components to `resources/js/components/sections`, automatically creating their database entries if they do not exist.

#### `creopse section remove <name...>`

Remove one or more section components, automatically deleting their database entries if they exist.

---

### `creopse widget`

Manage widget components (Vue or React).

#### `creopse widget add <name...>`

Add one or more widget components to `resources/js/components/widgets`.

#### `creopse widget remove <name...>`

Remove one or more widget component files.

## Examples

```bash
# Install the package
creopse install

# Add a section
creopse section add HeroBanner

# Remove a section and its DB record
creopse section remove HeroBanner

# Add a widget
creopse widget add NewsletterForm

# Remove a widget
creopse widget remove NewsletterForm

# Add multiple sections at once
creopse section add HeroBanner ContactForm Footer
```
