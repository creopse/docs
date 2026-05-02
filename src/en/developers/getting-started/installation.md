---
layout: doc
---

# Installation

## With a Laravel backend

### 1. Install Laravel

Create a new Laravel project:

**Laravel 10:**

```bash
composer create-project laravel/laravel:^10.0 project-name
```

**Laravel 11:**

```bash
composer create-project laravel/laravel:^11.0 project-name
```

**Laravel 12:**

```bash
composer create-project laravel/laravel:^12.0 project-name
```

**Laravel 13:**

```bash
composer create-project laravel/laravel:^13.0 project-name
```

---

### 2. Add Creopse to your project

Add the Creopse package via Composer:

```bash
composer require creopse/creopse
```

---

### 3. Install Creopse files

Run the install command to publish the configuration files and initialize the frontend
structure of your project.

#### If [Creopse CLI](../resources/cli) is installed globally

```bash
creopse install
```

#### Otherwise, via Artisan

For a **Vue** frontend:

```bash
php artisan creopse:install -t vue
```

For a **React** frontend:

```bash
php artisan creopse:install -t react
```

:::info
This command also generates an `install.lock` file in `public/creopse`,
which activates the configuration wizard on first access to `/creopse/`.
:::

---

### 4. Start the development server

Regardless of the configuration approach chosen (automatic or manual below),
this step is required to compile assets and start rendering the site:

```bash
pnpm dev
```

---

### 5. Configuration

Two approaches are available. **Choose one or the other**, not both.

#### Option A — Automatic configuration (recommended)

Navigate to the administration interface:

```
http://your-domain/creopse/
```

The wizard will guide you through configuring:

- The server URL.
- The database connection.
- The administrator account.

Once configuration is complete, the `install.lock` file is deleted automatically.

#### Option B — Manual configuration

**5.1. Configure the database**

Update your `.env` file:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Then run the migrations and seeders:

```bash
php artisan migrate --seed
```

**5.2. Delete the `install.lock` file**

Delete `public/creopse/install.lock` to unlock access to the administration interface.
As long as this file is present, any visit to `/creopse/` is redirected to the
installation wizard.

```bash
rm public/creopse/install.lock
```

**5.3. Update `public/creopse/config.jsonc`**

Set the `apiBaseUrl` value to match your backend URL:

```jsonc
{
  "apiBaseUrl": "https://your-domain"
}
```

**5.4. Access the administration interface**

```
http://your-domain/creopse/
```

Log in with the default credentials:

- **Username**: `admin`
- **Password**: `admin`

:::warning
Change these credentials immediately after your first login.
:::

## With an Adonis backend

Adonis support is currently in development. Follow the releases on
[GitHub](https://github.com/creopse) to be notified when it becomes available.
