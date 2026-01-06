import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-surface-border bg-surface">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <span className="text-sm font-medium text-text-primary">
            Trophy Journey
          </span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-trophy-gold/20 flex items-center justify-center">
            <TrophyIcon className="w-8 h-8 text-trophy-gold" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-3">
            Trophy Journey
          </h1>
          <p className="text-text-secondary mb-8">
            Your companion for PlayStation trophy hunting. Transform complex
            guides into interactive, enjoyable journeys.
          </p>
          <Link
            href="/games"
            className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
          >
            Browse Games
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-border py-4">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm text-text-muted">
          Built for trophy hunters
        </div>
      </footer>
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
