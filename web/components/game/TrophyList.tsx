"use client";

import { Game } from "@/lib/types";
import { useProgress } from "@/hooks/useProgress";
import { TrophyCard } from "./TrophyCard";
import { ProgressBar } from "./ProgressBar";

interface TrophyListProps {
  game: Game;
}

export function TrophyList({ game }: TrophyListProps) {
  const { progress, isLoading, toggleItem } = useProgress(game);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface border border-surface-border rounded-lg h-24 animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Calculate overall stats
  const totalChecklist = game.trophies.reduce(
    (acc, t) => acc + (t.checklist?.length || 0),
    0
  );
  const completedChecklist = game.trophies.reduce((acc, trophy) => {
    if (!trophy.checklist || !progress?.trophies[trophy.id]) return acc;
    return (
      acc +
      trophy.checklist.filter(
        (item) => progress.trophies[trophy.id].checklist[item.id]
      ).length
    );
  }, 0);

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-surface border border-surface-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">
            Overall Progress
          </span>
          <span className="text-sm text-text-secondary">
            {Math.round((completedChecklist / totalChecklist) * 100) || 0}%
          </span>
        </div>
        <ProgressBar
          completed={completedChecklist}
          total={totalChecklist}
          showLabel={false}
        />
      </div>

      {/* Trophy List */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-text-primary">
          Trophies ({game.trophies.length})
        </h2>
        {game.trophies.map((trophy) => (
          <TrophyCard
            key={trophy.id}
            trophy={trophy}
            progress={progress?.trophies[trophy.id]}
            onChecklistToggle={(itemId) => toggleItem(trophy.id, itemId)}
          />
        ))}
      </div>
    </div>
  );
}
