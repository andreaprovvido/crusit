-- Crusit admin backend schema.
-- Run this in the Supabase SQL Editor AFTER supabase/spots.sql.
--
-- It adds:
--   * blog_posts     — DB-backed blog managed from the /studio admin panel
--   * site_content   — editable site copy (e.g. the About page)
--   * admin_update_spot() — helper used by the admin panel to edit a spot
--                            (including its PostGIS coordinates)
--
-- Admin writes are performed with the Supabase service role key from the
-- Next.js server, which bypasses RLS. Public visitors only ever read
-- published content through the policies below.

-- =========================================================================
-- Blog posts
-- =========================================================================
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  excerpt text not null default '',
  body text not null default '',
  author text not null default 'The Crusit Team',
  tags text[] not null default '{}',
  reading_minutes integer not null default 3,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_idx on public.blog_posts (status);
create index if not exists blog_posts_published_at_idx on public.blog_posts (published_at desc);

create or replace function public.set_blog_posts_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_posts_updated_at on public.blog_posts;
create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row
  execute function public.set_blog_posts_updated_at();

alter table public.blog_posts enable row level security;

drop policy if exists "Published posts are public" on public.blog_posts;
create policy "Published posts are public"
  on public.blog_posts
  for select
  to anon, authenticated
  using (status = 'published');

-- =========================================================================
-- Editable site content (About page, etc.)
-- =========================================================================
create table if not exists public.site_content (
  key text primary key,
  title text not null default '',
  body text not null default '',
  updated_at timestamptz not null default now()
);

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_content_updated_at on public.site_content;
create trigger site_content_updated_at
  before update on public.site_content
  for each row
  execute function public.set_site_content_updated_at();

alter table public.site_content enable row level security;

drop policy if exists "Site content is public" on public.site_content;
create policy "Site content is public"
  on public.site_content
  for select
  to anon, authenticated
  using (true);

