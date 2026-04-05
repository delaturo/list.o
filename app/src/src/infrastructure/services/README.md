# Services

External service integrations:
- Authentication services
- Analytics services
- Push notification services
- Storage services
- Third-party SDKs

These are implementation details that shouldn't leak into domain or presentation layers.

## Example

```typescript
// src/infrastructure/services/AuthService.ts
export class AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }

  async logout(): Promise<void> {
    await fetch('/api/auth/logout', { method: 'POST' });
  }
}
```
