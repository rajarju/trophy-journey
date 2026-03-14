"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Game } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

interface GameLibraryProps {
  games: Game[];
}

type DifficultyFilter = "all" | "easy" | "medium" | "hard";

function parseDifficulty(difficulty: string): number {
  // Difficulty stored as e.g. "3/10", "7/10"
  const match = difficulty.match(/^(\d+(?:\.\d+)?)\s*\//);
  if (match) return parseFloat(match[1]);
  // Fallback: try parsing as plain number
  const num = parseFloat(difficulty);
  return isNaN(num) ? 5 : num;
}

function getDifficultyLabel(filter: DifficultyFilter): string {
  switch (filter) {
    case "easy":
      return "Easy (≤4)";
    case "medium":
      return "Medium (5–7)";
    case "hard":
      return "Hard (≥8)";
    default:
      return "All";
  }
}

export function GameLibrary({ games }: GameLibraryProps) {
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("All");
  const [difficultyFilter, setDifficultyFilter] =
    useState<DifficultyFilter>("all");
  const [missableOnly, setMissableOnly] = useState(false);

  // Derive available platforms from the data
  const platforms = useMemo(() => {
    const seen = new Set<string>();
    for (const game of games) {
      seen.add(game.platform);
    }
    return ["All", ...Array.from(seen).sort()];
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // Text search
      if (
        search.trim() &&
        !game.title.toLowerCase().includes(search.trim().toLowerCase())
      ) {
        return false;
      }

      // Platform filter
      if (platformFilter !== "All" && game.platform !== platformFilter) {
        return false;
      }

      // Difficulty filter
      if (difficultyFilter !== "all") {
        const score = parseDifficulty(game.metadata.difficulty);
        if (difficultyFilter === "easy" && score > 4) return false;
        if (difficultyFilter === "medium" && (score < 5 || score > 7))
          return false;
        if (difficultyFilter === "hard" && score < 8) return false;
      }

      // Missable filter
      if (missableOnly && game.metadata.missableTrophies === 0) {
        return false;
      }

      return true;
    });
  }, [games, search, platformFilter, difficultyFilter, missableOnly]);

  const difficultyOptions: DifficultyFilter[] = [
    "all",
    "easy",
    "medium",
    "hard",
  ];

  return (
    <div>
      {/* Search & Filters */}
      <div className="mb-6 space-y-3">
        {/* Search input */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search games…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-surface border border-surface-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/60 transition-colors text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
              aria-label="Clear search"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter row */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Platform pills */}
          <div className="flex flex-wrap gap-1.5">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setPlatformFilter(p)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  platformFilter === p
                    ? "bg-accent text-white"
                    : "bg-surface border border-surface-border text-text-secondary hover:border-accent/50 hover:text-text-primary"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-surface-border hidden sm:block" />

          {/* Difficulty pills */}
          <div className="flex flex-wrap gap-1.5">
            {difficultyOptions.map((d) => (
              <button
                key={d}
                onClick={() => setDifficultyFilter(d)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  difficultyFilter === d
                    ? "bg-accent text-white"
                    : "bg-surface border border-surface-border text-text-secondary hover:border-accent/50 hover:text-text-primary"
                }`}
              >
                {getDifficultyLabel(d)}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-surface-border hidden sm:block" />

          {/* Missable toggle */}
          <button
            onClick={() => setMissableOnly((v) => !v)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              missableOnly
                ? "bg-warning/20 text-warning border border-warning/40"
                : "bg-surface border border-surface-border text-text-secondary hover:border-accent/50 hover:text-text-primary"
            }`}
          >
            Has Missables
          </button>
        </div>

        {/* Result count */}
        <p className="text-xs text-text-muted">
          {filteredGames.length === 0
            ? "No games found"
            : filteredGames.length === games.length
            ? `Showing all ${games.length} game${games.length === 1 ? "" : "s"}`
            : `Showing ${filteredGames.length} of ${games.length} games`}
        </p>
      </div>

      {/* Game grid */}
      {filteredGames.length === 0 ? (
        <div className="bg-surface border border-surface-border rounded-xl p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-hover flex items-center justify-center">
            <TrophyIcon className="w-8 h-8 text-text-muted" />
          </div>
          <p className="text-text-secondary">No games match your filters.</p>
          <button
            onClick={() => {
              setSearch("");
              setPlatformFilter("All");
              setDifficultyFilter("all");
              setMissableOnly(false);
            }}
            className="mt-3 text-sm text-accent hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredGames.map((game) => {
            const hasImage =
              game.coverImage && game.coverImage.startsWith("http");

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

function SearchIcon({ className }: { className?: string }) {
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
