-- Crusit user profiles (usernames).
-- Run this in the Supabase SQL Editor after supabase/spots.sql.
--
-- Each row extends an auth.users record with a public username. Usernames are
-- unique case-insensitively and are the ONLY identity shown publicly (on
-- reviews and ratings). Emails are never exposed publicly.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Case-insensitive uniqueness (so "John" and "john" cannot coexist).
create unique index if not exists profiles_username_lower_key
  on public.profiles (lower(username));

-- Allowed format: 3–20 chars, letters/numbers/underscore.
alter table public.profiles drop constraint if exists profiles_username_format;
alter table public.profiles add constraint profiles_username_format
  check (username ~ '^[A-Za-z0-9_]{3,20}$');

create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.set_profiles_updated_at();

alter table public.profiles enable row level security;

-- Usernames are public (needed to display them on reviews).
drop policy if exists "Profiles are public" on public.profiles;
create policy "Profiles are public"
  on public.profiles
  for select
  to anon, authenticated
  using (true);

-- Users can create their own profile row.
drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

-- Users can update their own profile (e.g. change username).
drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);
