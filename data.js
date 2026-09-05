/* ============================================================
   JAWSATAK47 — ARCHIVE DATA
   ============================================================
   Everything the site displays lives in this file as plain
   JavaScript objects and arrays. To add a new release, video,
   collaborator, artwork piece, or timeline event, copy an
   existing entry in the matching array below, edit the fields,
   and save. The rest of the site (grids, filters, search,
   modals, timeline) reads from these arrays automatically —
   no HTML editing required.

   Anywhere you see a bracketed placeholder like [ADD BIO] or
   [ADD RELEASE YEAR], replace it with the real information.
   Leave placeholders in place rather than guessing — an
   honest gap reads better than an invented fact.
   ============================================================ */

/* ---------- SITE IDENTITY ---------- */
const SITE = {
  artistName: "JawsAtak47",
  tagline: "Emcee. Writer. Independent creator.",
  statement:
    "Twenty-plus years of graffiti, lettering, and hip-hop feeding the same hand. JawsAtak47 is the music side of that — records built the way a wall gets built: layer by layer, until it's undeniable.",
  location: "Medford, Oregon",
  sisterBrand: {
    name: "QuarkForce",
    description:
      "The visual-art universe this music grows out of — murals, zines, characters, and live paint events.",
    url: "[ADD QUARKFORCE SITE URL]",
  },
  social: {
    spotify: "[ADD SPOTIFY URL]",
    instagram: "[ADD INSTAGRAM URL]",
    youtube: "[ADD YOUTUBE URL]",
    bandcamp: "[ADD BANDCAMP URL]",
  },
  contact: "[ADD BOOKING / CONTACT EMAIL]",
};

/* ---------- FEATURED / CURRENT PROJECT ----------
   Shown at the top of the homepage. Point this at whatever
   release deserves the spotlight right now — swap the
   `albumId` when priorities change. */
const FEATURED = {
  albumId: "tony-sharks",
  eyebrow: "In the works",
};

/* ---------- DISCOGRAPHY ----------
   type: "Album" | "EP" | "Single" | "Collaboration"
   status: "Released" | "In Progress" | "Announced"
   To add a release: copy an object below, give it a unique id
   (lowercase, hyphenated), and fill in the fields. `tracklist`
   is an array of track objects — use [ADD TRACK TITLE] for
   unconfirmed songs so the count is right even before titles
   are locked. */
const ALBUMS = [
  {
    id: "seawalk-2",
    title: "SeaWalk 2",
    artist: "JawsAtak47",
    type: "Album",
    status: "Released",
    year: "[ADD RELEASE YEAR]",
    cover: null, // path to cover art, e.g. "assets/covers/seawalk-2.jpg"
    producers: ["manideol"],
    features: [],
    trackCount: "[ADD TRACK COUNT]",
    tracklist: [
      { number: 1, title: "NightShark", featuring: [], producer: "manideol" },
      // additional confirmed tracks go here as they're locked in
    ],
    story:
      "The sequel to the SeaWalk concept, produced in full with ManiDeol. [ADD PROJECT STORY / LINER NOTES]",
    links: {
      spotify: "[ADD LINK]",
      youtube: "[ADD LINK]",
      bandcamp: "[ADD LINK]",
    },
  },
  {
    id: "tony-sharks",
    title: "Tony Sharks",
    artist: "JawsAtak47",
    type: "Album",
    status: "In Progress",
    year: "[ADD RELEASE YEAR]",
    cover: null,
    producers: ["dj-idea"],
    features: ["mistah-fab"],
    trackCount: 7,
    tracklist: [
      { number: 1, title: "[ADD TRACK TITLE]", featuring: [], producer: "dj-idea" },
      { number: 2, title: "[ADD TRACK TITLE]", featuring: [], producer: "dj-idea" },
      { number: 3, title: "[ADD TRACK TITLE]", featuring: [], producer: "dj-idea" },
      { number: 4, title: "[ADD TRACK TITLE]", featuring: [], producer: "dj-idea" },
      { number: 5, title: "[ADD TRACK TITLE]", featuring: ["mistah-fab"], producer: "dj-idea" },
      { number: 6, title: "[ADD TRACK TITLE]", featuring: [], producer: "dj-idea" },
      { number: 7, title: "[ADD TRACK TITLE]", featuring: [], producer: "dj-idea" },
    ],
    story:
      "A 7-track project produced entirely by DJ Idea, pulling in Bay Area voices including Mistah Fab. Currently in progress — release is paced by beat delivery from the production side. [ADD PROJECT STORY / LINER NOTES]",
    links: {
      spotify: "[ADD LINK]",
      youtube: "[ADD LINK]",
      bandcamp: "[ADD LINK]",
    },
  },

  /* --- TEMPLATE: copy this block for the next release ---
  {
    id: "your-new-album-id",
    title: "[ADD ALBUM TITLE]",
    artist: "JawsAtak47",
    type: "Album", // or "EP" / "Single" / "Collaboration"
    status: "Announced",
    year: "[ADD RELEASE YEAR]",
    cover: null,
    producers: ["producer-id"],
    features: ["collaborator-id"],
    trackCount: "[ADD TRACK COUNT]",
    tracklist: [
      { number: 1, title: "[ADD TRACK TITLE]", featuring: [], producer: "producer-id" },
    ],
    story: "[ADD PROJECT STORY / LINER NOTES]",
    links: { spotify: "", youtube: "", bandcamp: "" },
  },
  --------------------------------------------------------- */
];

