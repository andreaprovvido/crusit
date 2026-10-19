export type EditorialArticle = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  body: string;
  author: string;
  tags: string[];
  readingMinutes: number;
  publishedTime: string;
  modifiedTime: string;
};

const AUTHOR = "The Crusit Team";
const MODIFIED = "2026-10-05T12:00:00.000Z";

function article(
  input: Omit<EditorialArticle, "author" | "modifiedTime" | "readingMinutes"> & {
    readingMinutes?: number;
    modifiedTime?: string;
  },
): EditorialArticle {
  const words = input.body.split(/\s+/).filter(Boolean).length;
  return {
    ...input,
    author: AUTHOR,
    modifiedTime: input.modifiedTime ?? MODIFIED,
    readingMinutes: input.readingMinutes ?? Math.max(4, Math.round(words / 180)),
  };
}

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  article({
    slug: "how-to-use-crusit-to-find-cruising-spots",
    title: "How to use Crusit to find cruising spots near you",
    description:
      "How to find gay cruising spots on Crusit: the map, city and country guides, categories, ratings, and what a listing can and cannot tell you.",
    excerpt:
      "The map is the start. City guides, categories, and comments are how you decide whether a pin is worth the trip.",
    publishedTime: "2026-06-15T09:00:00.000Z",
    modifiedTime: "2026-10-19T09:00:00.000Z",
    tags: ["guide", "getting-started"],
    body: `Crusit is a directory of gay cruising spots: a pin, a category, a description, and comments from people who went. It is not a live chat and it does not tell you who is there right now. Used that way, it is much more useful.

## Start with a place, not the whole world
Open [Explore](/spots) and zoom to the city you are actually in. A world map full of pins looks complete and tells you nothing about tonight. If the city has a guide, start there: [Rome](/blog/cruising-in-rome), [Berlin](/blog/cruising-in-berlin), [Amsterdam](/blog/cruising-in-amsterdam), [Paris](/blog/cruising-in-paris), [New York](/blog/cruising-in-new-york), [San Francisco](/blog/cruising-in-san-francisco), [Washington](/blog/cruising-in-washington), [Miami](/blog/cruising-in-miami), and [Sydney](/blog/cruising-in-sydney) are written as circuits, not as single dots.

## Read the category before the pin
A [beach](/cruising/type/beach), a [park](/cruising/type/park), and a [forest](/cruising/type/forest) fail in different ways. Beaches depend on weather and parking. Parks depend on the hour. Forests depend on whether you can get back to the trailhead. The category page is the faster filter when you already know which of those you want.

## Trust comments over the first paragraph
The description says what a place is. Comments say whether that was still true last month: a closure, a new fence, a patrol pattern, a path washed out. A listing with no comments is a starting point, not a plan. If you have been, leave one. That is the part of the site that ages better than anything an editor can write.

## Save the exit before you save the pin
Note the metro stop, the parking lot, or the bus that actually runs at the hour you would leave. Several spots on Crusit — Monsanto in Lisbon, Parco Nord in Milan, the Meat Rack on Fire Island — are awkward to abandon halfway. The "Getting there" section on a spot page is there for that, not for colour.

## What Crusit will not do
It will not tell you that a spot is safe. Public sex is illegal or restricted in many of the places we list, and a pin is not permission. It will not introduce you to anyone. Browse without an account; sign in only when you want to add a spot or write a comment.`,
  }),
  article({
    slug: "cruising-safety-tips",
    title: "Cruising safety tips: how to stay safe and discreet",
    description:
      "Practical safety for gay cruising spots: how to choose a listing, how to leave, what to do with your phone, and how discretion actually works in a public park.",
    excerpt:
      "Pick a place you can leave, tell someone the rough plan, and treat a bad feeling as the signal to go.",
    publishedTime: "2026-06-22T09:00:00.000Z",
    tags: ["safety", "guide"],
    body: `Cruising in a public place is a calculated risk: legal, physical, and social. These are the habits that reduce the boring kinds of trouble. They are not a promise.

## Prefer a spot with a recent comment
A pin from a travel guide and a pin someone described last week are different objects. On Crusit, sort by the comments. Look for anything about closures, cameras, an aggressive regular, or a path that no longer exists. If the last honest note is years old, go as a walk first.

## Have an exit that does not depend on the person you just met
Know the gate, the bus, or the car before you leave the main path. Do not hand over your phone to "hold it." If you drink, do it where you can still get yourself home. Leaving is the skill; staying is optional.

## Tell one person the outline
A friend needs the neighbourhood and the time you expect to be back, not a live location share with a stranger and not a blank "out." If that person cannot be reached, you do not have a plan, you have a wish.

## Phone, keys, wallet
Front pocket, or a small bag that stays on you. Parks and dunes are where phones get put down and forgotten. A dead battery is also how a "short walk" becomes a long one. Charge it, and keep a little cash if the night bus is cash-only.

## Discretion is a safety practice
Do not out people. Do not photograph anyone. Do not describe a stranger’s face in a comment. The comment that helps the next person is about the place: light, hour, closure, police, the walk from the station.

## When to leave
Someone following you after you have disengaged. A group that is not cruising. A request for money tied to a threat. An entrance you can no longer find. None of these require a second opinion. Public sex being illegal in many cities is its own reason not to freeze when a situation turns: walking back to the lit path is the move.

Health is the other half and it is not complicated. Condoms, and PrEP or PEP if those are part of your actual life rather than a slogan. Crusit is not a clinic. A local sexual-health service will be more specific than a blog post.`,
  }),
  article({
    slug: "cruising-etiquette-basics",
    title: "Cruising etiquette: the unwritten rules explained",
    description:
      "Cruising etiquette that holds across parks, beaches, and clubs: consent, signals, sharing the space with people who are not there for sex, and how to write a useful comment.",
    excerpt:
      "Consent, a clean no, and the sense to share the park with everyone else who is in it.",
    publishedTime: "2026-06-29T09:00:00.000Z",
    tags: ["etiquette", "community"],
    body: `The details change between a dune in Maspalomas and a park in Milan. The rules underneath do not.

## Consent is not a vibe you project
Interest looks like someone staying, turning toward you, closing distance, answering a look. It does not look like someone glancing and walking on. If you are unsure, you do not have a yes. A hand on a stranger who has not invited it is not how this works, even in a place with a reputation.

## A no is complete
"No," a head shake, a step back, or silence after you asked. You do not get a debate. The polite version — a small shake, then looking away — is the one regulars use so the whole path does not have to hear it. Accept it at the same volume.

## Signals are local and slow
Eye contact held a moment too long, a pause on the path, walking the same loop. Talking is normal in some places and ruins the point in others. If you need everything narrated, a bar or a sauna will frustrate you less than a heath at dusk.

## People who are not cruising are not scenery
Joggers, birders, kids, park staff, the man walking his dog through the Ramble. Let them pass. Take the side path. The spot stays open because most hours of the day it is an ordinary park. Comments that treat families as an obstacle are how places get policed harder.

## Leave the place as you found it
No litter, no damage to dunes or fences, no blocking a restroom that other people need. At signed places — Amsterdam’s Oeverlanden is the clear example — the posted zone is the zone. Outside it, you are not being discreet. You are trespassing on the agreement.

## Comments are part of the etiquette
Say what time you went, how busy it was, and whether something structural changed. Do not name or describe other men so they could be identified. Do not turn a review into a sex story. The next reader is trying to decide whether to get on a bus.`,
  }),
  article({
    slug: "cruising-in-rome",
    title: "Cruising in Rome: parks, pines, and the beach at Capocotta",
    description:
      "A practical guide to gay cruising spots in Rome: Villa Borghese, Villa Gordiani, the Castel Fusano pines, and Capocotta beach.",
    excerpt:
      "Two city parks for the evening, a pinewood and a dune beach once you are willing to ride the train toward Ostia.",
    publishedTime: "2026-09-02T09:00:00.000Z",
    tags: ["rome", "italy", "guide"],
    body: `Rome is not a one-park city. The evening scene is in the green space, and the summer scene is on the coast south of Ostia. Public sexual activity is illegal in Italy, so the useful version of this guide is about where to go and how to get home.

## In the city
[Villa Borghese, along the Galoppatoio](/spots/villa-borghese-galoppatoio-rome), is the famous one: an old riding track inside the park, walkable from Spagna or Flaminio, busy on warm evenings. It is also full of people who are there for the museum and the view. [Villa Gordiani](/spots/villa-gordiani-rome), on Via Prenestina, is the east-Rome alternative after dusk, with less postcard traffic and more ordinary night-park risk.

## Toward the sea
[Capocotta, Il Buco](/spots/capocotta-il-buco-rome), is the official-feeling gay and naturist stretch in the dunes, rainbow flags and all, reached by the Roma–Lido train and a bus along the coast. [Castel Fusano](/spots/castel-fusano-pinewood-rome) is the pinewood behind the beach next door, shaded and used day and night in season. They combine well. They do not combine well if you have a dinner reservation in the centre.

## How to plan it
Pick one side of the city per night. Borghese is a walk from the metro. Gordiani wants a clearer plan for getting back. The coast wants daylight and a train that is still running when you are done. Browse the rest of the city on the [Rome map](/cruising/city/rome).`,
  }),
  article({
    slug: "cruising-in-milan",
    title: "Cruising in Milan: Sempione and the outer parks",
    description:
      "Gay cruising parks in Milan: Parco Sempione after dark, plus Boscoincittà, Parco Nord, and Parco Lambro.",
    excerpt:
      "Sempione is the central night park. The other three are larger, further out, and only worth it if the trip home is real.",
    publishedTime: "2026-09-04T09:00:00.000Z",
    tags: ["milan", "italy", "guide"],
    body: `Milan’s outdoor spots are parks, and they sort themselves by how willing you are to leave the centre.

## The one everyone means
[Parco Sempione](/spots/parco-sempione-milan) sits behind the Castello Sforzesco. After dark the paths near the Arco della Pace and the trees beyond the lake are the ones people are talking about. Summer nights pick up around 10pm. Porta Venezia, if you want a bar first, is a short walk rather than a project.

## If you want cover
[Boscoincittà](/spots/boscoincitta-milan) is a large woodland on the western edge, reachable by tram 14, with no real facilities. [Parco Lambro](/spots/parco-lambro-milan) covers the north-east, along Via Crescenzago, from early evening. [Parco Nord](/spots/parco-nord-milan) is the biggest of them and the most car-shaped: the relevant corner is the south-east, after dark.

## How to choose
If this is your first night in the city, use Sempione. You can leave it on foot. The outer parks are better once you know which night bus or tram you are actually prepared to wait for. The full set is on the [Milan map](/cruising/city/milan).`,
  }),
  article({
    slug: "cruising-in-berlin",
    title: "Cruising in Berlin: Tiergarten and the neighbourhood parks",
    description:
      "Berlin’s outdoor cruising parks: the Siegessäule and Tuntenwiese in the Tiergarten, Hasenheide, and Volkspark Friedrichshain.",
    excerpt:
      "Start at the Victory Column meadow. Use Hasenheide or Friedrichshain when you want fewer tourists and more trees.",
    publishedTime: "2026-09-06T09:00:00.000Z",
    tags: ["berlin", "germany", "guide"],
    body: `Berlin is the city where outdoor cruising is closest to ordinary. That does not make every corner of every park a good idea. It means the famous spot is famous for a reason, and the others exist so you are not stuck with it.

## Tiergarten
[Tiergarten](/spots/tiergarten-berlin) has been used for well over a century. The Siegessäule is the landmark, and the Tuntenwiese on its south side is the meadow people name. Warm afternoons and summer evenings are the busiest. You will share the park with tourists climbing the column.

## The local parks
[Hasenheide](/spots/hasenheide-berlin), in Neukölln, is leafier: a nudist meadow and wooded corners, more privacy, less of a monument. [Volkspark Friedrichshain](/spots/volkspark-friedrichshain-berlin) draws a neighbourhood crowd near the Märchenbrunnen and stays quieter than the Tiergarten on the same evening.

## How to use the week
Tiergarten when the weather is good and you want the density. Hasenheide when you would rather learn a smaller park. Friedrichshain when you are already in the east and do not feel like crossing town. All three are on the [Berlin map](/cruising/city/berlin).`,
  }),
  article({
    slug: "cruising-in-london",
    title: "Cruising in London: Hampstead Heath’s West Heath",
    description:
      "What to know about cruising on Hampstead Heath in London: where the West Heath starts, how to get there, and how to treat a public park.",
    excerpt:
      "The woodland behind the old Jack Straw’s Castle site is the ground. The open heath around it is everyone else’s park.",
    publishedTime: "2026-09-08T09:00:00.000Z",
    tags: ["london", "united-kingdom", "guide"],
    body: `London on Crusit comes down to one place that has earned the attention: the West Heath of Hampstead Heath.

## Where it is
[Hampstead Heath — West Heath](/spots/hampstead-heath-west-heath-london) begins behind the former Jack Straw’s Castle and runs into dense woodland on the south-west side of the heath. Men have met there since the 19th century. Hampstead Underground is the simple way in; the walk from the station is part of arriving, not a surprise.

## When it works
Just before sunset, and on through summer evenings. A bright Saturday afternoon belongs to families and dogs on the open ground. The trees are the scene. If you stay on the widest path waiting for something to happen, you are in the wrong part of an otherwise correct park.

## How to behave on a heath
It is not licensed, not ticketed, and not separated from the rest of the park by a gate. Keep to the woodland if that is why you came, let people pass, and leave while you can still see the paths you came in on. The spot page has the practical notes, and the [London listing](/cruising/city/london) is the map if we add more ground later.`,
  }),
  article({
    slug: "cruising-in-amsterdam",
    title: "Cruising in Amsterdam: the signed woods and the Vondelpark",
    description:
      "Amsterdam cruising spots explained: De Nieuwe Meer, where signs mark the allowed zone, and the Rozetuin in the Vondelpark.",
    excerpt:
      "One park where the city tells you the boundary, and one central park that changes character after dark.",
    publishedTime: "2026-09-10T09:00:00.000Z",
    tags: ["amsterdam", "netherlands", "guide"],
    body: `Amsterdam is the European listing where the rules are posted on a sign rather than left as folklore.

## De Nieuwe Meer
[Oeverlanden](/spots/oeverlanden-nieuwe-meer-amsterdam) is the main ground: a large lakeside park, busy all year and packed when the weather is good. Official signs mark where cruising is allowed. Outside that zone, a fine is a normal outcome, not a scare story. Take the bus toward Anderlechtlaan, or drive and use an official car park. Do not invent a parking space on the verge.

## Vondelpark
[The Rozetuin](/spots/vondelpark-rozetuin-amsterdam) is central, near the rose garden and the fountains. Summer afternoons are social. The wooded corners after dark are a harder scene, and "central" means you can arrive easily and also that plenty of people in the park are not there for you.

## Which night
If you want the place the city has actually thought about, go to the Oeverlanden and read the signs before you walk in. If you are already at a museum and the evening is warm, the Vondelpark is the one you can reach without a plan. Both are on the [Amsterdam map](/cruising/city/amsterdam).`,
  }),
  article({
    slug: "cruising-in-paris",
    title: "Cruising in Paris: the Bois de Boulogne",
    description:
      "A practical guide to the Bois de Boulogne, Paris’s main outdoor cruising area: Porte Dauphine, the interior paths, and the hours that matter.",
    excerpt:
      "Enter at Porte Dauphine, leave the ring road behind, and do not treat the bois as small.",
    publishedTime: "2026-09-12T09:00:00.000Z",
    tags: ["paris", "france", "guide"],
    body: `Paris’s outdoor cruising is concentrated in one very large park, which is why people both over-trust it and get lost in it.

## Where to enter
[The Bois de Boulogne](/spots/bois-de-boulogne-paris) is west of the centre. Porte Dauphine, on metro lines 1 and 2, is the classic arrival. The perimeter roads are not the spot. The interior footpaths are. If you are still next to traffic, walk further in.

## When it is busy
Thursday afternoons and weekends are the peaks people repeat for a reason. Other times can be active and can also be a long walk through an empty wood. The bois does not become safe because it is famous.

## How not to be stupid about the size
It is big enough to lose the exit. Go in while you can learn the paths, keep your phone charged, and be done before the late night if you are alone and do not know the park. Isolation after midnight is the failure mode, not a lack of pins. The [Paris page](/cruising/city/paris) is the map.`,
  }),
  article({
    slug: "cruising-in-spain",
    title: "Cruising in Spain: Madrid, Sitges, and the Maspalomas dunes",
    description:
      "Three different Spanish cruising scenes: Casa de Campo in Madrid, Bassa Rodona in Sitges, and the dunes at Maspalomas in Gran Canaria.",
    excerpt:
      "A summer park in Madrid, a seafront in Sitges, and a winter-capable dune beach in the Canaries.",
    publishedTime: "2026-09-14T09:00:00.000Z",
    tags: ["spain", "madrid", "guide"],
    body: `Spain on Crusit is three trips that should not be planned as one mood.

## Madrid in the heat
[Casa de Campo](/spots/casa-de-campo-madrid) is the summer park, west of the centre. Metro to Lago, then the clothing-optional area behind the lake. The limiting factor is temperature and water, not a dress code. The rest of the park is enormous and mostly irrelevant.

## Sitges in season
[Bassa Rodona](/spots/bassa-rodona-sitges) is the gay beach on the town seafront, a walk from the bars. It is visible from the promenade. That is the point in July and a reason to lower your expectations in November.

## Maspalomas when you want a beach in February
[The dunes at Kiosk 7](/spots/maspalomas-dunes-kiosk-7-gran-canaria) are the long-standing focal point, with the Yumbo Centre for after dark. The climate is why people go outside August. The wind is why some of those days still fail. The dunes are protected. Stay with the established stretch.

City maps: [Madrid](/cruising/city/madrid), [Sitges](/cruising/city/sitges), [Maspalomas](/cruising/city/maspalomas).`,
  }),
  article({
    slug: "cruising-in-lisbon",
    title: "Cruising in Lisbon: Eduardo VII, Monsanto, and Praia 19",
    description:
      "Gay cruising around Lisbon: the night park at Eduardo VII, the Monsanto forest, and Praia 19 on the Costa da Caparica.",
    excerpt:
      "One central park after 10pm, one forest you cannot metro to, and one numbered beach across the river.",
    publishedTime: "2026-09-16T09:00:00.000Z",
    tags: ["lisbon", "portugal", "guide"],
    body: `Lisbon’s three listings solve three different problems. Public cruising is not permitted under Portuguese law, so treat all of this as discretion-first.

## The easy night
[Parque Eduardo VII](/spots/parque-eduardo-vii-lisbon) runs north from Marquês de Pombal. Tourists own it by day. The wooded northern end is the meeting point from about 10pm, and you can get there without negotiating a taxi.

## The forest
[Monsanto](/spots/monsanto-forest-park-lisbon) is the cover the centre does not have: real trees above Belém and Alcântara, centred on the Parque de Merendas picnic area, busiest on weekend evenings. There is no metro. If you cannot leave by the same car or taxi that brought you, pick Eduardo VII instead.

## The beach
[Praia 19](/spots/praia-19-costa-da-caparica) is the summer gay beach on the Costa da Caparica, with a clothing-optional stretch. Ferry, then the seasonal beach train. Check the train before you sell anyone on a spontaneous Tuesday.

Maps: [Lisbon](/cruising/city/lisbon) and [Costa da Caparica](/cruising/city/costa-da-caparica).`,
  }),
  article({
    slug: "cruising-in-new-york",
    title: "Cruising in New York: the Ramble, Riis Beach, and Fire Island",
    description:
      "New York’s historic gay cruising spots today: the Ramble in Central Park, Jacob Riis Bay 1, and the Meat Rack between Cherry Grove and the Pines.",
    excerpt:
      "A woodland in Central Park, a Rockaway beach with a long memory, and a summer path on Fire Island. None of them are what 1965 guides promised.",
    publishedTime: "2026-09-18T09:00:00.000Z",
    tags: ["new-york", "united-states", "guide"],
    body: `New York’s outdoor places are historic first and convenient second. Public sexual activity is illegal in the state. Go for an accurate picture, not for a fantasy of an unsupervised park.

## Central Park
[The Ramble](/spots/the-ramble-central-park-nyc) is the 36-acre woodland between the 66th and 79th Street transverses. It was the city’s best-known outdoor ground for decades, documented by historians and by the NYC LGBT Historic Sites Project. It is also full of birders, and the NYPD is not a rumour. Use it as a walk you can explain.

## The Rockaways
[Jacob Riis Park, Bay 1](/spots/jacob-riis-park-bay-1-nyc), on the eastern end of the beach, has been the gay stretch since the 1940s. Reach it by the Q35 or Q22, or over the Marine Parkway Bridge. It sits in Gateway National Recreation Area. Erosion has closed the swimming beach before; check the NPS alert the day you go. Nudity is not legal there.

## Fire Island
[The Meat Rack](/spots/meat-rack-fire-island-ny) is the wooded tract between Cherry Grove and the Pines, officially the Judy Garland Memorial Pathway. Ferry from Sayville, then walk. Summer weekends and party weeks are the season. Bring repellent. There are no cars and no winter scene.

The [New York](/cruising/city/new-york), [Queens](/cruising/city/queens), and [Fire Island](/cruising/city/fire-island) pages list whatever else is published nearby.`,
  }),
  article({
    slug: "cruising-in-san-francisco",
    title: "Cruising in San Francisco: Baker, Marshall’s, and the windmills",
    description:
      "The western San Francisco circuit: Baker Beach’s north end, Marshall’s Beach, and the Murphy Windmill corner of Golden Gate Park.",
    excerpt:
      "Three public-land spots on the ocean side, linked by fog, cold water, and California law.",
    publishedTime: "2026-09-20T09:00:00.000Z",
    tags: ["san-francisco", "united-states", "guide"],
    body: `San Francisco’s outdoor listings sit on the western edge and work as one afternoon if the fog cooperates. Public sexual activity is illegal in California, and two of the three are national recreation land.

## The beach people mean
[Baker Beach, north end](/spots/baker-beach-north-san-francisco), below the Presidio cliffs, is the classic clothing-optional stretch, with the bridge as the view. Park at the main lot and walk north. Do not swim. Summer weekends are the crowd; a cold grey day is a different beach.

## The cove below the battery
[Marshall’s Beach](/spots/marshalls-beach-san-francisco) is the secluded cove north of Baker, down a steep trail from Battery to Bluffs or the Coastal Trail. Weekdays are the reason to prefer it. The climb back up is slippery. Wear real shoes.

## The park
[Golden Gate Park at the Murphy Windmill](/spots/golden-gate-park-windmill-san-francisco) is the southwest corner near Ocean Beach, a long-used area around the south windmill. The park closes around midnight. Police patrol it, and it has had incidents public enough to reach the Bay Area Reporter. Do not be the person who treats closing time as a suggestion.

The [San Francisco map](/cruising/city/san-francisco) shows all three.`,
  }),
  article({
    slug: "cruising-in-provincetown",
    title: "Cruising in Provincetown: Herring Cove and the Dick Dock",
    description:
      "Provincetown in season: the south end of Herring Cove by day, and the Dick Dock under the Boatslip after the tea dance.",
    excerpt:
      "A National Seashore beach for the afternoon, and the sand under a Commercial Street deck after 2 a.m.",
    publishedTime: "2026-09-22T09:00:00.000Z",
    tags: ["provincetown", "united-states", "guide"],
    body: `Provincetown in July and August is dense enough that the outdoor spots are part of the town, not a secret beside it. Discretion still matters. The town being gay-friendly is not the same as a license.

## Daytime
[Herring Cove, south end](/spots/herring-cove-south-provincetown), inside Cape Cod National Seashore, faces the bay and the sunset. The informal gay section has been the south end for decades. Bike, drive Province Lands Road, or take the seasonal shuttle. Lifeguards and a snack bar exist in season. Nudity is common there and not officially allowed.

## After the tea
[The Dick Dock](/spots/dick-dock-provincetown) is the sand under the Boatslip deck at 161 Commercial Street, there because storms put the deck on pilings in the 1970s. It gets busy after the tea dance upstairs winds down, around 2 a.m. in peak season. The tide edits the floor plan. If the water is high, the stories you heard are about a larger beach than the one in front of you.

Off season, do not come for this. The [Provincetown page](/cruising/city/provincetown) is short on purpose.`,
  }),
  article({
    slug: "famous-gay-beaches",
    title: "Famous gay beaches on Crusit, from Maspalomas to Haulover",
    description:
      "A tour of the gay and clothing-optional beaches listed on Crusit: what kind of day each one actually is, and how nude-beach rules differ.",
    excerpt:
      "Some of these are hidden coves. Some are legal nude beaches with lifeguards. Read the rule before you read the view.",
    publishedTime: "2026-09-24T09:00:00.000Z",
    tags: ["beaches", "guide"],
    body: `A gay beach on Crusit can mean a signed nude section, an informal end of a family boardwalk, or a dune that is also a nature reserve. The failure mode is assuming they share a rulebook.

## Europe
[Capocotta](/spots/capocotta-il-buco-rome) is Rome’s dune beach, a train ride south. [Bassa Rodona](/spots/bassa-rodona-sitges) is Sitges’ seafront, attached to the bars. [Maspalomas](/spots/maspalomas-dunes-kiosk-7-gran-canaria) works in winter and is a protected dune system, not a free-for-all. [Elia](/spots/elia-beach-mykonos) is Mykonos’ far end, in season. [Praia 19](/spots/praia-19-costa-da-caparica) needs the ferry and the beach train from Lisbon.

## The United States
[Haulover’s north section](/spots/haulover-beach-north-miami) is the one with a legal clothing-optional zone and lifeguard towers; walk to 15 and 16. [Black’s Beach](/spots/blacks-beach-san-diego) is nude only on the state-park side, down a real hill. [Herring Cove](/spots/herring-cove-south-provincetown) is Provincetown’s bay beach. [Poodle Beach](/spots/poodle-beach-rehoboth) is an unsigned end of the Rehoboth boardwalk. [Jacob Riis Bay 1](/spots/jacob-riis-park-bay-1-nyc) is historic and is not a nude beach under New York law.

## Australia
[Obelisk](/spots/obelisk-beach-sydney) is a harbour cove in a national park, with the bush beside the sand doing as much work as the beach.

## Before you go
Check whether nudity is legal, tolerated, or the thing that gets you a fine on that specific stretch. Check wind, parking, and the last bus. The [beach category](/cruising/type/beach) is the full list as it grows.`,
  }),
  article({
    slug: "first-time-at-a-cruising-spot",
    title: "Your first time at a cruising spot",
    description:
      "A first visit to a gay cruising spot: how to choose a beginner-friendly place, what the first half hour is for, and when to go home.",
    excerpt:
      "Pick a central park you can leave on foot, go while you can still see, and count a walk as a successful first visit.",
    publishedTime: "2026-09-28T09:00:00.000Z",
    tags: ["guide", "getting-started"],
    body: `The first visit is reconnaissance. Treat it as one and it is hard to have a disastrous night. Treat it as the night you finally do everything you have read about, and the park will still be a park.

## Choose a place with an obvious exit
Good first spots are central and legible. [Parco Sempione](/spots/parco-sempione-milan), [Tiergarten](/spots/tiergarten-berlin), [the Vondelpark](/spots/vondelpark-rozetuin-amsterdam), and [Parque Eduardo VII](/spots/parque-eduardo-vii-lisbon) all let you arrive and leave without a car. Save dunes, forests, and ferries — Capocotta, Monsanto, the Meat Rack — for a later day when you already know you like this.

## Go earlier than the stories
Arrive while there is still light. Learn which path is the main one and which gate you came through. You can stay into the evening if the place feels ordinary. You cannot add daylight later.

## Have a finished version of the night that includes nothing happening
You walked the loop, you understood the layout, you left. That is a complete first visit. Anyone who needs a result in the first twenty minutes is the person regulars step away from.

## Phone and one friend
Charged phone, location shared with one person who knows the neighbourhood and the time, not with the person you just met. Read [the safety notes](/blog/cruising-safety-tips) once, not as a ritual.

## If you want a softer version
A beach in daylight — [Haulover](/spots/haulover-beach-north-miami), [Bassa Rodona](/spots/bassa-rodona-sitges), [Herring Cove](/spots/herring-cove-south-provincetown) — is socially easier than a dark park, with the tradeoff that you are more visible. A sauna or club, when we have one listed, has a door and a fee and fewer dogs.

Then, if you learned something about the place, put it in a comment. The next first-timer is who the site is for.`,
  }),
  article({
    slug: "cruising-in-washington",
    title: "Cruising in Washington, D.C.: P Street Beach and the Black Forest",
    description:
      "A practical guide to Washington’s outdoor spot: the grass south of the P Street Bridge in Rock Creek Park, and the wooded slope beside it.",
    excerpt:
      "A documented queer landmark a short walk from Dupont Circle. The grass is the daytime place; the woods are the part to treat as a city park after dark.",
    publishedTime: "2026-10-19T09:00:00.000Z",
    modifiedTime: "2026-10-19T09:00:00.000Z",
    tags: ["washington", "united-states", "guide"],
    body: `Washington’s outdoor ground is one hillside, not a circuit of beaches. It is also a Pride landmark, which is a reason to know the history and not a reason to treat the park as private.

## The grass
[P Street Beach](/spots/p-street-beach-rock-creek-dc) is the lawn south of the P Street Bridge, where Rock Creek and the parkway meet. Walk from Dupont Circle. In warm weather the grass is a sunbathing spot, open enough that anyone crossing the bridge can see it. DC’s first unofficial Pride gathering was here in 1972. That fact is in the city’s own queer history. It does not change who else is using the park today.

## The slope
The wooded hillside beside the lawn is the Black Forest, the area older guides meant when they talked about the night. It is still Rock Creek Park. US Park Police patrol it. Carry ID, stay on ground you could walk back from, and do not plan the evening as if the trees were a venue with a door.

## How to use the day
Go in daylight the first time so the bridge, the creek, and the way back to Dupont are obvious. If you want a beach instead, this is the wrong city: the [Miami](/blog/cruising-in-miami) and [Provincetown](/blog/cruising-in-provincetown) guides are the coastal version of the same idea. The [Washington page](/cruising/city/washington) has the pin and whatever comments are actually recent.`,
  }),
  article({
    slug: "cruising-in-miami",
    title: "Cruising in Miami: the north end of Haulover Beach",
    description:
      "How to use Haulover’s legal clothing-optional section: which lifeguard towers, where to park, and how it differs from an unsigned gay beach.",
    excerpt:
      "Miami-Dade’s nude beach is a posted stretch with lifeguards. The gayer end is the walk north, not the first towel you see.",
    publishedTime: "2026-10-19T09:00:00.000Z",
    modifiedTime: "2026-10-19T09:00:00.000Z",
    tags: ["miami", "united-states", "beaches", "guide"],
    body: `Haulover is the opposite of a hidden dune. Miami-Dade has recognized the clothing-optional section since 1991, staffs it with lifeguards, and sells you a parking spot. Read it as a busy public beach with a rule, not as a park after dark.

## Where to sit
[The north section](/spots/haulover-beach-north-miami) runs between lifeguard towers 12 and 16. The gay crowd settles toward 15 and 16. Park at 10800 Collins Avenue and walk north through the textile beach until the towels change. Stopping at the first nude sunbather puts you in the section, not at the end of it.

## What kind of day it is
Summer weekends fill the lot early. The concessions and the lifeguard stands are part of the setting, which is why it suits a first beach day better than [Black’s](/spots/blacks-beach-san-diego), where the way down is a cliff path with no guard on the gliderport route. It is also more regulated than [Poodle Beach](/spots/poodle-beach-rehoboth), which is only an unsigned end of a boardwalk.

## Before you leave the car
Bring water, and a way home that still works if you stay until the lot thins out. Nudity here is the local rule for that stretch. It is not a general Florida rule, and it is not permission for anything else on the sand. The [beach category](/cruising/type/beach) shows how the other strands on Crusit differ. The [Miami Beach page](/cruising/city/miami-beach) is the pin itself.`,
  }),
  article({
    slug: "cruising-in-sydney",
    title: "Cruising in Sydney: Obelisk Beach and the harbour bush",
    description:
      "Sydney’s harbour nude beach, Obelisk in Mosman: how the sand and the bush trails split the day, and what national-park access changes.",
    excerpt:
      "A cove in Sydney Harbour National Park. The beach is the social part. The bush beside it is the cover, and other hikers use the same headland.",
    publishedTime: "2026-10-19T09:00:00.000Z",
    modifiedTime: "2026-10-19T09:00:00.000Z",
    tags: ["sydney", "australia", "beaches", "guide"],
    body: `Sydney on Crusit is one cove, and the mistake is to treat it like a bar beach in Sitges. Obelisk is inside a national park, on the harbour, with a walk in and a walk out.

## The cove
[Obelisk Beach](/spots/obelisk-beach-sydney), in Mosman, is the nude strand. Daytime is when it makes sense: you can see the track, the water, and who else is on the sand. Harbour weather turns faster than the forecast you read in the city. Check the park access before you promise anyone a short stroll.

## The bush
The trails beside the beach are the part people use when they want cover. They are the same headland other visitors use to look at the harbour. A nude beach with a view is still a public park. Step aside for hikers, and do not assume a side path is unsupervised because it left the sand.

## How it compares
If you wanted lifeguards, numbered towers, and a parking lot on a highway, that is [Haulover](/blog/cruising-in-miami). If you wanted a dune reserve with a kiosk number, that is [Maspalomas](/spots/maspalomas-dunes-kiosk-7-gran-canaria). Obelisk is the small, scenic version: one cove, a track, and a reason to leave while you can still find the start of the path. The [Sydney page](/cruising/city/sydney) is the listing.`,
  }),
  article({
    slug: "cruising-in-seattle",
    title: "Cruising in Seattle: Herring’s House Park on the Duwamish",
    description:
      "Seattle’s low-key outdoor spot: Herring’s House Park in industrial southwest, the Duwamish trails, and why it is not a Capitol Hill night.",
    excerpt:
      "A restored estuary park with a parking area and river trails. Quieter than the neighbourhood people mean when they say Seattle, and more exposed after dark.",
    publishedTime: "2026-10-19T09:00:00.000Z",
    modifiedTime: "2026-10-19T09:00:00.000Z",
    tags: ["seattle", "united-states", "guide"],
    body: `Seattle does not have a beach circuit on Crusit. The listed ground is a small park in an industrial stretch of the Duwamish, and the honest description is that it is quieter than the stories attached to older cruising guides.

## The park
[Herring’s House Park](/spots/herrings-house-park-seattle) is at 4570 West Marginal Way SW: woodland trails, a river view, and a parking area. The Duwamish Trail passes it, so you will share the paths with people who are walking. The habitat restoration brought that traffic back on purpose. Daytime is the readable version of the place. After dark it is a poorly lit edge of the city, not a meadow with a monument in the middle.

## What not to expect
Capitol Hill is bars and a neighbourhood. This is a 15-acre estuary. If you wanted a central park you can leave on foot toward a metro, look at [Parco Sempione](/blog/cruising-in-milan) or [Tiergarten](/blog/cruising-in-berlin) and accept that Seattle’s pin is a different kind of trip. Go once in the light, see whether the lot and the trails match what you came for, and treat a recent comment as more current than this paragraph.

The [Seattle page](/cruising/city/seattle) is where that comment would sit.`,
  }),
  article({
    slug: "cruising-in-kansas-city",
    title: "Cruising in Kansas City: the Liberty Memorial grounds",
    description:
      "What is left of Kansas City’s outdoor spot: the drives and trails around the National WWI Museum in Penn Valley Park, and why the old scene is mostly gone.",
    excerpt:
      "A museum hill with a long cruising history and a much quieter present. Go for a walk you could explain, not for a crowd that is not there.",
    publishedTime: "2026-10-19T09:00:00.000Z",
    modifiedTime: "2026-10-19T09:00:00.000Z",
    tags: ["kansas-city", "united-states", "guide"],
    body: `Kansas City has no beach culture, and the historic outdoor ground is not a park that still runs on 1970s habits. The useful guide is the short one.

## The hill
[The Liberty Memorial](/spots/liberty-memorial-kansas-city) is the National WWI Museum and Memorial at 2 Memorial Drive, in Penn Valley Park. Older patterns were cars on the drives around the monument and people on the wooded trails. Security around the memorial is heavier now, and a lot of the drive-by scene described in old guides is gone. What remains is a major museum on a hill that some men still use as a walk.

## How to treat it
Arrive as you would at any civic landmark: daylight first, nothing that depends on an empty road, no plan that only works if a crowd appears. If the comments on the listing are old, believe the empty parking loop in front of you. [Seattle’s estuary park](/blog/cruising-in-seattle) is the other inland pin on Crusit with the same lesson. The coastal cities — [New York](/blog/cruising-in-new-york), [Miami](/blog/cruising-in-miami), [Provincetown](/blog/cruising-in-provincetown) — are a different trip entirely.

The [Kansas City page](/cruising/city/kansas-city) is the pin. A new comment does more for the next person than another retelling of the 1970s.`,
  }),
];

const BY_SLUG = new Map(EDITORIAL_ARTICLES.map((post) => [post.slug, post]));

export function getEditorialArticle(slug: string): EditorialArticle | undefined {
  return BY_SLUG.get(slug);
}

export function listEditorialArticles(): EditorialArticle[] {
  return EDITORIAL_ARTICLES;
}
