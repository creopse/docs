---
layout: doc
---

# Configuration

Creopse provides a simple and powerful configuration system that can be easily customized to suit your needs. The configuration is stored in a `config.jsonc` file, located in the `public/creopse` folder.

## Configuration File Structure

Here is an overview of the configuration settings you can customize:

### API Configuration

The `apiBaseUrl` and `apiRequestHeaders` settings allow you to customize the API URL and any custom headers to include in each API request.

```jsonc
{
  // ==============================================
  // API Configuration
  // ==============================================

  // Base URL for the API endpoints.
  // All API requests will be made relative to this URL.
  // Example: If the endpoint is `/users`, the full URL will be `https://creopse.test/users`.
  "apiBaseUrl": "<https://creopse.test>",

  // Custom headers to include in every API request.
  // These headers are sent along with the request to authenticate or provide additional context.
  "apiRequestHeaders": {
    // API key used for authentication.
    // This key is required to access the API and should be kept secure.
    "X-API-Key": "c7fec755-9b0f-46e8-bd2b-ca16de3068bb"
  }
}
```

#### `apiBaseUrl`

- **Description**: This is the base URL for the API endpoints.
- **Default Value**: `"https://creopse.test"`
- **Usage**: This URL will be used as the root URL for all API requests. For example, if you have an API endpoint `/users`, the full URL will be `https://creopse.test/users`.

#### `apiRequestHeaders`

- **Description**: This allows you to add custom headers to every API request. Commonly used for authentication.
- **Example**: The `X-API-Key` header is included in all requests to authenticate the API.
- **Usage**: Replace the API key with your own secure key.

---

### Development Mode

The `forceDevMode` setting controls whether the application runs in development mode, even in a production environment. This is useful for enable development features.

```jsonc
{
  // ==============================================
  // Development Mode
  // ==============================================

  // Forces the application to run in development mode, even if deployed in a production environment.
  // When set to `true`, additional features may be enabled.
  "forceDevMode": false
}
```

#### `forceDevMode`

- **Description**: Forces the application to run in development mode. This setting is useful for debugging but should be turned off in production.
- **Default Value**: `false`
- **Usage**: Set to `true` if you want to enable additional debugging features. Set to `false` for production deployments.

## Where to Find the Configuration File

- The configuration file is located at `public/creopse/config.jsonc` in your project directory.
- Open this file to make adjustments to the API settings and development mode configuration.

## Conclusion

This configuration system allows you to quickly adapt Creopse to your environment. Whether you're working in development or production, you can modify the `config.jsonc` file to suit your needs.
