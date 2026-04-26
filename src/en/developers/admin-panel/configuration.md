---
layout: doc
---

# Configuration

The administration interface configuration is stored in `public/creopse/config.jsonc`.

## Configuration file structure

### API configuration

```jsonc
{
  "apiBaseUrl": "https://creopse.test"
}
```

#### `apiBaseUrl`

- **Description**: Base URL used for all API calls. For example, if your endpoint is `/users`, the full URL will be `https://creopse.test/users`.
- **Default**: `"https://creopse.test"`

---

### Development mode

```jsonc
{
  "forceDevMode": false
}
```

#### `forceDevMode`

- **Description**: Forces the application to run in development mode, even in production. This enables features such as modifying data structures in a deployed environment.
- **Default**: `false`

:::warning
Do not enable in production unless explicitly required for debugging purposes.
:::
