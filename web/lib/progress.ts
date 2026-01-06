import { UserProgress, GameProgress, Game } from "./types";

const STORAGE_KEY = "trophy-journey-progress";
const CURRENT_VERSION = 1;

function getDefaultProgress(): UserProgress {
  return {
    version: CURRENT_VERSION,
    games: {},
  };
}

export function getAllProgress(): UserProgress {
  if (typeof window === "undefined") return getDefaultProgress();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultProgress();
    return JSON.parse(stored) as UserProgress;
  } catch {
    return getDefaultProgress();
  }
}

export function getGameProgress(slug: string): GameProgress | null {
  const progress = getAllProgress();
  return progress.games[slug] || null;
}

export function initializeGameProgress(slug: string, game: Game): GameProgress {
  const existing = getGameProgress(slug);
  if (existing) return existing;

  const now = new Date().toISOString();
  const gameProgress: GameProgress = {
    startedAt: now,
    lastUpdatedAt: now,
    trophies: {},
  };

  // Initialize trophy progress
  for (const trophy of game.trophies) {
    gameProgress.trophies[trophy.id] = {
      completed: false,
      checklist: {},
    };

    if (trophy.checklist) {
      for (const item of trophy.checklist) {
        gameProgress.trophies[trophy.id].checklist[item.id] = false;
      }
    }
  }

  saveGameProgress(slug, gameProgress);
  return gameProgress;
}

export function saveGameProgress(slug: string, gameProgress: GameProgress): void {
  if (typeof window === "undefined") return;

  const progress = getAllProgress();
  progress.games[slug] = {
    ...gameProgress,
    lastUpdatedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function toggleChecklistItem(
  slug: string,
  trophyId: string,
  itemId: string
): boolean {
  const progress = getGameProgress(slug);
  if (!progress) return false;

  const trophy = progress.trophies[trophyId];
  if (!trophy) return false;

  const newValue = !trophy.checklist[itemId];
  trophy.checklist[itemId] = newValue;

  saveGameProgress(slug, progress);
  return newValue;
}

export function setTrophyCompleted(
  slug: string,
  trophyId: string,
  completed: boolean
): void {
  const progress = getGameProgress(slug);
  if (!progress) return;

  const trophy = progress.trophies[trophyId];
  if (!trophy) return;

  trophy.completed = completed;
  saveGameProgress(slug, progress);
}

export function getChecklistCompletion(
  slug: string,
  trophyId: string
): { completed: number; total: number } {
  const progress = getGameProgress(slug);
  if (!progress || !progress.trophies[trophyId]) {
    return { completed: 0, total: 0 };
  }

  const checklist = progress.trophies[trophyId].checklist;
  const items = Object.values(checklist);
  return {
    completed: items.filter(Boolean).length,
    total: items.length,
  };
}

export function getOverallCompletion(slug: string): {
  trophiesCompleted: number;
  totalTrophies: number;
  checklistCompleted: number;
  totalChecklist: number;
} {
  const progress = getGameProgress(slug);
  if (!progress) {
    return {
      trophiesCompleted: 0,
      totalTrophies: 0,
      checklistCompleted: 0,
      totalChecklist: 0,
    };
  }

  let trophiesCompleted = 0;
  let totalTrophies = 0;
  let checklistCompleted = 0;
  let totalChecklist = 0;

  for (const trophy of Object.values(progress.trophies)) {
    totalTrophies++;
    if (trophy.completed) trophiesCompleted++;

    for (const checked of Object.values(trophy.checklist)) {
      totalChecklist++;
      if (checked) checklistCompleted++;
    }
  }

  return {
    trophiesCompleted,
    totalTrophies,
    checklistCompleted,
    totalChecklist,
  };
}
