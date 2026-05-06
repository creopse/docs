---
layout: doc
---

# Configuration

Creopse allows you to configure both the administration panel and the backend. These configurations are stored in separate files.

## Administration panel configuration

The administration panel configuration is stored in the `public/creopse/config.jsonc` file.

### Configuration file structure

#### API configuration

```jsonc
{
  "apiBaseUrl": "https://creopse.test"
}
```

##### `apiBaseUrl`

- **Description**: Base URL used for all API calls. For example, if your endpoint is `/users`, the full URL will be `https://creopse.test/users`.
- **Default value**: `"https://creopse.test"`

---

#### Development mode

```jsonc
{
  "forceDevMode": false
}
```

##### `forceDevMode`

- **Description**: Forces the application to run in development mode, even in production. In particular, this allows modifying the data structures of all content elements in the administration panel within a deployed environment.
- **Default value**: `false`

:::warning
Do not enable in production unless explicitly required for debugging purposes.
:::

## Backend configuration

The backend configuration is stored in the `config/creopse.php` file via Laravel.

### Configuration file structure

#### User model

```php
return [
  'user_model' => \App\Models\User::class,
]
```

##### `user_model`

- **Description**: Specifies the user model class used by the package. Typically required for authentication, relationships, or any other functionality tied to the user entity.
- **Default value**: `\App\Models\User::class`

---

#### Seeding default data

```php
return [
  'seed_default_data' => true,
]
```

##### `seed_default_data`

- **Description**: Determines whether the package should seed the database with default data when running migrations or seeders. The data included are: the default user, default content, base permalinks, and default settings. Set this to `false` to disable this behavior, for example if you want to run your own seeds after initialization.
- **Default value**: `true`

---

#### Rate limiting

```php
return [
  'rate_limit' => env('CREOPSE_RATE_LIMIT', 600),

  'rate_limit_by' => 'ip',
]
```

##### `rate_limit`

- **Description**: Defines the maximum number of requests allowed per minute for routes or features protected by rate limiting. This value can be overridden by the `CREOPSE_RATE_LIMIT` environment variable.
- **Default value**: `600`

##### `rate_limit_by`

- **Description**: Defines the criteria used to apply rate limiting. Available options are:
  - `'ip'`: Rate limiting by client IP address.
  - `'user'`: Rate limiting by authenticated user.
- **Default value**: `'ip'`

---

#### HTTP response compression

Controls automatic HTTP response compression. When enabled, the middleware negotiates the best available algorithm (Brotli > Gzip > Deflate) based on the client's `Accept-Encoding` header. Brotli requires the `ext-brotli` PECL extension and an HTTPS connection. Gzip and Deflate require the `ext-zlib` extension (bundled with PHP by default).

```php
return [
  'compression' => [

    'enabled' => env('CREOPSE_COMPRESSION', true),

    'level' => env('CREOPSE_COMPRESSION_LEVEL', 5),

    'min_length' => env('CREOPSE_COMPRESSION_MIN_LENGTH', 1024),

  ],
]
```

##### `compression.enabled`

- **Description**: Enables or disables response compression entirely. Set this to `false` if compression is already handled upstream (Nginx, Caddy, CloudFront...).
- **Default value**: `true`

##### `compression.level`

- **Description**: Compression level applied across all algorithms. Gzip / Deflate accept a value between `0` (no compression) and `9` (maximum). Brotli between `0` and `11`. Level `5` is the recommended sweet spot for real-time PHP responses — higher levels yield diminishing returns and increase CPU load.
- **Default value**: `5`

##### `compression.min_length`

- **Description**: Minimum response size (in bytes) required to trigger compression. Compressing small payloads is counterproductive: the overhead of compression headers alone can outweigh any size reduction achieved.
- **Default value**: `1024`

---

## Environment variables

Summary of all environment variables exposed by Creopse.

| Variable                         | Associated config            | Default value |
| -------------------------------- | ---------------------------- | ------------- |
| `CREOPSE_RATE_LIMIT`             | `rate_limit`                 | `600`         |
| `CREOPSE_COMPRESSION`            | `compression.enabled`        | `true`        |
| `CREOPSE_COMPRESSION_LEVEL`      | `compression.level`          | `5`           |
| `CREOPSE_COMPRESSION_MIN_LENGTH` | `compression.min_length`     | `1024`        |
