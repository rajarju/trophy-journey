"use client";

import { useState, useEffect, useCallback } from "react";
import { Game, GameProgress } from "@/lib/types";
import {
  getGameProgress,
  initializeGameProgress,
  toggleChecklistItem,
} from "@/lib/progress";

export function useProgress(game: Game) {
  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize progress on mount
  useEffect(() => {
    const existingProgress = getGameProgress(game.slug);
    if (existingProgress) {
      setProgress(existingProgress);
    } else {
      const newProgress = initializeGameProgress(game.slug, game);
      setProgress(newProgress);
    }
    setIsLoading(false);
  }, [game]);

  // Toggle a checklist item
  const toggleItem = useCallback(
    (trophyId: string, itemId: string) => {
      toggleChecklistItem(game.slug, trophyId, itemId);
      // Refresh progress from localStorage
      const updatedProgress = getGameProgress(game.slug);
      setProgress(updatedProgress);
    },
    [game.slug]
  );

  return {
    progress,
    isLoading,
    toggleItem,
  };
}
