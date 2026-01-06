export type TrophyType = "platinum" | "gold" | "silver" | "bronze";

export interface ChecklistItem {
  id: string;
  label: string;
  location?: string;
  notes?: string;
  walkthrough?: string; // Detailed step-by-step directions
}

export interface Trophy {
  id: string;
  name: string;
  description: string;
  type: TrophyType;
  isMissable: boolean;
  missableContext?: string;
  guide: string; // Brief summary
  walkthrough?: string; // Detailed walkthrough with strategies
  prerequisites?: string[]; // Required abilities or items
  farmingTip?: string; // Best location/method for farming
  checklist?: ChecklistItem[];
}

export interface GameMetadata {
  estimatedTime: string;
  difficulty: string;
  playthroughsRequired: number;
  missableTrophies: number;
  onlineRequired: boolean;
}

export interface JourneyIntro {
  overview: string;
  recommendedApproach: string;
  warnings: string[];
}

export interface SuggestedPhase {
  phase: string;
  description: string;
  trophyIds: string[];
}

export interface Game {
  slug: string;
  title: string;
  platform: string;
  coverImage?: string; // Populated by fetch-game-images script from RAWG
  rawgId?: number;
  rawgSlug?: string;
  metadata: GameMetadata;
  journeyIntro: JourneyIntro;
  trophies: Trophy[];
  suggestedOrder: SuggestedPhase[];
}

// localStorage types
export interface TrophyProgress {
  completed: boolean;
  checklist: Record<string, boolean>;
}

export interface GameProgress {
  startedAt: string;
  lastUpdatedAt: string;
  trophies: Record<string, TrophyProgress>;
}

export interface UserProgress {
  version: number;
  games: Record<string, GameProgress>;
}
