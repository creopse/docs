---
layout: doc
---

# Getting Started

Welcome to the **Creopse** documentation! This guide will help you get started with Creopse, a hybrid Content Management System (CMS) built on Laravel 10. Follow the steps below to quickly set up and begin using Creopse.

## Requirements

Before installing Creopse, ensure your environment meets the following prerequisites:

- Laravel 10
- PHP 8.1 or higher
- Composer
- pnpm

## Installation

### 1. Install Laravel

To start, create a fresh Laravel project:

```bash
composer create-project laravel/laravel:^10.0 project-name
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

Run the following Artisan command to publish the necessary configuration files and resources:

```bash
php artisan creopse:install
```

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
- [API Reference](./api/index.md): Understand the available endpoints and APIs for your project.

**Ready to dive deeper? Start customizing your Creopse CMS today!**
