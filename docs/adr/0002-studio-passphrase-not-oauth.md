# ADR-0002: Studio passphrase instead of OAuth

## Status

Accepted

## Context

Anyone can have a Google or X account. Using those to unlock the editor would let strangers publish over the CV.

## Decision

- Editor access is a **claimed passphrase** stored as PBKDF2 in `studio_lock`.
- Better Auth (Google / X / email) remains optional identity and is not consulted by `saveProfile` or the inbox.
- One `site_profile` row per database. Multi-tenant CVs would need a different product.

## Consequences

- Positive: Fork + own Neon = own CV; visiting the live URL is read-only.
- Negative: Lose the passphrase and you cannot edit until a new lock is issued by resetting that table (break-glass, not in the UI).
