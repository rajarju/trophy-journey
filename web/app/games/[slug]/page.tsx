import { notFound } from "next/navigation";
import { getGame, getGameSlugs } from "@/lib/games";
import { GameHeader } from "@/components/game/GameHeader";
import { JourneyIntro } from "@/components/game/JourneyIntro";
import { TrophyList } from "@/components/game/TrophyList";
import Link from "next/link";

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getGameSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = await getGame(slug);

  if (!game) {
    notFound();
  }

  // Use cover image stored in game JSON (populated by fetch-game-images script)
  const coverImage = game.coverImage?.startsWith("http") ? game.coverImage : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      {coverImage && (
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${coverImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-background" />
        </div>
      )}

      {/* Header */}
      <header
        className={`border-b border-surface-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10 ${
          coverImage ? "-mt-14" : ""
        }`}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            href="/games"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <BackIcon className="w-5 h-5" />
          </Link>
          <span className="text-sm font-medium text-text-primary">
            Trophy Journey
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <GameHeader game={game} coverImage={coverImage} />
        <JourneyIntro intro={game.journeyIntro} />
        <TrophyList game={game} />
      </main>
    </div>
  );
}

function BackIcon({ className }: { className?: string }) {
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
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
