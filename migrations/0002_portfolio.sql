create table if not exists site_profile (
  id text primary key,
  user_id text,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id serial primary key,
  name text not null,
  email text not null,
  subject text not null default '',
  message text not null,
  created_at timestamptz not null default now()
);
