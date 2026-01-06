import Image from "next/image";
import { Game } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

interface GameHeaderProps {
  game: Game;
  coverImage?: string | null;
}

export function GameHeader({ game, coverImage }: GameHeaderProps) {
  const { metadata } = game;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
      {/* Cover Image */}
      <div className="w-full sm:w-32 h-44 sm:h-44 rounded-lg overflow-hidden shrink-0 relative bg-surface-border">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={game.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 128px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <TrophyIcon className="w-8 h-8 text-text-muted/30" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge>{game.platform}</Badge>
          {metadata.onlineRequired && (
            <Badge variant="warning">Online Required</Badge>
          )}
          {metadata.missableTrophies === 0 && (
            <Badge variant="success">No Missables</Badge>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3 leading-tight">
          {game.title}
        </h1>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MetadataItem label="Time" value={metadata.estimatedTime} />
          <MetadataItem label="Difficulty" value={metadata.difficulty} />
          <MetadataItem
            label="Playthroughs"
            value={metadata.playthroughsRequired.toString()}
          />
          <MetadataItem
            label="Missables"
            value={metadata.missableTrophies.toString()}
            highlight={metadata.missableTrophies > 0}
          />
        </div>
      </div>
    </div>
  );
}

interface MetadataItemProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function MetadataItem({ label, value, highlight = false }: MetadataItemProps) {
  return (
    <div className="bg-surface rounded-lg p-3 border border-surface-border">
      <div className="text-xs text-text-muted uppercase tracking-wide mb-1">
        {label}
      </div>
      <div
        className={`text-sm font-semibold ${
          highlight ? "text-warning" : "text-text-primary"
        }`}
      >
        {value}
      </div>
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
