---
layout: doc
---

# Getting Started

Welcome to the **Creopse** documentation! This guide will help you get started with Creopse, a hybrid Content Management System (CMS) built on Laravel. Follow the steps below to quickly set up and begin using Creopse.

## Requirements

Before installing Creopse, ensure your environment meets the following prerequisites:

### System Requirements

- **Laravel**: Version 10, 11, or 12 is required.
- **PHP**:
  - Laravel 10: minimum version 8.1
  - Laravel 11 & 12: minimum version 8.2
- **Composer**: To manage dependencies.
- **pnpm**: Required to manage and build frontend assets.

### Knowledge Requirements

Since **Creopse** is a **hybrid Content Management System (CMS)** built on **Laravel** and **Inertia.js**, you should be familiar with:

- **Laravel**: Understanding of routing, middleware, migrations, and Eloquent ORM.
- **Inertia.js**: Knowledge of how it bridges Laravel (backend) with a modern frontend framework.
- **Vue.js 3 or React**: You can use **either** Vue 3 or React as the frontend framework with Inertia.js.

If you're new to **Inertia.js**, **Vue.js**, or **React**, it's recommended to review their documentation before diving into Creopse:

- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com)
- [Vue.js 3 Documentation](https://vuejs.org)
- [React Documentation](https://react.dev)

With these prerequisites in place, you'll be ready to install and use **Creopse** efficiently!

## Installation

### 1. Install Laravel

To start, create a fresh Laravel project:

**For Laravel 10:**

```bash
composer create-project laravel/laravel:^10.0 project-name
```

**For Laravel 11:**

```bash
composer create-project laravel/laravel:^11.0 project-name
```

**For Laravel 12:**

```bash
composer create-project laravel/laravel:^12.0 project-name
```

Replace `project-name` with the desired name for your project directory.

---

### 2. Add Creopse to Your Project

Next, install the Creopse package using Composer:

```bash
composer require creopse/creopse
```

This will add Creopse to your Laravel project.

---

### 3. Install Creopse Files

Next, publish Creopse's configuration and files by running the following command:

**For using Creopse with Vue template:**

```bash
php artisan creopse:install -t vue
```

**Or with React template:**

```bash
php artisan creopse:install -t react
```

This command will:

- Publish necessary configuration files.
- Set up essential Creopse directories and resources for vue or react frontend.

---

### 4. Configure the Database

Update your `.env` file with your database connection details:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

After updating the `.env` file, migrate the database and seed the initial data:

```bash
php artisan migrate --seed
```

---

### 5. Start the Development Server

To compile frontend assets and start the development server, use:

```bash
pnpm dev
```

---

### 6. Access the Admin Panel

Once the setup is complete, you can access the Creopse Admin Panel by navigating to:

<http://your-domain/creopse/login>

Log in using the credentials you configured (or the default credentials if provided during installation).

## What’s Next?

Explore the following sections to learn more about Creopse:

- [Configuration](./configuration.md): Customize Creopse settings to suit your needs.
- [API Reference](./advanced/api-usage.md): Understand the available endpoints and APIs for your project.

**Ready to dive deeper? Start customizing your Creopse CMS today!**
