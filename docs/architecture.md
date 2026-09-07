# Architecture

```text
Browser
  │  public pages, PDF (client)
  │  Studio session token
  ▼
TanStack Start (Vite + Nitro / Vercel)
  │  server functions
  ▼
Postgres  ── Neon when DATABASE_URL is set
          └── PGLite WASM otherwise
```

## Profile

One JSON document (`site_profile.id = 'site'`) validated with Zod in [`src/lib/profile.ts`](../src/lib/profile.ts). Public `getProfile` reads it; `saveProfile` requires Studio middleware.

## Studio lock

Tables in [`migrations/0003_studio_lock.sql`](../migrations/0003_studio_lock.sql):

- `studio_lock` — salt + PBKDF2 hash of the owner passphrase
- `studio_sessions` — SHA-256 of a random token, expiry

Server logic: [`src/lib/studio-lock.server.ts`](../src/lib/studio-lock.server.ts). UI never sees the hash.

## Optional identity

Better Auth at `/api/auth/*` can sign people in with Google / X / email. That identity is **not** wired to `saveProfile`. See [ADR-0002](adr/0002-studio-passphrase-not-oauth.md).

## Routes

| Path | Role |
| --- | --- |
| `/` | Public CV |
| `/work/$projectId` | Case study |
| `/studio` | Claim / unlock / editor |
| `/login` | Optional identity |
| `/api/auth/*` | Better Auth |

## Deploy

Nitro preset `vercel`. `scripts/migrate.mjs` applies SQL files when `DATABASE_URL` is present.
