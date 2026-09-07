import { createHash, pbkdf2, randomBytes, timingSafeEqual } from "node:crypto";
import { getSql } from "@/lib/db";

export class StudioLockedError extends Error {
  readonly status = 401;
  constructor(message = "Studio is locked") {
    super(message);
    this.name = "StudioLockedError";
  }
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function asText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (Buffer.isBuffer(value)) return value.toString("utf8").trim();
  if (value instanceof Uint8Array) return Buffer.from(value).toString("utf8").trim();
  return String(value ?? "").trim();
}

function hashPassphrase(passphrase: string, saltHex: string): Promise<string> {
  const salt = Buffer.from(saltHex, "hex");
  return new Promise((resolve, reject) => {
    pbkdf2(passphrase, salt, 120_000, 32, "sha256", (err, derived) => {
      if (err) reject(err);
      else resolve(derived.toString("hex"));
    });
  });
}

function equalHex(left: string, right: string) {
  const a = Buffer.from(left, "hex");
  const b = Buffer.from(right, "hex");
  if (a.length === 0 || a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function studioIsClaimed() {
  const sql = await getSql();
  const rows = await sql<{ id: string }>`
    select id from studio_lock where id = 'site' limit 1
  `;
  return Boolean(rows[0]);
}

export async function passphraseMatches(passphrase: string) {
  const sql = await getSql();
  const rows = await sql<{ salt: unknown; passphrase_hash: unknown }>`
    select salt, passphrase_hash from studio_lock where id = 'site' limit 1
  `;
  const row = rows[0];
  if (!row) return false;
  const salt = asText(row.salt);
  const expectedHex = asText(row.passphrase_hash);
  const actualHex = await hashPassphrase(passphrase, salt);
  return equalHex(actualHex, expectedHex);
}

export async function issueStudioSession() {
  const sql = await getSql();
  await sql`delete from studio_sessions where expires_at < now()`;
  const token = randomBytes(32).toString("base64url");
  const token_hash = sha256(token);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  await sql.query(
    `insert into studio_sessions (token_hash, expires_at)
     values ($1, $2::timestamptz)`,
    [token_hash, expiresAt],
  );
  return token;
}

export async function requireStudioSession(token: string | undefined) {
  if (!token) throw new StudioLockedError();
  const sql = await getSql();
  const token_hash = sha256(token);
  const rows = await sql<{ token_hash: string }>`
    select token_hash from studio_sessions
    where token_hash = ${token_hash} and expires_at > now()
    limit 1
  `;
  if (!rows[0]) throw new StudioLockedError();
}

export async function sessionIsValid(token: string | undefined) {
  try {
    await requireStudioSession(token);
    return true;
  } catch {
    return false;
  }
}

export async function revokeStudioSession(token: string | undefined) {
  if (!token) return;
  const sql = await getSql();
  await sql`delete from studio_sessions where token_hash = ${sha256(token)}`;
}

export async function rotatePassphrase(next: string) {
  const sql = await getSql();
  const salt = randomBytes(16).toString("hex");
  const passphrase_hash = await hashPassphrase(next, salt);
  await sql.query(
    `insert into studio_lock (id, salt, passphrase_hash, updated_at)
     values ('site', $1, $2, now())
     on conflict (id) do update
       set salt = excluded.salt,
           passphrase_hash = excluded.passphrase_hash,
           updated_at = now()`,
    [salt, passphrase_hash],
  );
  await sql`delete from studio_sessions`;
}

export async function claimStudioPassphrase(passphrase: string) {
  const sql = await getSql();
  const salt = randomBytes(16).toString("hex");
  const passphrase_hash = await hashPassphrase(passphrase, salt);
  const inserted = await sql.query<{ id: string }>(
    `insert into studio_lock (id, salt, passphrase_hash)
     values ('site', $1, $2)
     on conflict (id) do nothing
     returning id`,
    [salt, passphrase_hash],
  );
  if (!inserted[0]) {
    throw new StudioLockedError("Studio is already claimed.");
  }
}
