import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Trophy Journey — a companion app for PlayStation trophy hunters that transforms complex guides into interactive, trackable journeys.",
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description:
      "Learn about Trophy Journey — a companion app for PlayStation trophy hunters.",
    type: "website",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.openGraph.siteName,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-surface-border bg-surface sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-trophy-gold/20 flex items-center justify-center">
              <TrophyIcon className="w-4 h-4 text-trophy-gold" />
            </div>
            <span className="font-semibold text-text-primary">
              Trophy Journey
            </span>
          </Link>
          <Link
            href="/games"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Game Library
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          About Trophy Journey
        </h1>
        <p className="text-text-secondary text-lg mb-10">
          {siteConfig.description}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">
              The Problem
            </h2>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex gap-2">
                <span className="text-text-muted mt-1">—</span>
                Trophy guides are walls of text that are hard to track progress against
              </li>
              <li className="flex gap-2">
                <span className="text-text-muted mt-1">—</span>
                Missable trophies create anxiety about making irreversible mistakes
              </li>
              <li className="flex gap-2">
                <span className="text-text-muted mt-1">—</span>
                Managing collectibles and activities across multiple browser tabs is tedious
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">
              How It Works
            </h2>
            <ol className="space-y-3 text-text-secondary">
              <li className="flex gap-3">
                <span className="text-trophy-gold font-semibold shrink-0">1.</span>
                Comprehensive trophy guides are converted into structured, interactive journeys
              </li>
              <li className="flex gap-3">
                <span className="text-trophy-gold font-semibold shrink-0">2.</span>
                Each trophy breaks down into trackable checklist items with locations and tips
              </li>
              <li className="flex gap-3">
                <span className="text-trophy-gold font-semibold shrink-0">3.</span>
                Missable trophies are flagged upfront so you never miss a window
              </li>
              <li className="flex gap-3">
                <span className="text-trophy-gold font-semibold shrink-0">4.</span>
                Your progress saves automatically — works offline, no account needed
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-3">
              Built For
            </h2>
            <p className="text-text-secondary">
              Trophy Journey is designed to sit beside you while you play — mobile-first,
              thumb-optimized, and fast. Check off items as you go, pick up where you left off,
              and enjoy the game instead of managing spreadsheets.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-border">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Browse Game Library
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
