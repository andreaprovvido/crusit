// Unique intros for collection pages. Keys are `${kind}:${slug}`.
// Slugs match `slugify()` in lib/seo.ts.

const PLACE_SUMMARIES: Record<string, string> = {
  "city:rome":
    "Rome’s outdoor scene is split between the city parks and the coast. Villa Borghese and Villa Gordiani are the central evening spots; Capocotta and the Castel Fusano pines are the summer beach-and-forest circuit south of Ostia. Public sex is illegal in Italy, so these pages stick to location, access, and discretion.",
  "city:milan":
    "Milan cruising is mostly parks. Parco Sempione is the central after-dark ground behind the Castello; Boscoincittà, Parco Nord, and Parco Lambro are larger and quieter on the edges of the city. The Porta Venezia bar street is a short walk from Sempione if you want a drink before or after.",
  "city:berlin":
    "Berlin has treated outdoor cruising as part of city life for generations. Tiergarten, around the Siegessäule and the Tuntenwiese, is the famous one. Hasenheide and Volkspark Friedrichshain are the quieter local alternatives in Neukölln and the east.",
  "city:london":
    "London’s best-known outdoor ground is the West Heath of Hampstead Heath, in the woodland behind the old Jack Straw’s Castle site. Men have met there since the 19th century. Go before sunset if you want the paths while they are still readable, and treat the heath as a shared public park.",
  "city:amsterdam":
    "Amsterdam is unusual: at De Nieuwe Meer the city marks where cruising is allowed, and wandering outside that zone can mean a fine. The Oeverlanden is the main year-round ground. The Rozetuin in the Vondelpark is the central, more social summer option.",
  "city:paris":
    "Paris’s main outdoor area is the Bois de Boulogne, in the interior paths beyond Porte Dauphine rather than on the ring roads. It is a very large park. Thursday afternoons and weekends are the busiest, and the late hours are the ones to treat with the most caution.",
  "city:madrid":
    "In summer, Madrid’s scene concentrates on the Casa de Campo, the huge park west of the centre. The clothing-optional area behind the lake is the usual focal point, and Lago is the metro stop. Heat, not nightlife hours, sets the rhythm.",
  "city:sitges":
    "Sitges is a small beach town with a dense gay bar street and one famous strand: Bassa Rodona, on the seafront and walkable from the centre. Summer is when the beach and the bars run together as one circuit.",
  "city:maspalomas":
    "Maspalomas is a year-round gay beach town because of the climate. The protected dunes behind the beach are the outdoor ground, with Kiosk 7 as the long-standing meeting point and the Yumbo Centre for bars after dark. Wind can shut a day down even when the sun is out.",
  "city:lisbon":
    "Lisbon splits between a central night park and a real forest. Parque Eduardo VII, north of Marquês de Pombal, is the easy one after 10pm. Monsanto, above Belém, is the wooded one and needs a car or a taxi. Public cruising is not permitted under Portuguese law.",
  "city:costa-da-caparica":
    "Costa da Caparica, south of Lisbon, is the city’s summer beach escape. Praia 19 is the gay stretch, with a clothing-optional section and a seasonal crowd. The practical route is the ferry plus the beach train, not a metro.",
  "city:mykonos":
    "On Mykonos the gay beach is Elia, the island’s largest strand. The far end is the clothing-optional section. Buses and boats from town both work in season; outside summer the island is a different, much quieter place.",
  "city:sydney":
    "Sydney’s secluded harbour beach is Obelisk, in Mosman inside the national park. The sand is the social part; the bush trails beside it are where people look for cover. It is a nude beach with a view, not a bar-and-boardwalk scene.",
  "city:new-york":
    "New York’s historic outdoor ground is the Ramble in Central Park, a woodland with a long queer record and a much calmer present. Public sex remains illegal in New York. Treat the Ramble as a documented place with real police and birder traffic, not a private room.",
  "city:queens":
    "Jacob Riis Park’s eastern end, Bay 1, has been New York’s main gay beach since the 1940s. It sits on the Rockaway Peninsula inside Gateway National Recreation Area. Check park alerts before you go: erosion has closed the swimming beach more than once.",
  "city:fire-island":
    "The Meat Rack is the wooded strip between Cherry Grove and Fire Island Pines, officially the Judy Garland Memorial Pathway. It is a summer place, reached on foot after the Sayville ferry. Federal land rules and mosquitoes both apply.",
  "city:san-francisco":
    "San Francisco’s western edge is a circuit: the north end of Baker Beach, the cove at Marshall’s Beach, and the windmill corner of Golden Gate Park. All three are public parkland. Fog, cold water, and California law on public sex are the practical constraints.",
  "city:washington":
    "P Street Beach, on the grass south of the P Street Bridge in Rock Creek Park, is a documented queer landmark — early Pride gatherings happened here. The wooded slope beside it, the Black Forest, was the nighttime area for decades. It is still a city park with Park Police.",
  "city:provincetown":
    "Provincetown in July and August is one of the densest gay summers in the United States. Herring Cove’s south end is the daytime beach. The sand under the Boatslip deck, the Dick Dock, is the after-dark spot once the tea dance ends. The town is openly gay; discretion still matters.",
  "city:san-diego":
    "Black’s Beach, under the Torrey Pines bluffs, is San Diego’s gay nude beach — specifically the northern, state-park section. The city-owned sand to the south prohibits nudity. The gliderport stairs are the usual hike down.",
  "city:miami-beach":
    "Haulover’s northern third, between lifeguard towers 12 and 16, is Florida’s legal clothing-optional public beach. The gay crowd sits toward towers 15 and 16. Park at Collins Avenue and walk north past the textile section; summer weekends fill the lot early.",
  "city:rehoboth-beach":
    "Poodle Beach is the informal gay end of the Rehoboth boardwalk, past Queen Street where the family crowd thins. There is no sign. Daytime on the sand is the scene; the town’s bar street is a few minutes inland.",
  "city:kansas-city":
    "Kansas City has no beach culture. The historic outdoor ground is the Liberty Memorial grounds in Penn Valley Park, a drive-and-trail spot documented since at least the 1970s. Security around the memorial is heavier than it used to be.",
  "city:seattle":
    "Herring’s House Park is a restored Duwamish estuary in industrial southwest Seattle: woodland trails, a river view, and a parking area that cruising guides have listed for years. It is quieter than Capitol Hill and more exposed after dark.",

  "country:italy":
    "Italy on Crusit is Rome and Milan: city parks for the evening, and the Roman coast — Capocotta and Castel Fusano — for summer. Public sexual activity is illegal, so the useful details are which park, which entrance, and when the paths actually fill.",
  "country:germany":
    "Germany’s listings centre on Berlin, where outdoor cruising around the Tiergarten is old and largely tolerated. Hasenheide and Volkspark Friedrichshain are the neighbourhood alternatives when the Victory Column meadow is too exposed.",
  "country:united-kingdom":
    "The United Kingdom entry is Hampstead Heath’s West Heath, London’s famous woodland ground. It is a public heath with dog walkers and families on the main paths. The cruising is in the trees, not on the open grass.",
  "country:netherlands":
    "The Netherlands is the clearest case of a city that regulates cruising instead of only banning it. At Amsterdam’s Oeverlanden, signs mark the allowed zone. The Vondelpark’s Rozetuin is the central summer hangout, with a rougher edge after dark.",
  "country:france":
    "France on the map is the Bois de Boulogne in Paris: a huge wood west of the centre, busiest on Thursday afternoons and weekends, reached from Porte Dauphine. Stay on the interior footpaths and do not treat the late night as safe by default.",
  "country:spain":
    "Spain runs from a city park to two famous beaches. Casa de Campo is Madrid in summer. Bassa Rodona is Sitges, attached to the bar street. Maspalomas, in Gran Canaria, is the dune system that works in winter as well as August.",
  "country:portugal":
    "Portugal is Lisbon plus the Caparica coast. Eduardo VII is central and nocturnal, Monsanto is a real forest you reach by car, and Praia 19 is the summer beach. Portuguese law does not permit public cruising.",
  "country:greece":
    "Greece on Crusit is seasonal. Elia Beach on Mykonos is the gay stretch of the island’s largest beach, busy when the boats and buses from town are running and quiet when the season ends.",
  "country:australia":
    "Australia’s listing is Obelisk Beach on Sydney Harbour: a nude cove in Mosman with bushland beside the sand. National-park access and daytime cover matter more here than a bar scene.",
  "country:united-states":
    "The United States listings are historic public places: the Ramble and Jacob Riis in New York, the Meat Rack on Fire Island, the San Francisco beaches and Golden Gate Park, Provincetown, Black’s, Haulover, Poodle Beach, and a handful of inland parks. Public sex is illegal in these states; several sites are federal parkland.",

  "type:beach":
    "Beach spots on Crusit are the gay or clothing-optional ends of real public beaches — Capocotta, Maspalomas, Baker, Haulover, Herring Cove — not private clubs. Weather, parking, and park rules decide the day. Nudity rules change from one beach to the next, sometimes inside the same shoreline.",
  "type:park":
    "Park spots are city green spaces with a known evening or late-night pattern: Villa Borghese, Tiergarten, the Bois de Boulogne, the Ramble. They are shared with joggers and families. The useful detail is which corner, which hour, and how exposed the paths are.",
  "type:forest":
    "Forest and woodland spots trade streetlights for cover. Castel Fusano, Boscoincittà, Monsanto, and the Meat Rack are in this group. Access is often a car, a tram, or a ferry, and there may be no facilities once you leave the trailhead.",
  "type:nature-trail":
    "Nature-trail spots follow marked or informal paths rather than a single lawn or beach. Expect mixed use — walkers, cyclists, and cruisers on the same route — and plan an exit that does not depend on a dead-end spur.",
  "type:lake-river":
    "Lake and river spots use the water as a landmark: a bank, a bridge, a car park above the shore. They are often badly lit. Check the tide or the path condition before you treat a pin as walkable.",
  "type:public-restroom":
    "Public-restroom listings are the most exposed category on Crusit: short visits, other users, and attendants or cameras in many cities. Read recent comments before you go, and do not block the facility for people who are there to use it.",
  "type:rest-area":
    "Rest areas and service stations are car-based stops, usually at night, with a mix of travellers who are not there to cruise. Lighting, CCTV, and truck traffic vary wildly. Park legally and keep valuables out of sight.",
  "type:parking":
    "Parking-lot spots are meeting points organised around cars: a loop, a trailhead lot, a dead-end above a park. The scene depends on who else is using the lot. Do not block exits, and assume other drivers can see into a car.",
  "type:sauna":
    "Saunas and bathhouses are staffed businesses with a door, a fee, and house rules. They are the indoor alternative when a park is closed, cold, or simply the wrong idea. Check age policy and what the venue actually offers before you treat a listing as current.",
  "type:cruising-club":
    "Cruising clubs and bars are venues, not parks: a door, a cover charge, and a room or dark area inside. Hours matter more than weather. A listing here should be read next to recent comments, because clubs close and rebrand often.",
  "type:gym":
    "Gym and locker-room listings are ordinary businesses that some men use as a meeting point. Staff, cameras, and other members are part of the setting. Cruising that ignores the people who are there to train is how these places get shut down.",
  "type:adult-cinema":
    "Adult cinemas are indoor venues with a ticket and, usually, a clear idea of why the audience is there. They still have staff and house rules. Confirm the place is open before you cross town for it.",
  "type:shopping-center":
    "Shopping-centre spots are incidental: toilets, parking decks, or a quiet corridor in a place built for shoppers. They are watched, cleaned, and closed at a posted hour. They are a poor substitute for a park or a venue that expects you.",
  "type:other":
    "Other is the catch-all for places that do not fit a beach, park, club, or sauna. Read the description twice. If the listing is vague, the comments are the part that tells you whether it is still real.",
};

export function getPlaceSummary(
  kind: "city" | "country" | "type",
  slug: string,
): string | undefined {
  return PLACE_SUMMARIES[`${kind}:${slug}`];
}
