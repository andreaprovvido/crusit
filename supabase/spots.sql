-- Run in Supabase SQL Editor (requires PostGIS)
create extension if not exists postgis;

create table if not exists public.spots (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  street_address text not null default '',
  city text not null,
  province text not null default '',
  region text not null default '',
  postal_code text not null default '',
  country text not null,
  location geography(point, 4326) not null,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  status text not null default 'published' check (status in ('published', 'hidden')),
  spot_type text not null default 'other',
  rating_avg numeric(3, 2) not null default 0,
  rating_count integer not null default 0
);

alter table public.spots add column if not exists street_address text not null default '';
alter table public.spots add column if not exists province text not null default '';
alter table public.spots add column if not exists region text not null default '';
alter table public.spots add column if not exists postal_code text not null default '';
alter table public.spots add column if not exists spot_type text not null default 'other';

create index if not exists spots_location_idx on public.spots using gist (location);
create index if not exists spots_slug_idx on public.spots (slug);
create index if not exists spots_status_idx on public.spots (status);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  spot_id uuid not null references public.spots (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  body text not null check (char_length(body) >= 10),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (spot_id, user_id)
);

create index if not exists reviews_spot_id_idx on public.reviews (spot_id);
create index if not exists reviews_user_id_idx on public.reviews (user_id);

create or replace function public.set_reviews_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.refresh_spot_rating()
returns trigger
language plpgsql
as $$
declare
  target_spot_id uuid;
begin
  target_spot_id := coalesce(new.spot_id, old.spot_id);

  update public.spots
  set
    rating_avg = coalesce((
      select round(avg(rating)::numeric, 2)
      from public.reviews
      where spot_id = target_spot_id
    ), 0),
    rating_count = (
      select count(*)::integer
      from public.reviews
      where spot_id = target_spot_id
    )
  where id = target_spot_id;

  return coalesce(new, old);
end;
$$;

drop trigger if exists reviews_updated_at on public.reviews;
create trigger reviews_updated_at
  before update on public.reviews
  for each row
  execute function public.set_reviews_updated_at();

drop trigger if exists reviews_refresh_spot_rating on public.reviews;
create trigger reviews_refresh_spot_rating
  after insert or update or delete on public.reviews
  for each row
  execute function public.refresh_spot_rating();

alter table public.spots enable row level security;
alter table public.reviews enable row level security;

drop policy if exists "Published spots are public" on public.spots;
create policy "Published spots are public"
  on public.spots
  for select
  to anon, authenticated
  using (status = 'published');

drop policy if exists "Authenticated users can create spots" on public.spots;
create policy "Authenticated users can create spots"
  on public.spots
  for insert
  to authenticated
  with check (auth.uid() = created_by);

drop policy if exists "Spot creators can update their spots" on public.spots;
create policy "Spot creators can update their spots"
  on public.spots
  for update
  to authenticated
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

drop policy if exists "Reviews are public" on public.reviews;
create policy "Reviews are public"
  on public.reviews
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated users can create reviews" on public.reviews;
create policy "Authenticated users can create reviews"
  on public.reviews
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their reviews" on public.reviews;
create policy "Users can update their reviews"
  on public.reviews
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their reviews" on public.reviews;
create policy "Users can delete their reviews"
  on public.reviews
  for delete
  to authenticated
  using (auth.uid() = user_id);

drop view if exists public.spots_public;

create view public.spots_public
with (security_invoker = true)
as
select
  id,
  slug,
  name,
  description,
  street_address,
  city,
  province,
  region,
  postal_code,
  country,
  created_by,
  created_at,
  status,
  spot_type,
  rating_avg,
  rating_count,
  st_y(location::geometry) as latitude,
  st_x(location::geometry) as longitude
from public.spots
where status = 'published';

drop function if exists public.create_spot(
  text,
  text,
  text,
  text,
  text,
  double precision,
  double precision
);

drop function if exists public.create_spot(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  double precision,
  double precision
);

drop function if exists public.create_spot(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  double precision,
  double precision
);

create function public.create_spot(
  p_slug text,
  p_name text,
  p_description text,
  p_street_address text,
  p_city text,
  p_province text,
  p_region text,
  p_postal_code text,
  p_country text,
  p_spot_type text,
  p_latitude double precision,
  p_longitude double precision
)
returns public.spots
language plpgsql
security definer
set search_path = public
as $$
declare
  new_spot public.spots;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  insert into public.spots (
    slug,
    name,
    description,
    street_address,
    city,
    province,
    region,
    postal_code,
    country,
    spot_type,
    location,
    created_by
  )
  values (
    p_slug,
    p_name,
    p_description,
    p_street_address,
    p_city,
    p_province,
    p_region,
    p_postal_code,
    p_country,
    coalesce(nullif(p_spot_type, ''), 'other'),
    st_setsrid(st_makepoint(p_longitude, p_latitude), 4326)::geography,
    auth.uid()
  )
  returning * into new_spot;

  return new_spot;
end;
$$;

grant select on public.spots_public to anon, authenticated;
grant execute on function public.create_spot(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  double precision,
  double precision
) to authenticated;
