export type SpotSection = {
  heading: string;
  body: string;
};

export type SpotGuide = {
  sections: SpotSection[];
};

function guide(gettingThere: string, when: string, note: string): SpotGuide {
  return {
    sections: [
      { heading: "Getting there", body: gettingThere },
      { heading: "When it's active", body: when },
      { heading: "What to know", body: note },
    ],
  };
}

export const SPOT_GUIDES: Record<string, SpotGuide> = {
  "villa-borghese-galoppatoio-rome": guide(
    "The Galoppatoio sits inside Villa Borghese and is an easy walk from Spagna or Flaminio. Stay on the riding-track side rather than the museum gardens if you are looking for the evening paths.",
    "Evenings and after dark in the warmer months are when the wooded paths draw a crowd. Midday is a family park.",
    "Public sexual activity is illegal in Italy. The park is shared with everyone else in central Rome, so discretion is the whole game.",
  ),
  "capocotta-il-buco-rome": guide(
    "Take the Roma–Lido train toward Ostia, then the local bus along the Litoranea. The gay and naturist section is in the protected dunes about 30 km south of the city, marked by rainbow flags and known locally as Il Buco.",
    "May through September, with weekends the busiest. Outside summer the dunes are a long trip for a quiet beach.",
    "It is remote by design. Bring water, and do not treat the nature reserve as a place without rules.",
  ),
  "villa-gordiani-rome": guide(
    "The park runs along Via Prenestina in east Rome, with entrances from Via Prenestina and Via Olevano Romano. It is a neighbourhood green space, not a tourist garden.",
    "After dusk. The darker corners see more activity than the open lawns.",
    "Standard urban caution at night: go with a charged phone, keep valuables out of sight, and leave if the corner you picked is empty in a bad way.",
  ),
  "castel-fusano-pinewood-rome": guide(
    "The pinewood sits behind Castel Fusano beach near Ostia. The Roma–Lido line to Castel Fusano works; a car makes the trails easier to combine with the beach.",
    "Day and night, with summer as the obvious season because you can pair it with the coast.",
    "Shaded trails are the cover. Stick to paths you could find your way out of, and do not assume the forest is staffed.",
  ),
  "parco-sempione-milan": guide(
    "The park is directly behind the Castello Sforzesco. Activity after dark concentrates near the Arco della Pace and in the wooded stretches beyond the lake. Porta Venezia’s bars are a short walk away.",
    "Around 10pm in summer is the usual start. Winter is thinner and colder, not a different park.",
    "Main paths are lit and full of people crossing the park. The interior is where anyone looking for discretion actually goes.",
  ),
  "boscoincitta-milan": guide(
    "A 110-hectare woodland on Milan’s western edge. Tram 14 gets you to the area; a car is simpler if you are coming from the centre at night.",
    "Weekday afternoons and summer weekends, when the forest paths and meadows have both joggers and cruisers.",
    "There are no facilities worth planning around. It is the secluded alternative to Parco Sempione, which also means you are more on your own.",
  ),
  "parco-nord-milan": guide(
    "Milan’s largest park, on the northern edge. The cruising area is toward the south-east of the grounds and is easiest by car.",
    "After dark. Daytime is a sports-and-families park.",
    "Distance from the centre is the feature and the risk. Do not rely on a frequent night bus you have not checked.",
  ),
  "parco-lambro-milan": guide(
    "North-east Milan. The known sides are along Via Crescenzago and around the open fitness areas.",
    "From early evening onward.",
    "It is large and only semi-kept. The same night-time caution you would use in any big city park applies.",
  ),
  "tiergarten-berlin": guide(
    "The focal point is the Siegessäule. The Tuntenwiese, the meadow on the south side of the Victory Column, is the named patch. Several buses and the S-Bahn leave you at the edge of the park.",
    "Warm afternoons and summer evenings. Berlin uses this park in every season, but the outdoor crowd follows the weather.",
    "This is the historic, largely tolerated ground. It is still a central park: tourists climb the column while the meadow does something else.",
  ),
  "hasenheide-berlin": guide(
    "A neighbourhood park in Neukölln, smaller and easier to miss than the Tiergarten. The nudist meadow and the wooded corners are the parts that matter.",
    "Warmer months. It rewards people who want trees more than a monument.",
    "More privacy than the Victory Column also means fewer bystanders. Go in daylight the first time so you learn the paths.",
  ),
  "volkspark-friedrichshain-berlin": guide(
    "East Berlin, near the Märchenbrunnen. It draws a local crowd rather than the Tiergarten’s mix of visitors.",
    "Summer evenings. Quieter than the Siegessäule at the same hour.",
    "A good second park if Tiergarten feels too open. It is still a municipal park with the usual closing habits and neighbours.",
  ),
  "hampstead-heath-west-heath-london": guide(
    "The zone starts behind the former Jack Straw’s Castle, on the south-west corner of the Heath, and runs into the woodland. Hampstead Underground is the straightforward arrival.",
    "Just before sunset and through summer evenings. The Heath is busy with walkers whenever the weather is kind.",
    "Men have used these woods since the 19th century. The main paths are a public heath; leave them if you want the actual scene, and do not treat the trees as unsupervised.",
  ),
  "oeverlanden-nieuwe-meer-amsterdam": guide(
    "A lakeside park in the south of the city. The bus toward Anderlechtlaan is the transit option; drivers should use official parking only. Signs mark the cruising zone.",
    "Year-round, and packed on sunny days and warm nights.",
    "This is the rare spot where the boundary is posted. Outside the signed area you can be fined. Read the signs before you wander.",
  ),
  "vondelpark-rozetuin-amsterdam": guide(
    "The rose garden and the fountains are inside the Vondelpark, in the centre, so almost any tram that skirts the park works. The wooded corners are the after-dark part.",
    "Summer afternoons for the social lawn; late night for a rougher scene.",
    "Central and easy is not the same as gentle. The late-night park is a different crowd from the picnic crowd.",
  ),
  "bois-de-boulogne-paris": guide(
    "Porte Dauphine, on metro lines 1 and 2, is the classic entry. The activity is on the interior footpaths, not the perimeter roads.",
    "Thursday afternoons and weekends are the known peaks.",
    "The bois is enormous. Avoid being isolated in it after midnight, and keep to paths you could retrace.",
  ),
  "casa-de-campo-madrid": guide(
    "Metro to Lago, then the clothing-optional area behind the lake. The park is just west of the centre and large enough to punish a wrong turn in the heat.",
    "The heat of summer. Madrid’s outdoor season is a temperature, not a clock.",
    "Bring water. The lake area is the landmark; the rest of Casa de Campo is a public park the size of a town.",
  ),
  "monsanto-forest-park-lisbon": guide(
    "On the hills above Belém and Alcântara. There is no metro. A car or a taxi is the realistic way in, with the Parque de Merendas picnic area as the reference point.",
    "Weekend evenings.",
    "Public cruising is not permitted under Portuguese law. The forest is the cover the central gardens do not have, and it is also easy to get lost in.",
  ),
  "parque-eduardo-vii-lisbon": guide(
    "The park runs north from Marquês de Pombal and is one of the simplest places in the city to reach. The wooded northern end is the part that matters at night.",
    "From about 10pm. By day it is a viewpoint full of visitors.",
    "Central means witnesses. Discretion is not optional just because the metro is close.",
  ),
  "maspalomas-dunes-kiosk-7-gran-canaria": guide(
    "Kiosk 7 is the landmark on the Maspalomas beach, with the protected dunes behind it and the Yumbo Centre inland for the bars. Any hotel shuttle that serves Playa del Inglés can start the trip; the last stretch is on foot.",
    "Year-round, because the climate allows it. Windy days empty the sand even when it is warm.",
    "The dunes are a nature reserve, not a club. Stay on the established gay stretch and do not treat the whole dune field as open.",
  ),
  "bassa-rodona-sitges": guide(
    "On the Sitges seafront, a short walk from the gay bars in the centre. No transfer, no ferry.",
    "Summer, when the town is full. Shoulder season is a pleasant beach and a thinner crowd.",
    "It is a see-and-be-seen strand, not a hidden one. Anyone walking the promenade can see who is on it.",
  ),
  "elia-beach-mykonos": guide(
    "Bus or boat from Mykonos town. Elia is the island’s largest beach; the far end is the gay and clothing-optional section.",
    "Summer, for as long as the boats are running a useful schedule.",
    "The walk from the bus stop to the far end is part of the plan. The main taverna end is a different beach.",
  ),
  "praia-19-costa-da-caparica": guide(
    "Ferry across the Tagus, then the seasonal beach train along the Costa da Caparica. Praia 19 is a numbered beach, not a bar you can see from the road in Lisbon.",
    "Summer, with a lively crowd and a clothing-optional stretch.",
    "Check that the beach train is running that week. Out of season the numbering system is still there and the party is not.",
  ),
  "obelisk-beach-sydney": guide(
    "In Mosman, inside Sydney Harbour National Park. The beach is the cove; the bushland trails beside it are where people look for privacy. Check the park access track before you promise someone a simple walk.",
    "Daytime, when the water and the cover both make sense. Harbour weather turns quickly.",
    "A nude beach with a view is still a national park. Other hikers use the same headland.",
  ),
  "the-ramble-central-park-nyc": guide(
    "Enter Central Park and use the 79th Street transverse or West Drive as the landmark. The Ramble is the 36-acre woodland between the 66th and 79th Street transverses.",
    "It is no longer the constant scene that mid-century guides described. Birders use these paths all day. Evenings are quieter and more ambiguous.",
    "Public sexual activity is illegal in New York. The queer history — including the NYC LGBT Historic Sites Project record — is real. The current park is a famous public garden with police and tourists.",
  ),
  "jacob-riis-park-bay-1-nyc": guide(
    "The eastern end of Jacob Riis Park, on the Rockaway Peninsula. The Q35 and Q22 buses and the Marine Parkway Bridge are the usual approaches.",
    "Summer. Bay 1 and the dunes behind it are the social and cruising focus.",
    "This is Gateway National Recreation Area. Erosion has closed Bay 1 to swimming before — check NPS alerts the morning you go. Nudity is not permitted under New York law.",
  ),
  "meat-rack-fire-island-ny": guide(
    "Ferry from Sayville to Cherry Grove or the Pines, then walk. The Carrington Tract between the two hamlets is the Meat Rack; the path is also called the Judy Garland Memorial Pathway.",
    "Summer weekends and event weeks, including around the Pines Party. In winter there is no scene, because there is barely a town.",
    "Federal land, mosquitoes, and no cars. Bring repellent, and do not expect the 1960s rules of silence to be how the path works now.",
  ),
  "baker-beach-north-san-francisco": guide(
    "Parking is at the Baker Beach lot off Pershing Drive, then walk north below the Presidio cliffs. The clothing-optional stretch is the far north end, with the bridge in front of you.",
    "Summer weekends when the fog lifts. A cold grey day belongs to a much smaller crowd.",
    "Do not swim: the water is cold and the currents are worse than they look. Public sexual activity is illegal in California.",
  ),
  "marshalls-beach-san-francisco": guide(
    "A steep trail down from the Battery to Bluffs parking area, or a connection off the Coastal Trail. The cove is north of Baker Beach.",
    "Weekdays are the reason to choose it over Baker. Weekends still draw a crowd, just a smaller one.",
    "The path is steep and slippery when the sand is loose. Wear shoes you can climb in. It is Golden Gate National Recreation Area, with the same California law as the beach next door.",
  ),
  "p-street-beach-rock-creek-dc": guide(
    "Walk from Dupont Circle to the south side of the P Street Bridge, where Rock Creek and the parkway meet. The grass is P Street Beach; the wooded slope beside it is the Black Forest.",
    "The grass is a daytime sunbathing ground. The woods were the nighttime area for decades and should be treated as a city park after dark, not a venue.",
    "US Park Police patrol Rock Creek. Carry ID. This hillside is also a Pride landmark — DC’s first unofficial Pride was here in 1972 — which does not make it private.",
  ),
  "herring-cove-south-provincetown": guide(
    "Province Lands Road, the bike trail, or the seasonal shuttle from Commercial Street. The south end of the beach is the informal gay section, facing the bay.",
    "July and August, late afternoon into sunset. The National Seashore staffs lifeguards, restrooms, and a snack bar in season.",
    "Nudity is common on that end and not officially sanctioned. Combine it with town if you want the full day; the beach itself closes with the park.",
  ),
  "dick-dock-provincetown": guide(
    "Under the raised deck of the Boatslip Resort at 161 Commercial Street. You are already in the centre of town; the tea dance upstairs is how most people arrive at the idea.",
    "After the tea dance breaks up, around 2 a.m. in peak season. The space under the pilings is tide-dependent.",
    "Provincetown is as gay-friendly as a town gets. Public sex can still get police attention. If the tide is up, there is less beach than the stories suggest.",
  ),
  "blacks-beach-san-diego": guide(
    "Hike north from the Torrey Pines Gliderport stairs, about fifteen minutes down, or walk south from Torrey Pines State Beach at low tide. The gay nude section is the northern, state-park portion.",
    "Year-round sun, busiest when the access is not a mud slope. There is no lifeguard on the gliderport route.",
    "The city-owned beach to the south prohibits nudity. Stay north of the boundary markers. The climb back up is the part people underestimate.",
  ),
  "haulover-beach-north-miami": guide(
    "Park at 10800 Collins Avenue and walk north past the textile beach until you are between towers 12 and 16. Towers 15 and 16 are the gayer end.",
    "All year, with summer weekends requiring an early parking spot. Lifeguards and concessions are part of the setup.",
    "This is the nude section Miami-Dade actually recognizes, since 1991. It is busy, watched by lifeguards, and not a hidden dune.",
  ),
  "poodle-beach-rehoboth": guide(
    "Walk the Rehoboth boardwalk south, past Queen Street, until the crowd thins. That southern end is Poodle Beach. The bars are a few blocks back toward the avenue.",
    "Summer days. There is no sign and no official boundary; the regulars are the boundary.",
    "It is a see-and-be-seen Atlantic beach, skewed younger on the gay side. Gordon’s Pond, further south, is the lesbian-leaning alternative people mention in the same breath.",
  ),
  "liberty-memorial-kansas-city": guide(
    "The National WWI Museum and Memorial at 2 Memorial Drive, in Penn Valley Park. The historic pattern was cars on the drives around the monument, plus the wooded trails.",
    "Much quieter than the 1970s stories. Security and police attention increased, and a lot of the old drive-by scene is gone.",
    "This is a major museum, not a coastal hookup beach. If you go, go for a walk you could explain, and do not expect a crowd that is not there.",
  ),
  "herrings-house-park-seattle": guide(
    "4570 West Marginal Way SW, on the Duwamish in industrial southwest Seattle. The Duwamish Trail also passes it. The parking area and the river trails are the parts cruising guides name.",
    "Low-key compared with Capitol Hill. Daytime visits are more common now that the habitat restoration brought walkers back.",
    "A 15-acre estuary park, restored as salmon habitat. Night visits call for the same caution as any poorly lit industrial edge.",
  ),
  "golden-gate-park-windmill-san-francisco": guide(
    "The southwest corner of Golden Gate Park, at the Murphy and Dutch windmills near Ocean Beach. John F. Kennedy Drive gets you onto the park roads; the trails around the south windmill are the cited patch.",
    "It pairs naturally with Baker and Marshall’s on the same afternoon. The park is a daytime-into-evening place and closes around midnight.",
    "Police do patrol, and the corner has had incidents that made the local press. Public sexual activity is illegal in California. Do not plan to be in the park after it closes.",
  ),
};

const CITY_GUIDES: Record<string, string> = {
  rome: "cruising-in-rome",
  milan: "cruising-in-milan",
  berlin: "cruising-in-berlin",
  london: "cruising-in-london",
  amsterdam: "cruising-in-amsterdam",
  paris: "cruising-in-paris",
  madrid: "cruising-in-spain",
  sitges: "cruising-in-spain",
  maspalomas: "cruising-in-spain",
  lisbon: "cruising-in-lisbon",
  "costa-da-caparica": "cruising-in-lisbon",
  mykonos: "famous-gay-beaches",
  sydney: "famous-gay-beaches",
  "new-york": "cruising-in-new-york",
  queens: "cruising-in-new-york",
  "fire-island": "cruising-in-new-york",
  "san-francisco": "cruising-in-san-francisco",
  provincetown: "cruising-in-provincetown",
  "san-diego": "famous-gay-beaches",
  "miami-beach": "famous-gay-beaches",
  "rehoboth-beach": "famous-gay-beaches",
};

export function getSpotGuide(slug: string): SpotGuide | undefined {
  return SPOT_GUIDES[slug];
}

export function guideSlugForCity(citySlug: string): string | undefined {
  return CITY_GUIDES[citySlug];
}
