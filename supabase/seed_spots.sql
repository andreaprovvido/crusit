-- Seed popular, well-documented outdoor spots (parks & beaches).
-- Run in the Supabase SQL Editor. Idempotent: safe to re-run (ON CONFLICT (slug) DO NOTHING).
--
-- Notes:
--  * Descriptions are original summaries written from public LGBTQ+ travel guides.
--  * Coordinates are approximate (park/beach area centroids), not exact meeting points.
--  * created_by is left NULL (community/editorial seed). status defaults to 'published'.
--  * spot_type uses the categories defined in lib/spotTypes.ts.
--  * Public sexual activity is illegal or restricted in many of these places — descriptions
--    keep a discretion/safety note. Adjust or remove any spot as needed.

insert into public.spots
  (slug, name, description, street_address, city, province, region, postal_code, country, spot_type, location, created_by)
values
  (
    'villa-borghese-galoppatoio-rome',
    'Villa Borghese — Galoppatoio',
    'Rome''s best-known outdoor cruising area runs along the Galoppatoio, the old horse-riding track inside the vast Villa Borghese park. The wooded paths draw a steady crowd in the evenings and after dark, especially in the warmer months. Easy to reach on foot from Spagna or Flaminio metro. Public sexual activity is illegal in Italy, so stay discreet and respectful of other park users.',
    '', 'Rome', 'RM', 'Lazio', '', 'Italy', 'park',
    st_setsrid(st_makepoint(12.4869, 41.9145), 4326)::geography, null
  ),
  (
    'capocotta-il-buco-rome',
    'Capocotta — Il Buco',
    'Rome''s official gay and naturist beach, tucked inside the protected Capocotta dunes about 30 km south of the city near Ostia. Locals call it "Il Buco", and large rainbow flags mark the section among the dunes. It is remote and relaxed, busiest from May to September. Reach it via the Roma–Lido train to Piramide, then a local bus along the Litoranea.',
    '', 'Rome', 'RM', 'Lazio', '', 'Italy', 'beach',
    st_setsrid(st_makepoint(12.3383, 41.6497), 4326)::geography, null
  ),
  (
    'villa-gordiani-rome',
    'Villa Gordiani',
    'A green space along Via Prenestina in east Rome that turns into a late-night meeting point after dusk. The darker, more secluded corners see the most activity, with entrances from Via Prenestina and Via Olevano Romano. Bring standard urban caution at night and keep valuables out of sight.',
    '', 'Rome', 'RM', 'Lazio', '', 'Italy', 'park',
    st_setsrid(st_makepoint(12.5560, 41.8930), 4326)::geography, null
  ),
  (
    'castel-fusano-pinewood-rome',
    'Castel Fusano Pinewood',
    'The sprawling coastal pine forest behind Castel Fusano beach near Ostia is a long-standing outdoor cruising area, active both day and night. Shaded trails offer plenty of cover away from the main paths. Pair it with a beach day in summer; drive or take the Roma–Lido line to Castel Fusano.',
    '', 'Rome', 'RM', 'Lazio', '', 'Italy', 'forest',
    st_setsrid(st_makepoint(12.3436, 41.7089), 4326)::geography, null
  ),
  (
    'parco-sempione-milan',
    'Parco Sempione',
    'Milan''s central park behind the Castello Sforzesco doubles as the city''s main outdoor cruising ground after dark. The activity concentrates near the Arco della Pace and the wooded stretches beyond the lake, picking up around 10pm in summer. The Porta Venezia bar scene is a short walk away. Main paths are well lit but the interior stays discreet — stay aware and respect the park.',
    '', 'Milan', 'MI', 'Lombardy', '', 'Italy', 'park',
    st_setsrid(st_makepoint(9.1725, 45.4757), 4326)::geography, null
  ),
  (
    'boscoincitta-milan',
    'Boscoincittà',
    'A 110-hectare woodland on Milan''s western edge, quieter and far more secluded than Parco Sempione. Its forest paths and meadows draw a mix of joggers and cruisers on weekday afternoons and summer weekends. Reach it by tram line 14 or by car; there are no facilities, so come prepared.',
    '', 'Milan', 'MI', 'Lombardy', '', 'Italy', 'forest',
    st_setsrid(st_makepoint(9.1010, 45.4770), 4326)::geography, null
  ),
  (
    'parco-nord-milan',
    'Parco Nord',
    'Milan''s largest park, at the northern edge of the city. The cruising area sits toward the south-east of the grounds, well secluded and easiest to reach by car; it is quietest and most active after dark.',
    '', 'Milan', 'MI', 'Lombardy', '', 'Italy', 'park',
    st_setsrid(st_makepoint(9.1850, 45.5210), 4326)::geography, null
  ),
  (
    'parco-lambro-milan',
    'Parco Lambro',
    'A big, semi-wild park in north-east Milan known for cruising along the Via Crescenzago side and around the open fitness areas. Popular from early evening onwards; easy to reach but bring the usual night-time caution.',
    '', 'Milan', 'MI', 'Lombardy', '', 'Italy', 'park',
    st_setsrid(st_makepoint(9.2530, 45.4970), 4326)::geography, null
  ),
  (
    'tiergarten-berlin',
    'Tiergarten',
    'Berlin''s historic cruising ground, used by gay men for well over a century. The heart of the action is around the Siegessäule (Victory Column), especially the Tuntenwiese meadow on the south side. Busiest on warm afternoons and summer evenings, and largely tolerated as part of the city''s open tradition.',
    '', 'Berlin', '', 'Berlin', '', 'Germany', 'park',
    st_setsrid(st_makepoint(13.3501, 52.5145), 4326)::geography, null
  ),
  (
    'hasenheide-berlin',
    'Hasenheide',
    'A leafy park in Neukölln that offers more privacy than the busy Tiergarten, with a nudist meadow and wooded corners. A favourite for those who like their cruising with genuine nature. Most active in the warmer months.',
    '', 'Berlin', '', 'Berlin', '', 'Germany', 'park',
    st_setsrid(st_makepoint(13.4180, 52.4860), 4326)::geography, null
  ),
  (
    'volkspark-friedrichshain-berlin',
    'Volkspark Friedrichshain',
    'An east Berlin park with a cruising area near the Märchenbrunnen fountain, popular with the local crowd. Quieter than the Tiergarten and at its best on summer evenings.',
    '', 'Berlin', '', 'Berlin', '', 'Germany', 'park',
    st_setsrid(st_makepoint(13.4370, 52.5285), 4326)::geography, null
  ),
  (
    'hampstead-heath-west-heath-london',
    'Hampstead Heath — West Heath',
    'One of the world''s most famous outdoor cruising areas, in the south-west corner of London''s Hampstead Heath. The zone begins behind the former Jack Straw''s Castle and runs into dense woodland; men have met here since the 19th century. Reach it from Hampstead Underground; best just before sunset and through summer evenings.',
    '', 'London', '', 'England', '', 'United Kingdom', 'park',
    st_setsrid(st_makepoint(-0.1810, 51.5620), 4326)::geography, null
  ),
  (
    'oeverlanden-nieuwe-meer-amsterdam',
    'Oeverlanden — De Nieuwe Meer',
    'Amsterdam''s most popular cruising area, set in a large lakeside park where official signs mark exactly where cruising is allowed — stray outside and you risk a fine. Busy all year, and packed on sunny days and warm nights. Bus to Anderlechtlaan or drive (park only in official spots).',
    '', 'Amsterdam', '', 'North Holland', '', 'Netherlands', 'park',
    st_setsrid(st_makepoint(4.8180, 52.3367), 4326)::geography, null
  ),
  (
    'vondelpark-rozetuin-amsterdam',
    'Vondelpark — Rozetuin',
    'Right in central Amsterdam, the Rozetuin (rose garden) area of the Vondelpark is a relaxed summer hangout for gay men near the fountains, with the wooded corners busier after dark. Easy to reach and friendly, though the late-night scene is not for the faint-hearted.',
    '', 'Amsterdam', '', 'North Holland', '', 'Netherlands', 'park',
    st_setsrid(st_makepoint(4.8686, 52.3580), 4326)::geography, null
  ),
  (
    'bois-de-boulogne-paris',
    'Bois de Boulogne',
    'Paris''s largest and most active outdoor cruising area, in the wooded paths beyond Porte Dauphine (Metro lines 1 and 2). Activity concentrates on the interior footpaths, away from the perimeter roads, and peaks on Thursday afternoons and weekends. It is a huge space — avoid isolation after midnight.',
    '', 'Paris', '', 'Île-de-France', '', 'France', 'park',
    st_setsrid(st_makepoint(2.2700, 48.8700), 4326)::geography, null
  ),
  (
    'casa-de-campo-madrid',
    'Casa de Campo',
    'Madrid''s top summer cruising spot, in the huge Casa de Campo park just west of the centre. Head to the clothing-optional area behind the lake; take the metro to Lago. Busiest in the heat of summer.',
    '', 'Madrid', '', 'Community of Madrid', '', 'Spain', 'park',
    st_setsrid(st_makepoint(-3.7290, 40.4190), 4326)::geography, null
  ),
  (
    'monsanto-forest-park-lisbon',
    'Monsanto Forest Park',
    'Lisbon''s largest green space, on the hills above Belém and Alcântara, with genuinely forested trails that offer the cover the central gardens lack. Activity centres on the Parque de Merendas picnic area and is busiest on weekend evenings. You will need a car or taxi — there is no metro. Public cruising is not permitted under Portuguese law, so be discreet.',
    '', 'Lisbon', '', 'Lisbon', '', 'Portugal', 'forest',
    st_setsrid(st_makepoint(-9.1890, 38.7220), 4326)::geography, null
  ),
  (
    'parque-eduardo-vii-lisbon',
    'Parque Eduardo VII',
    'Central Lisbon''s largest park, running north from Marquês de Pombal. A tourist spot by day, its wooded northern end becomes a known meeting point from around 10pm. Central and easy to reach.',
    '', 'Lisbon', '', 'Lisbon', '', 'Portugal', 'park',
    st_setsrid(st_makepoint(-9.1530, 38.7295), 4326)::geography, null
  ),
  (
    'maspalomas-dunes-kiosk-7-gran-canaria',
    'Maspalomas Dunes — Kiosk 7',
    'One of Europe''s great gay beach ecosystems, set in the protected Maspalomas dunes. Kiosk 7 is the long-standing gay focal point, with cruising among the dunes behind the beach and the Yumbo Centre nightlife nearby. A year-round destination thanks to the climate — though windy days can be rough.',
    '', 'Maspalomas', '', 'Canary Islands', '', 'Spain', 'beach',
    st_setsrid(st_makepoint(-15.5840, 27.7370), 4326)::geography, null
  ),
  (
    'bassa-rodona-sitges',
    'Bassa Rodona',
    'The iconic gay beach of Sitges, right on the town''s seafront and steps from its buzzing gay bars. A see-and-be-seen spot in summer with a strong queer presence. Easy to reach on foot from the centre.',
    '', 'Sitges', '', 'Catalonia', '', 'Spain', 'beach',
    st_setsrid(st_makepoint(1.8050, 41.2340), 4326)::geography, null
  ),
  (
    'elia-beach-mykonos',
    'Elia Beach',
    'Mykonos''s largest beach and its best-known gay stretch, reached by bus or boat from the main town. The far end is the gay and clothing-optional section, with a relaxed Mediterranean scene through the summer.',
    '', 'Mykonos', '', 'South Aegean', '', 'Greece', 'beach',
    st_setsrid(st_makepoint(25.3960, 37.4260), 4326)::geography, null
  ),
  (
    'praia-19-costa-da-caparica',
    'Praia 19',
    'Lisbon''s favourite gay beach, on the Costa da Caparica south of the city. Praia 19 has a lively, welcoming crowd in summer and a clothing-optional stretch. Reach it by ferry and the seasonal beach train.',
    '', 'Costa da Caparica', '', 'Setúbal', '', 'Portugal', 'beach',
    st_setsrid(st_makepoint(-9.2200, 38.5030), 4326)::geography, null
  ),
  (
    'obelisk-beach-sydney',
    'Obelisk Beach',
    'A secluded nude beach on Sydney Harbour in Mosman, within the national park, with stunning water views. Most of the action happens in the adjacent bushland, where quiet trails offer plenty of privacy.',
    '', 'Sydney', '', 'New South Wales', '', 'Australia', 'beach',
    st_setsrid(st_makepoint(151.2510, -33.8280), 4326)::geography, null
  )
on conflict (slug) do nothing;
