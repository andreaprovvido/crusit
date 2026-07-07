create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security. Without this, the table is fully exposed through
-- PostgREST (the "RLS Disabled in Public" warning).
alter table public.waitlist enable row level security;

-- The waitlist endpoint inserts with the anon key and never reads back, so we
-- only grant INSERT. There is NO select policy, which keeps signup emails
-- private (readable only via the service role / Supabase dashboard).
drop policy if exists "Anyone can join the waitlist" on public.waitlist;
create policy "Anyone can join the waitlist"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (true);
