import Link from "next/link";
import Image from "next/image";
import { getAllGames } from "@/lib/games";
import { Badge } from "@/components/ui/Badge";

export default async function GamesPage() {
  const games = await getAllGames();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Game Library
          </h1>
          <p className="text-text-secondary">
            Choose a game to start your trophy journey
          </p>
        </div>

        {games.length === 0 ? (
          <div className="bg-surface border border-surface-border rounded-xl p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-hover flex items-center justify-center">
              <TrophyIcon className="w-8 h-8 text-text-muted" />
            </div>
            <p className="text-text-secondary">No games available yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {games.map((game) => {
              const hasImage = game.coverImage && game.coverImage.startsWith("http");

              return (
                <Link key={game.slug} href={`/games/${game.slug}`}>
                  <article className="group bg-surface border border-surface-border rounded-xl overflow-hidden hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/5">
                    {/* Cover Image */}
                    <div className="relative aspect-[16/9] bg-surface-hover overflow-hidden">
                      {hasImage ? (
                        <Image
                          src={game.coverImage!}
                          alt={game.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface-hover to-surface">
                          <TrophyIcon className="w-12 h-12 text-text-muted/30" />
                        </div>
                      )}
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Platform badge */}
                      <div className="absolute top-3 left-3">
                        <Badge>{game.platform}</Badge>
                      </div>

                      {/* Trophy count */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                        <TrophyIcon className="w-3.5 h-3.5 text-trophy-gold" />
                        <span className="text-xs font-medium text-white">
                          {game.trophies.length}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h2 className="font-semibold text-text-primary text-lg mb-2 group-hover:text-accent transition-colors">
                        {game.title}
                      </h2>

                      {/* Metadata row */}
                      <div className="flex items-center gap-3 text-sm text-text-secondary mb-3">
                        <span className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          {game.metadata.estimatedTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <ChartIcon className="w-4 h-4" />
                          {game.metadata.difficulty}
                        </span>
                      </div>

                      {/* Warnings */}
                      <div className="flex flex-wrap gap-2">
                        {game.metadata.missableTrophies > 0 && (
                          <Badge variant="warning">
                            {game.metadata.missableTrophies} Missable
                          </Badge>
                        )}
                        {game.metadata.onlineRequired && (
                          <Badge variant="muted">Online Required</Badge>
                        )}
                        {game.metadata.playthroughsRequired > 1 && (
                          <Badge variant="muted">
                            {game.metadata.playthroughsRequired} Playthroughs
                          </Badge>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
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

function ClockIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
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
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
