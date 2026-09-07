create table if not exists studio_lock (
  id text primary key,
  salt text not null,
  passphrase_hash text not null,
  updated_at timestamptz not null default now()
);

create table if not exists studio_sessions (
  token_hash text primary key,
  expires_at timestamptz not null
);

create index if not exists studio_sessions_expires_idx on studio_sessions (expires_at);
