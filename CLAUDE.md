# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trophy Journey is a companion app for PlayStation trophy hunters that transforms complex trophy guides into interactive, trackable journeys. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Repository Structure

This is a monorepo with the Next.js app in the `web/` subdirectory:

```
trophy-journey/
├── web/                      # Next.js application
│   ├── app/                  # Next.js App Router pages
│   │   ├── games/            # Game library and detail pages
│   │   └── page.tsx          # Landing page
│   ├── components/           # React components (ui/, game/)
│   ├── data/games/           # Static JSON files for each game
│   ├── hooks/                # Custom hooks (useProgress.ts)
│   ├── lib/                  # Utilities (games.ts, progress.ts, types.ts)
│   └── scripts/              # CLI scripts for data management
├── README.md                 # Project documentation
└── CLAUDE.md                 # This file
```

## Commands

Run all commands from the `web/` directory:

```bash
cd web
pnpm install      # Install dependencies
pnpm run dev      # Start development server at localhost:3000
pnpm run build    # Build for production
pnpm run start    # Start production server
pnpm run lint     # Run ESLint
```

## Architecture

**Data Flow**: Static JSON game files → React components → localStorage for user progress

**Key Patterns**:
- localStorage for user progress (no auth in v1)
- Mobile-first, thumb-optimized UI
- Game data is static JSON, version-controlled
- Cover images fetched from RAWG API and stored in JSON (not fetched at runtime)
- No backend database in v1

## Game Data Schema

Each game JSON in `web/data/games/` follows this structure:

```typescript
{
  slug: string;              // URL-friendly identifier (e.g., "jedi-survivor")
  title: string;             // Display name
  platform: string;          // e.g., "PS5", "PS4/PS5"
  coverImage?: string;       // RAWG image URL (populated by script)
  rawgId?: number;           // RAWG game ID (populated by script)
  rawgSlug?: string;         // RAWG slug (populated by script)
  metadata: {
    estimatedTime: string;   // e.g., "40-50 hours"
    difficulty: string;      // e.g., "3/10"
    playthroughsRequired: number;
    missableTrophies: number;
    onlineRequired: boolean;
  };
  journeyIntro: {
    overview: string;
    recommendedApproach: string;
    warnings: string[];
  };
  trophies: Trophy[];        // Array of all trophies
  suggestedOrder: Phase[];   // Recommended playthrough phases
}
```

**Trophy structure**:
```typescript
{
  id: string;                // Format: {type}-{number} (e.g., "gold-001")
  name: string;
  description: string;
  type: "platinum" | "gold" | "silver" | "bronze";
  isMissable: boolean;
  missableContext?: string;  // Why it's missable
  guide: string;             // Brief summary
  walkthrough?: string;      // Detailed steps
  prerequisites?: string[];  // Required abilities/items
  farmingTip?: string;       // Best farming location/method
  checklist?: ChecklistItem[];
}
```

**Checklist item structure**:
```typescript
{
  id: string;
  label: string;
  location?: string;
  notes?: string;
  walkthrough?: string;      // Detailed directions for this item
}
```

## Adding a New Game

### Step 1: Create the Game JSON

1. Find a comprehensive trophy guide (PowerPyx, PSNProfiles, PlayStationTrophies)
2. Create a new JSON file: `web/data/games/{slug}.json`
3. Populate the JSON with trophy data following the schema above

**Tips for scraping trophy data**:
- PowerPyx guides have detailed walkthroughs and roadmaps
- PSNProfiles has accurate trophy descriptions and rarity data
- Include ALL trophies (platinum, gold, silver, bronze)
- Mark missable trophies clearly with `missableContext`
- Add checklists for collectible-based trophies

### Step 2: Fetch Cover Image from RAWG

The project uses RAWG API to fetch game cover images. Images are stored as URLs in the JSON (not downloaded locally), and Next.js handles caching/optimization.

**Setup** (one-time):
```bash
# Add your RAWG API key to web/.env.local
RAWG_API_KEY=your_api_key_here
```

Get a free API key at: https://rawg.io/apidocs

**Fetch images for all games**:
```bash
cd web
RAWG_API_KEY=your_key npx tsx scripts/fetch-game-images.ts
```

This script:
- Reads all JSON files in `data/games/`
- Searches RAWG for each game by title
- Updates JSON with `coverImage`, `rawgId`, and `rawgSlug`
- Skips games that already have RAWG images

**Manual image URL** (alternative):
If RAWG doesn't find the correct game, manually add the `coverImage` URL to the JSON. The URL must be from `media.rawg.io` (already configured in Next.js) or you'll need to add the domain to `next.config.ts`.

### Step 3: Test and Verify

```bash
cd web
pnpm run build    # Verify no TypeScript errors
pnpm run dev      # Test at localhost:3000/games/{slug}
```

Check:
- Game appears in the games list with cover image
- All trophies display correctly
- Expandable trophy cards show walkthroughs
- Checklists are interactive

### Step 4: Commit

```bash
git add "data/games/{slug}.json"
git commit -m "Add {Game Title} trophy data"
git push
```

## Updating Existing Games

To refresh trophy data or add more detail:

1. Edit the JSON file directly in `web/data/games/{slug}.json`
2. To refresh the cover image: delete `coverImage`, `rawgId`, `rawgSlug` fields and re-run the fetch script
3. Build and test: `pnpm run build && pnpm run dev`

## Important Notes

- Always quote Next.js file paths in git commands: `git add "web/app/games/[slug]/page.tsx"`
- Progress stored in localStorage under `trophy-journey-progress`
- RAWG images are cached by Next.js Image component (not downloaded to repo)
- All game data changes deploy automatically via Vercel on commit