/* ---------- COLLABORATORS ----------
   People JawsAtak47 has recorded with (features, guest verses,
   joint projects). Producers who ALSO appear on tracks as
   vocalists can go in both this list and PRODUCERS. */
const COLLABORATORS = [
  {
    id: "mistah-fab",
    name: "Mistah FAB",
    role: "Featured artist",
    region: "Bay Area",
    bio: "[ADD BIO / CONNECTION STORY]",
    projects: ["tony-sharks"],
    links: { spotify: "[ADD LINK]", instagram: "[ADD LINK]" },
  },
  {
    id: "cambatta",
    name: "Cambatta",
    role: "Collaborator",
    region: "[ADD REGION]",
    bio: "[ADD BIO / CONNECTION STORY]",
    projects: [],
    links: { spotify: "[ADD LINK]", instagram: "[ADD LINK]" },
  },
  {
    id: "j-diggs",
    name: "J-Diggs",
    role: "Past collaborator",
    region: "Bay Area",
    bio: "[ADD BIO / CONNECTION STORY]",
    projects: [],
    links: { spotify: "[ADD LINK]", instagram: "[ADD LINK]" },
  },

  /* --- TEMPLATE ---
  {
    id: "new-collaborator-id",
    name: "[ADD NAME]",
    role: "Featured artist",
    region: "[ADD REGION]",
    bio: "[ADD BIO]",
    projects: ["album-id"],
    links: { spotify: "", instagram: "" },
  },
  ----------------- */
];

/* ---------- PRODUCERS ---------- */
const PRODUCERS = [
  {
    id: "manideol",
    name: "ManiDeol",
    bio: "[ADD BIO / HOW THE COLLABORATION STARTED]",
    projects: ["seawalk-2"],
    links: { spotify: "[ADD LINK]", instagram: "[ADD LINK]" },
  },
  {
    id: "dj-idea",
    name: "DJ Idea",
    bio: "[ADD BIO / HOW THE COLLABORATION STARTED]",
    projects: ["tony-sharks"],
    links: { spotify: "[ADD LINK]", instagram: "[ADD LINK]" },
  },

  /* --- TEMPLATE ---
  {
    id: "new-producer-id",
    name: "[ADD NAME]",
    bio: "[ADD BIO]",
    projects: ["album-id"],
    links: { spotify: "", instagram: "" },
  },
  ----------------- */
];

/* ---------- MUSIC VIDEOS ----------
   `embedUrl` accepts a YouTube/Vimeo embed link. Leave null
   until a video exists — the card will show a placeholder. */
const VIDEOS = [
  {
    id: "video-placeholder-1",
    title: "[ADD VIDEO TITLE]",
    project: "tony-sharks",
    year: "[ADD YEAR]",
    description: "[ADD VIDEO DESCRIPTION]",
    thumbnail: null,
    embedUrl: null,
  },

  /* --- TEMPLATE ---
  {
    id: "new-video-id",
    title: "[ADD VIDEO TITLE]",
    project: "album-id",
    year: "[ADD YEAR]",
    description: "[ADD DESCRIPTION]",
    thumbnail: "assets/videos/thumb.jpg",
    embedUrl: "https://www.youtube.com/embed/VIDEO_ID",
  },
  ----------------- */
];

/* ---------- ARTWORK ----------
   category: "Album Art" | "Illustration" | "Lettering" | "Graffiti" | "Painting"
   Use `image: null` until real files are uploaded — the grid
   renders a labeled placeholder tile in the meantime. */
const ARTWORK = [
  {
    id: "art-1",
    title: "[ADD ARTWORK TITLE]",
    category: "Album Art",
    related: "tony-sharks",
    year: "[ADD YEAR]",
    image: null,
  },
  {
    id: "art-2",
    title: "[ADD ARTWORK TITLE]",
    category: "Album Art",
    related: "seawalk-2",
    year: "[ADD YEAR]",
    image: null,
  },
  {
    id: "art-3",
    title: "[ADD ARTWORK TITLE]",
    category: "Lettering",
    related: null,
    year: "[ADD YEAR]",
    image: null,
  },
  {
    id: "art-4",
    title: "[ADD ARTWORK TITLE]",
    category: "Graffiti",
    related: null,
    year: "[ADD YEAR]",
    image: null,
  },

  /* --- TEMPLATE ---
  {
    id: "new-artwork-id",
    title: "[ADD TITLE]",
    category: "Album Art",
    related: "album-id-or-null",
    year: "[ADD YEAR]",
    image: "assets/artwork/file.jpg",
  },
  ----------------- */
];

