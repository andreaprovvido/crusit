// Lightweight, dependency-free blog content source.
//
// This intentionally avoids a CMS like WordPress: posts live in-repo as typed
// data, so they are version-controlled, fully static, and require no external
// service. To scale later, swap the `POSTS` array for a Supabase table query or
// a headless CMS fetch — the page components only depend on the functions
// exported at the bottom of this file.

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  readingMinutes: number;
  tags: string[];
  sections: BlogSection[];
};

const POSTS: BlogPost[] = [
  {
    slug: "how-to-use-crusit-to-find-cruising-spots",
    title: "How to use Crusit to find cruising spots near you",
    description:
      "A quick guide to finding gay cruising spots on Crusit — using the map, filters, ratings, and community reviews to discover the best locations.",
    excerpt:
      "New to Crusit? Here's how to use the map, filters, and reviews to find the best cruising spots near you.",
    publishedTime: "2026-06-15T09:00:00.000Z",
    author: "The Crusit Team",
    readingMinutes: 4,
    tags: ["guide", "getting-started"],
    sections: [
      {
        paragraphs: [
          "Crusit is a community-powered map for discovering gay cruising spots worldwide. Every spot comes with a precise location, a category, and honest reviews from people who have actually been there. This guide walks you through the fastest way to find a spot that fits what you're looking for.",
        ],
      },
      {
        heading: "Start with the map or the directory",
        paragraphs: [
          "The Explore page shows every published spot on an interactive map alongside a searchable directory. Zoom into your area on the map to see what's nearby, or scroll the list to read details at a glance.",
          "Each spot card shows its category, community rating, and address, so you can compare options quickly before opening the full page.",
        ],
      },
      {
        heading: "Filter by country, category, and rating",
        paragraphs: [
          "Use the filters to narrow results by country, spot type (beach, park, sauna, and more), and minimum rating. Browsing by category is a great way to find the kind of location you prefer, while country and city guides collect everything in one place.",
        ],
      },
      {
        heading: "Read the reviews before you go",
        paragraphs: [
          "Ratings and reviews are the heart of Crusit. They tell you how busy a spot tends to be, the best times to visit, and any safety considerations. Take a minute to read recent reviews before heading out.",
          "Been somewhere yourself? Sign in and leave a review — accurate, up-to-date community feedback is what keeps the map useful for everyone.",
        ],
      },
    ],
  },
  {
    slug: "cruising-safety-tips",
    title: "Cruising safety tips: how to stay safe and discreet",
    description:
      "Practical safety tips for gay cruising: choosing locations, staying discreet, protecting your privacy, and looking out for the community.",
    excerpt:
      "Practical, no-nonsense safety tips for cruising — from choosing locations to protecting your privacy.",
    publishedTime: "2026-06-22T09:00:00.000Z",
    author: "The Crusit Team",
    readingMinutes: 5,
    tags: ["safety", "guide"],
    sections: [
      {
        paragraphs: [
          "Cruising should be fun and consensual. A little preparation goes a long way toward keeping it that way. These tips focus on personal safety, discretion, and respect for the spaces and people around you.",
        ],
      },
      {
        heading: "Choose your location wisely",
        paragraphs: [
          "Stick to spots with recent, positive community reviews. Reviews often flag whether an area is quiet, well-trafficked, or best avoided at certain times. Trust that collective knowledge, and check the map so you know the surroundings before you arrive.",
        ],
      },
      {
        heading: "Tell someone and keep your phone charged",
        paragraphs: [
          "Let a friend know roughly where you're going and when you expect to be back. Keep your phone charged and reachable. If a situation feels off, leave — there's always another time and another spot.",
        ],
      },
      {
        heading: "Protect your privacy",
        paragraphs: [
          "Be mindful of what you share and with whom. Avoid revealing identifying details you're not comfortable making public, and respect other people's anonymity just as you'd want them to respect yours.",
        ],
      },
      {
        heading: "Respect the space and the community",
        paragraphs: [
          "Leave no trace, respect boundaries, and always confirm consent. Cruising spots exist because the community looks after them. Being considerate keeps them open and welcoming for everyone.",
        ],
      },
    ],
  },
  {
    slug: "cruising-etiquette-basics",
    title: "Cruising etiquette: the unwritten rules explained",
    description:
      "A friendly primer on cruising etiquette — reading signals, respecting consent and boundaries, and being a good member of the community.",
    excerpt:
      "The unwritten rules of cruising, explained: signals, consent, boundaries, and being a good community member.",
    publishedTime: "2026-06-29T09:00:00.000Z",
    author: "The Crusit Team",
    readingMinutes: 4,
    tags: ["etiquette", "community"],
    sections: [
      {
        paragraphs: [
          "Every cruising scene has its own rhythm, but a few principles are universal. Understanding them makes the experience better and safer for everyone involved.",
        ],
      },
      {
        heading: "Consent comes first, always",
        paragraphs: [
          "Cruising runs on clear, enthusiastic consent. Read body language, move slowly, and back off gracefully if someone isn't interested. A polite no is part of the culture — give and accept it without drama.",
        ],
      },
      {
        heading: "Learn to read signals",
        paragraphs: [
          "Eye contact, proximity, and subtle gestures do most of the communicating. If you're unsure, wait for a clear signal rather than assuming. When in doubt, less is more.",
        ],
      },
      {
        heading: "Be discreet and considerate",
        paragraphs: [
          "Keep noise down, be aware of non-cruisers who may share the space, and never pressure anyone. Discretion protects both you and the spot.",
          "Contributing accurate reviews on Crusit is part of good etiquette too — it helps newcomers understand a location before they visit.",
        ],
      },
    ],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...POSTS].sort(
    (a, b) =>
      new Date(b.publishedTime).getTime() - new Date(a.publishedTime).getTime(),
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return POSTS.find((post) => post.slug === slug) ?? null;
}

export function getAllBlogSlugs(): string[] {
  return POSTS.map((post) => post.slug);
}
