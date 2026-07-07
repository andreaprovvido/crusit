-- Crusit review likes.
-- Run this in the Supabase SQL Editor after supabase/spots.sql.
--
-- Adds a per-review like system: authenticated users can like a review once.
-- A denormalized like_count on reviews keeps sorting ("most liked") fast.

alter table public.reviews
  add column if not exists like_count integer not null default 0;

create table if not exists public.review_likes (
  review_id uuid not null references public.reviews (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (review_id, user_id)
);

create index if not exists review_likes_review_id_idx on public.review_likes (review_id);
create index if not exists review_likes_user_id_idx on public.review_likes (user_id);
create index if not exists reviews_like_count_idx on public.reviews (like_count desc);

create or replace function public.refresh_review_like_count()
returns trigger
language plpgsql
as $$
declare
  target_review_id uuid;
begin
  target_review_id := coalesce(new.review_id, old.review_id);

  update public.reviews
  set like_count = (
    select count(*)::integer
    from public.review_likes
    where review_id = target_review_id
  )
  where id = target_review_id;

  return coalesce(new, old);
end;
$$;

drop trigger if exists review_likes_refresh_count on public.review_likes;
create trigger review_likes_refresh_count
  after insert or delete on public.review_likes
  for each row
  execute function public.refresh_review_like_count();

alter table public.review_likes enable row level security;

-- Anyone can read likes (needed to display counts).
drop policy if exists "Review likes are public" on public.review_likes;
create policy "Review likes are public"
  on public.review_likes
  for select
  to anon, authenticated
  using (true);

-- Users can like as themselves.
drop policy if exists "Users can like reviews" on public.review_likes;
create policy "Users can like reviews"
  on public.review_likes
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Users can remove their own like.
drop policy if exists "Users can unlike reviews" on public.review_likes;
create policy "Users can unlike reviews"
  on public.review_likes
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Backfill counts for any existing likes.
update public.reviews r
set like_count = (
  select count(*)::integer
  from public.review_likes rl
  where rl.review_id = r.id
);
