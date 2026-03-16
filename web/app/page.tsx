import Link from "next/link";
import { Metadata } from "next";
import { getAllGames } from "@/lib/games";
import { GameLibrary } from "@/components/game/GameLibrary";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Game Library",
  description: `Browse our collection of PlayStation trophy guides. Curated walkthroughs and checklists to help you achieve platinum.`,
  openGraph: {
    title: `Game Library | ${siteConfig.name}`,
    description: `Browse our collection of PlayStation trophy guides. Curated walkthroughs and checklists to help you achieve platinum.`,
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.openGraph.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: `Game Library | ${siteConfig.name}`,
    description: `Browse our collection of PlayStation trophy guides. Curated walkthroughs and checklists to help you achieve platinum.`,
  },
};

export default async function HomePage() {
  const games = await getAllGames();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-surface-border bg-surface sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-trophy-gold/20 flex items-center justify-center">
              <TrophyIcon className="w-4 h-4 text-trophy-gold" />
            </div>
            <span className="font-semibold text-text-primary">
              Trophy Journey
            </span>
          </div>
          <Link
            href="/about"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            About
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Game Library
          </h1>
          <p className="text-text-secondary">
            Choose a game to start your trophy journey
          </p>
        </div>

        <GameLibrary games={games} />
      </main>
    </div>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
    </svg>
  );
}