-- =========================================================================
-- Admin spot editor (updates scalar fields + PostGIS location)
-- =========================================================================
create or replace function public.admin_update_spot(
  p_id uuid,
  p_name text,
  p_description text,
  p_street_address text,
  p_city text,
  p_province text,
  p_region text,
  p_postal_code text,
  p_country text,
  p_spot_type text,
  p_status text,
  p_latitude double precision,
  p_longitude double precision
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.spots
  set
    name = p_name,
    description = p_description,
    street_address = p_street_address,
    city = p_city,
    province = p_province,
    region = p_region,
    postal_code = p_postal_code,
    country = p_country,
    spot_type = coalesce(nullif(p_spot_type, ''), 'other'),
    status = case when p_status in ('published', 'hidden') then p_status else status end,
    location = st_setsrid(st_makepoint(p_longitude, p_latitude), 4326)::geography
  where id = p_id;
end;
$$;

revoke all on function public.admin_update_spot(
  uuid, text, text, text, text, text, text, text, text, text, text,
  double precision, double precision
) from public, anon, authenticated;

grant execute on function public.admin_update_spot(
  uuid, text, text, text, text, text, text, text, text, text, text,
  double precision, double precision
) to service_role;

-- =========================================================================
-- Seed content (safe to re-run — uses on conflict do nothing)
-- =========================================================================
insert into public.site_content (key, title, body)
values (
  'about',
  'The community map for gay cruising',
  E'Crusit is an open, community-powered platform for discovering gay cruising spots — places where men and LGBTQ+ people meet for casual, consensual sexual encounters. We make that world easier to navigate with real locations, honest reviews, and a safety-first mindset.\n\n## What is Crusit?\nCruising is a long-standing part of gay and queer culture: meeting strangers in parks, beaches, saunas, clubs, and other public or semi-public spaces for anonymous or semi-anonymous sex. Crusit maps those locations worldwide and lets the community describe them — what they are like, when they are active, and what to watch out for.\n\nWe are not a dating app and we do not broker encounters. Crusit is a directory and review platform: a shared knowledge base built by people who cruise, for people who cruise.\n\n## What is it for?\nFinding reliable information about cruising spots has always been word of mouth — fragmented, outdated, and often incomplete. Crusit brings that knowledge together in one place: discover spots on a map, decide with community ratings and reviews, and contribute new locations so others benefit.\n\n## Our mission\nSex between consenting adults is nothing to be ashamed of. Cruising carries real risks too — legal, physical, and health-related. Our mission is to make gay cruising more informed, more consensual, and more protected, built on three principles: consent, awareness, and safer sex.\n\n## Who is Crusit for?\nCrusit is built for gay men and the wider LGBTQ+ community — including bisexual, queer, and trans people who participate in cruising culture. You do not need an account to browse; signing in lets you add spots, leave ratings, and write reviews. We welcome everyone who respects consent, discretion, and the community that maintains these spaces.'
)
on conflict (key) do nothing;

insert into public.blog_posts (slug, title, description, excerpt, body, author, tags, reading_minutes, status, published_at)
values
  (
    'how-to-use-crusit-to-find-cruising-spots',
    'How to use Crusit to find cruising spots near you',
    'A quick guide to finding gay cruising spots on Crusit — using the map, filters, ratings, and community reviews to discover the best locations.',
    'New to Crusit? Here''s how to use the map, filters, and reviews to find the best cruising spots near you.',
    E'Crusit is a community-powered map for discovering gay cruising spots worldwide. Every spot comes with a precise location, a category, and honest reviews from people who have actually been there. This guide walks you through the fastest way to find a spot that fits what you''re looking for.\n\n## Start with the map or the directory\nThe Explore page shows every published spot on an interactive map alongside a searchable directory. Zoom into your area on the map to see what''s nearby, or scroll the list to read details at a glance.\n\n## Filter by country, category, and rating\nUse the filters to narrow results by country, spot type (beach, park, sauna, and more), and minimum rating. Browsing by category is a great way to find the kind of location you prefer.\n\n## Read the reviews before you go\nRatings and reviews are the heart of Crusit. They tell you how busy a spot tends to be, the best times to visit, and any safety considerations. Been somewhere yourself? Sign in and leave a review.',
    'The Crusit Team',
    array['guide', 'getting-started'],
    4,
    'published',
    '2026-06-15T09:00:00.000Z'
  ),
  (
    'cruising-safety-tips',
    'Cruising safety tips: how to stay safe and discreet',
    'Practical safety tips for gay cruising: choosing locations, staying discreet, protecting your privacy, and looking out for the community.',
    'Practical, no-nonsense safety tips for cruising — from choosing locations to protecting your privacy.',
    E'Cruising should be fun and consensual. A little preparation goes a long way toward keeping it that way. These tips focus on personal safety, discretion, and respect for the spaces and people around you.\n\n## Choose your location wisely\nStick to spots with recent, positive community reviews. Reviews often flag whether an area is quiet, well-trafficked, or best avoided at certain times.\n\n## Tell someone and keep your phone charged\nLet a friend know roughly where you''re going and when you expect to be back. If a situation feels off, leave — there''s always another time and another spot.\n\n## Protect your privacy\nBe mindful of what you share and with whom. Respect other people''s anonymity just as you''d want them to respect yours.\n\n## Respect the space and the community\nLeave no trace, respect boundaries, and always confirm consent. Cruising spots exist because the community looks after them.',
    'The Crusit Team',
    array['safety', 'guide'],
    5,
    'published',
    '2026-06-22T09:00:00.000Z'
  ),
  (
    'cruising-etiquette-basics',
    'Cruising etiquette: the unwritten rules explained',
    'A friendly primer on cruising etiquette — reading signals, respecting consent and boundaries, and being a good member of the community.',
    'The unwritten rules of cruising, explained: signals, consent, boundaries, and being a good community member.',
    E'Every cruising scene has its own rhythm, but a few principles are universal. Understanding them makes the experience better and safer for everyone involved.\n\n## Consent comes first, always\nCruising runs on clear, enthusiastic consent. Read body language, move slowly, and back off gracefully if someone isn''t interested. A polite no is part of the culture.\n\n## Learn to read signals\nEye contact, proximity, and subtle gestures do most of the communicating. If you''re unsure, wait for a clear signal rather than assuming.\n\n## Be discreet and considerate\nKeep noise down, be aware of non-cruisers who may share the space, and never pressure anyone. Contributing accurate reviews on Crusit is part of good etiquette too.',
    'The Crusit Team',
    array['etiquette', 'community'],
    4,
    'published',
    '2026-06-29T09:00:00.000Z'
  )
on conflict (slug) do nothing;