/* ---------- CAREER TIMELINE ----------
   Ordered oldest to newest. `era` is a short section label,
   `year` can be a specific year or a range string. */
const TIMELINE = [
  {
    year: "c. 2004",
    era: "Beginnings",
    title: "First marks",
    description:
      "Early graffiti work — the starting point for two decades of visual and written craft. [ADD SPECIFIC DETAILS]",
  },
  {
    year: "[ADD YEARS]",
    era: "Lettering",
    title: "Sign painting & gold leaf training",
    description:
      "Formal training in sign painting and gold leaf at LA Trade Tech under Doc Guthrie, Noel B. Webber, and Joby Carter — the discipline that connects the letterforms in graffiti to precise, hand-built craft.",
  },
  {
    year: "[ADD YEAR]",
    era: "Hip-hop",
    title: "Recording begins",
    description: "[ADD DETAILS ON WHEN RECORDING/WRITING VERSES STARTED]",
  },
  {
    year: "[ADD YEAR]",
    era: "Albums",
    title: "SeaWalk 2",
    description:
      "Full-length project produced with ManiDeol. [ADD RELEASE CONTEXT]",
  },
  {
    year: "Now",
    era: "Current",
    title: "Tony Sharks in progress",
    description:
      "A 7-track project with DJ Idea on the boards, featuring Bay Area voices including Mistah FAB.",
  },
  {
    year: "Ongoing",
    era: "Multidisciplinary",
    title: "One practice, several languages",
    description:
      "Graffiti, fine art, lettering, and music running in parallel under two connected brands — QuarkForce for the visual universe, JawsAtak47 for the music.",
  },
  {
    year: "Future",
    era: "What's next",
    title: "[ADD UPCOMING PROJECTS]",
    description: "[ADD FUTURE PLANS]",
  },
];

/* ---------- THE VAULT ----------
   Behind-the-scenes material, promo experiments, demos, old
   flyers — anything archival that doesn't fit the main
   catalog. `kind` is a free-text label used as a stamp. */
const VAULT = [
  {
    id: "vault-1",
    kind: "Promo experiment",
    title: "\u201cBanned from Neptune\u201d tabloid promo",
    year: "[ADD YEAR]",
    description:
      "A tabloid-style promotional bit built for SeaWalk 2 — part of an organic content ladder that also included AI-generated visuals and a comedic PSA.",
  },
  {
    id: "vault-2",
    kind: "Promo video",
    title: "SeaWalk 2 PSA",
    year: "[ADD YEAR]",
    description:
      "A comedic public-service-style promo for SeaWalk 2, co-starring Captain.",
  },
  {
    id: "vault-3",
    kind: "Press kit",
    title: "Live booking EPK",
    year: "[ADD YEAR]",
    description: "Electronic press kit produced for live booking inquiries.",
  },

  /* --- TEMPLATE ---
  {
    id: "new-vault-id",
    kind: "Demo",
    title: "[ADD TITLE]",
    year: "[ADD YEAR]",
    description: "[ADD DESCRIPTION]",
  },
  ----------------- */
];

/* ---------- BIO SECTIONS ----------
   Rendered in order on the Story page. Each block is a
   chapter — add more as the story is filled in. */
const BIO = [
  {
    heading: "Where it starts",
    body:
      "JawsAtak47 has been making marks since roughly 2004, when graffiti was the entry point into a visual language that would eventually run in several directions at once. [ADD EARLY STORY DETAILS]",
  },
  {
    heading: "Letters, formally",
    body:
      "That instinct for letterforms got a formal education at LA Trade Tech, training in sign painting and gold leaf under Doc Guthrie, Noel B. Webber, and Joby Carter. The precision of hand-lettering and the freedom of graffiti aren't opposites here — they're the same hand working at different speeds.",
  },
  {
    heading: "Music as a parallel language",
    body:
      "Hip-hop runs alongside the visual work rather than behind it — writing verses is the same act as writing on a wall, just in a different material. [ADD DETAILS ON HOW MUSIC ENTERED THE PRACTICE]",
  },
  {
    heading: "Where it's going",
    body:
      "Two connected brands carry the work forward: QuarkForce for the visual-art universe, and JawsAtak47 for the music. Current focus is Tony Sharks, a 7-track project with DJ Idea, following SeaWalk 2 with ManiDeol. [ADD CURRENT/FUTURE DIRECTION]",
  },
];
