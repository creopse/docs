---
layout: doc
---

# Introduction

## What is Creopse?

**Creopse** is a hybrid and extensible CMS built around a **Laravel** or **Adonis** backend
coupled with a **Vue.js 3** or **React** frontend via **Inertia.js**. It ships with both an
integrated front-end for building interfaces quickly, and a REST API for delivering content
to any external client.

### Why "hybrid"?

Traditional CMS platforms (WordPress, Drupal) tightly couple rendering and data: the frontend
and backend share the same process. Headless CMS platforms take the opposite approach: they
drop the front-end entirely and expose only an API. Creopse takes the best of both:

- An **integrated front-end** to deploy a full website without a separate infrastructure.
- A **REST API** to feed mobile applications, third-party integrations, or any decoupled client.

### Extensible by design

Creopse is built on a plugin architecture: any new feature can be encapsulated, distributed,
and installed independently, without touching the core system.

## Prerequisites

### System requirements

**With a Laravel backend:**

- **Laravel**: version 10, 11, or 12.
- **PHP**:
  - Laravel 10: 8.1 minimum.
  - Laravel 11 & 12: 8.2 minimum.
- **Composer**: PHP dependency management.
- **pnpm**: frontend asset compilation and management.

**With an Adonis backend:** *(coming soon)*

### Recommended knowledge

Creopse builds on existing tools — familiarity with the following concepts will ease
the learning curve:

- **Laravel or Adonis**: routing, middlewares, migrations, ORM.
- **Inertia.js**: the bridge between the backend and the frontend framework.
- **Vue.js 3 or React**: client-side rendering and state management.

Reference documentation:

- [Laravel](https://laravel.com/docs)
- [Adonis](https://adonisjs.com)
- [Inertia.js](https://inertiajs.com)
- [Vue.js 3](https://vuejs.org)
- [React](https://react.dev)

## Next steps

- [Core concepts](./core-concepts.md): the fundamentals of Creopse's architecture.
- [Installation](./installation.md): setting up the environment and getting started.
