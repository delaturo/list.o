# Config

Application configuration files:
- Environment variables
- App settings
- Feature flags
- API endpoints configuration

## Example

```typescript
// src/config/appConfig.ts
export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 10000,
  },
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    darkMode: true,
  },
};
```
