/**
 * Site configuration and metadata
 */

export const siteConfig = {
  name: "Trophy Journey",
  shortName: "Trophy Journey",
  description:
    "Your companion for PlayStation trophy hunting. Curated guides, interactive checklists, and step-by-step walkthroughs to help you achieve platinum.",
  tagline: "Your PlayStation Trophy Hunting Companion",

  // URLs
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://trophyjourney.com",

  // Branding
  author: {
    name: "Trophy Journey",
    url: "https://trophyjourney.com",
  },

  // Social / Open Graph
  openGraph: {
    type: "website" as const,
    locale: "en_US",
    siteName: "Trophy Journey",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image" as const,
    // Add handle when available
    // creator: "@trophyjourney",
    // site: "@trophyjourney",
  },

  // Keywords for SEO
  keywords: [
    "PlayStation trophies",
    "trophy guide",
    "trophy hunting",
    "platinum trophy",
    "PS5 trophies",
    "PS4 trophies",
    "trophy walkthrough",
    "trophy checklist",
    "100% completion",
    "PSN trophies",
  ],

  // App manifest info
  manifest: {
    themeColor: "#0a0a0b",
    backgroundColor: "#0a0a0b",
  },

  // Navigation links
  nav: {
    main: [
      { label: "Games", href: "/" },
      { label: "About", href: "/about" },
    ],
  },

  // Footer links
  footer: {
    links: [
      { label: "GitHub", href: "https://github.com/rajarju/trophy-journey" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
