-- Seed well-documented outdoor LGBTQ+ spots in the United States.
-- Run in the Supabase SQL Editor. Idempotent: safe to re-run (ON CONFLICT (slug) DO NOTHING).
--
-- Research notes (March 2026):
--  * Descriptions are original summaries drawn from public LGBTQ+ travel/history sources.
--  * Coordinates were cross-checked against USGS/topo data, OpenStreetMap/Nominatim reverse
--    geocoding, National Park Service pages, and the NYC LGBT Historic Sites Project.
--  * Where a spot covers a large area (park woodland, beach section), the pin marks the
--    documented focal point — not a private meeting point.
--  * Public sexual activity is illegal or restricted in many of these places — descriptions
--    include a discretion/safety note. Verify current park access before visiting (e.g. Jacob
--    Riis Bay 1 has had NPS erosion closures).

insert into public.spots
  (slug, name, description, street_address, city, province, region, postal_code, country, spot_type, location, created_by)
values
  (
    'the-ramble-central-park-nyc',
    'The Ramble — Central Park',
    'A 36-acre woodland in the heart of Central Park, between the 66th and 79th Street transverses, that served for decades as New York''s best-known outdoor cruising ground. George Chauncey documented the north lawn as "the Fruited Plain" by the 1920s; Arthur Tress photographed the scene here in 1969. The winding paths and dense cover drew men from the Village and beyond, though police entrapment and bashings were common. Today it is calmer and popular with birders, but the queer history is extensively documented by the NYC LGBT Historic Sites Project. Public sexual activity remains illegal in New York — stay discreet and aware.',
    'West Drive near 79th St Transverse', 'New York', 'NY', 'New York', '10024', 'United States', 'park',
    st_setsrid(st_makepoint(-73.97111, 40.77639), 4326)::geography, null
  ),
  (
    'jacob-riis-park-bay-1-nyc',
    'Jacob Riis Park — Bay 1',
    'The isolated eastern end of Jacob Riis Park on the Rockaway Peninsula — historically "Screech Beach" — has been NYC''s most popular gay beach since the 1940s. Documented by the NYC LGBT Historic Sites Project, Swasarnt Nerf''s guides, and countless community archives; Harvey Milk met Joe Campbell here in the 1950s. Bay 1 and the dunes behind it remain a social and cruising focal point in summer. Reach it via the Q35/Q22 buses or the Marine Parkway Bridge. Check NPS Gateway alerts: erosion has periodically closed Bay 1 to swimming. Nudity is not permitted under New York law.',
    'Rockaway Beach Blvd', 'Queens', 'NY', 'New York', '11694', 'United States', 'beach',
    st_setsrid(st_makepoint(-73.8548, 40.5693), 4326)::geography, null
  ),
  (
    'meat-rack-fire-island-ny',
    'The Meat Rack — Fire Island',
    'The wooded Carrington Tract linking Cherry Grove and Fire Island Pines — officially the Judy Garland Memorial Pathway — is one of America''s most storied outdoor cruising areas, active since the 1950s. The Fire Island Pines Historical Society documents its role as a refuge where anonymity rules ("no lights, no talking") once prevailed; Suffolk County police raids were frequent through the 1960s. Reach it on foot between the two hamlets via ferry from Sayville. Summer weekends and events like Pines Party still draw crowds. Fire Island National Seashore woodland — bring mosquito spray and respect federal land rules.',
    '', 'Fire Island', 'NY', 'New York', '11782', 'United States', 'forest',
    st_setsrid(st_makepoint(-73.080556, 40.661944), 4326)::geography, null
  ),
  (
    'baker-beach-north-san-francisco',
    'Baker Beach — North End',
    'The northernmost stretch of Baker Beach below the Presidio cliffs is San Francisco''s classic clothing-optional shoreline, with Golden Gate Bridge views and a long gay presence. The National Park Service notes the nude sunbathing area at the north end; California Beaches and local guides place the gay social scene on the far north section below the bluffs. Parking at Baker Beach lot, then walk north. Fog clears the crowds on cold days; summer weekends are busiest. Cold water and rip currents — no swimming. Public sexual activity is illegal under California law.',
    '1504 Pershing Dr', 'San Francisco', 'CA', 'California', '94129', 'United States', 'beach',
    st_setsrid(st_makepoint(-122.4820, 37.7955), 4326)::geography, null
  ),
  (
    'marshalls-beach-san-francisco',
    'Marshall''s Beach',
    'A secluded cove north of Baker Beach, reached by a steep trail from the Battery to Bluffs parking area or via the Coastal Trail. Long popular with gay men for nude sunbathing and the tree-and-rock cover above the sand, with dramatic bridge views. Less crowded than Baker on weekdays. The approach is steep and slippery — wear proper shoes. Part of Golden Gate National Recreation Area. Public sexual activity is illegal in California; stay aware of trail users and park hours.',
    'Battery to Bluffs Trail', 'San Francisco', 'CA', 'California', '94129', 'United States', 'beach',
    st_setsrid(st_makepoint(-122.4799, 37.8018), 4326)::geography, null
  ),
  (
    'p-street-beach-rock-creek-dc',
    'P Street Beach — Rock Creek Park',
    'The grassy riverside area south of the P Street Bridge along Rock Creek and Potomac Parkway — locally "P Street Beach" — is a documented queer landmark in Washington, DC. The National Park Service records it as a sunbathing and concert gathering place from the 1960s, site of DC''s first unofficial Pride in 1972 and official Pride from 1975. The adjacent wooded hillside, the "Black Forest," was a nighttime cruising area for decades. Easy to reach from Dupont Circle on foot. US Park Police patrol the park — carry ID and exercise standard urban caution after dark.',
    '23rd St NW & P St NW', 'Washington', 'DC', 'District of Columbia', '20037', 'United States', 'park',
    st_setsrid(st_makepoint(-77.0499, 38.9089), 4326)::geography, null
  ),
  (
    'herring-cove-south-provincetown',
    'Herring Cove Beach — South End',
    'Provincetown''s primary bay-side beach within Cape Cod National Seashore, facing west across Cape Cod Bay with famous sunsets. The informal gay section has gathered at the south end for decades — one of the great outdoor gay social spaces on the East Coast in July and August. Reach it via Province Lands Road, bike trail, or the seasonal shuttle from town. NPS lifeguards, restrooms, and a snack bar in season. Nudity is common in the gay section though not officially sanctioned. Combine with a Boatslip tea dance for the full P-town summer day.',
    'Province Lands Rd', 'Provincetown', 'MA', 'Massachusetts', '02657', 'United States', 'beach',
    st_setsrid(st_makepoint(-70.2175, 42.0420), 4326)::geography, null
  ),
  (
    'dick-dock-provincetown',
    'The Dick Dock — Boatslip',
    'The sandy area beneath the raised deck of the Boatslip Resort on Commercial Street — created when winter storms forced the deck onto pilings in the 1970s — is Provincetown''s most infamous after-dark cruising spot. Documented in Building Provincetown, Hornet, and local oral history; busiest after the Boatslip tea dance disperses around 2 a.m. in peak season. The space is roughly 9,000 square feet under the boardwalk, tide-dependent. Provincetown is openly gay-friendly, but public sexual activity can still draw police attention — discretion matters.',
    '161 Commercial St', 'Provincetown', 'MA', 'Massachusetts', '02657', 'United States', 'beach',
    st_setsrid(st_makepoint(-70.1902, 42.0470), 4326)::geography, null
  ),
  (
    'blacks-beach-san-diego',
    'Black''s Beach — Gay Section',
    'The northern, state-park portion of Black''s Beach below the Torrey Pines bluffs is one of America''s premier gay nude beaches. Wikipedia and San Diego gay guides place the LGBTQ+ crowd on the northern clothing-optional section reached by hiking north from the Torrey Pines Gliderport stairs (about 15 minutes) or walking south from Torrey Pines State Beach at low tide. Dramatic cliffs, hang gliders overhead, year-round sun. The city-owned southern section prohibits nudity — stay north of the boundary markers. Steep access and no lifeguards at the gliderport route.',
    '2800 Torrey Pines Scenic Dr', 'San Diego', 'CA', 'California', '92037', 'United States', 'beach',
    st_setsrid(st_makepoint(-117.2532, 32.8892), 4326)::geography, null
  ),
  (
    'haulover-beach-north-miami',
    'Haulover Beach — North Section',
    'The northern third of Haulover Beach Park between lifeguard towers 12 and 16 is Florida''s only legal clothing-optional public beach, attracting over a million visitors a year. Miami-Dade County officially recognized the nude section in 1991; the gay crowd concentrates toward the north end near towers 15–16. Park at 10800 Collins Ave and walk north past the textile section. Lifeguards, food concessions, and volunteer naturist ambassadors in season. One of the busiest queer beach scenes in the South — arrive early for parking on summer weekends.',
    '10800 Collins Ave', 'Miami Beach', 'FL', 'Florida', '33154', 'United States', 'beach',
    st_setsrid(st_makepoint(-80.1200, 25.9150), 4326)::geography, null
  ),
  (
    'poodle-beach-rehoboth',
    'Poodle Beach',
    'The informal gay section at the south end of Rehoboth Beach''s boardwalk — beyond Queen Street where the crowd thins — has been a Delaware summer institution since at least the 1970s. Visit Delaware and national gay travel guides document "Poodle Beach" as the see-and-be-seen Atlantic strand for gay men, especially 20s–30s, while lesbians often prefer Gordon''s Pond to the south. Five minutes'' walk from the main boardwalk bars. No signage or official designation — community knowledge sets the boundaries. Evening boardwalk restrooms have a separate cruising reputation; daytime is the main beach scene.',
    'Queen St & Prospect St', 'Rehoboth Beach', 'DE', 'Delaware', '19971', 'United States', 'beach',
    st_setsrid(st_makepoint(-75.0745, 38.7155), 4326)::geography, null
  ),
  (
    'liberty-memorial-kansas-city',
    'Liberty Memorial — Penn Valley Park',
    'The grounds of the Liberty Memorial phallus in Penn Valley Park were a classic Midwestern drive-and-cruise spot from at least the 1970s — men signaling from cars with windows down around the monument and wooded trails. Hornet and local cruising directories document the scene; increased federal security and police crackdowns have reduced activity, but the park trails still offer seclusion. The National WWI Museum and Memorial is a major landmark at 2 Memorial Drive. Kansas City has no coastal beach culture — this is the region''s best-known historic outdoor meeting ground.',
    '2 Memorial Dr', 'Kansas City', 'MO', 'Missouri', '64108', 'United States', 'park',
    st_setsrid(st_makepoint(-94.5860, 39.0803), 4326)::geography, null
  ),
  (
    'herrings-house-park-seattle',
    'Herring''s House Park',
    'A 15.5-acre Duwamish River estuary park in Seattle''s industrial southwest, restored in 1999 as salmon habitat with woodland trails and river viewpoints. Hornet lists it among classic Seattle cruising grounds alongside Cecil Moses and Westcrest parks — the parking area and Duwamish trails draw men seeking privacy near the "Industrial Area." Quieter than Capitol Hill bars; reach via West Marginal Way SW or the Duwamish Trail. Environmental cleanup has brought more daytime visitors. Standard urban caution at night.',
    '4570 West Marginal Way SW', 'Seattle', 'WA', 'Washington', '98106', 'United States', 'park',
    st_setsrid(st_makepoint(-122.3520, 47.5626), 4326)::geography, null
  ),
  (
    'golden-gate-park-windmill-san-francisco',
    'Golden Gate Park — Murphy Windmill',
    'The southwest corner of Golden Gate Park around the Murphy and Dutch windmills, near Ocean Beach, has been a San Francisco cruising area for generations. Cruising guides cite the trails around the south windmill and parked cars on the approach roads; the Bay Area Reporter has documented ongoing use near JFK Drive and Bernice Rodgers Way. Combine with nearby Marshall''s and Baker beaches for a full western-edge circuit. The park closes around midnight. Public sexual activity is illegal — police do patrol, and occasional incidents have drawn media attention.',
    '1691 John F Kennedy Dr', 'San Francisco', 'CA', 'California', '94121', 'United States', 'park',
    st_setsrid(st_makepoint(-122.5080, 37.7640), 4326)::geography, null
  )
on conflict (slug) do nothing;
