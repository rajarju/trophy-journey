# Trophy Journey

A companion app for PlayStation trophy hunters that transforms complex trophy guides into interactive, enjoyable journeys.

## Vision

Trophy hunting often turns into a chore—managing spreadsheets, juggling browser tabs with guides, and constantly checking what you've missed. Trophy Journey changes that by providing curated, structured "trophy journeys" that help players enjoy the game while tracking their progress toward platinum.

The app takes existing trophy guides, processes them through AI to create interactive checklists, and presents them in a mobile-friendly interface designed to sit beside you while you play.

## Core Concept

### The Problem

- Trophy guides are walls of text that are hard to track progress against
- Players lose the joy of the game by obsessing over completion
- Missable trophies create anxiety about making mistakes
- Tracking progress across collectibles, activities, and achievements is tedious
- Switching between devices loses your progress

### The Solution

**Trophy Journey** provides:

1. **Curated Trophy Journeys**: Each game has a structured journey that guides players through the optimal approach—enjoy the game first, then clean up remaining trophies
2. **Interactive Checklists**: Every trophy breaks down into trackable items (locations to visit, collectibles to find, activities to complete)
3. **Contextual Guidance**: Missable trophies are flagged upfront, with advice on how to approach them
4. **Mobile-First Design**: Built to be your companion while gaming—quick to check, easy to update

## Features

### For Players (v1)

- Browse available game journeys
- View trophy breakdown with detailed checklists
- Track progress on individual checklist items
- See journey introduction with recommended playthrough approach
- Missable trophy warnings and guidance
- Progress persisted locally (works offline)
- Mobile-friendly, thumb-optimized interface

### For Admins (v1 - Internal)

- Manual pipeline to add new games
- LLM-assisted conversion of trophy guides to structured data
- JSON-based game data stored in repository

### Future Considerations

- User authentication
- Cross-device sync
- User-submitted games
- Community features
- Premium features (TBD)

## Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | Next.js | Full-stack capability, API routes for future features, familiar ecosystem |
| Game Data | Static JSON files | Simple, version-controlled, easy to migrate to DB later |
| User Progress | localStorage | No auth required, works offline, zero friction to start |
| Hosting | Vercel | Seamless Next.js deployment, easy to change later |
| Styling | TBD (Tailwind recommended) | Mobile-first, utility-based |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Next.js App                       │
├─────────────────────────────────────────────────────┤
│  Pages/Routes                                        │
│  ├── /                    → Landing/Home            │
│  ├── /games               → Game library            │
│  └── /games/[slug]        → Game journey & tracking │
├─────────────────────────────────────────────────────┤
│  API Routes (future)                                 │
│  └── /api/*               → Auth, sync, etc.        │
├─────────────────────────────────────────────────────┤
│  Data Layer                                          │
│  ├── /data/games/*.json   → Static game data        │
│  └── localStorage         → User progress           │
└─────────────────────────────────────────────────────┘
```

## Data Schema

### Game Data Structure

```json
{
  "slug": "jedi-survivor",
  "title": "Star Wars Jedi: Survivor",
  "platform": "PS5",
  "coverImage": "/images/games/jedi-survivor.jpg",
  "metadata": {
    "estimatedTime": "40-50 hours",
    "difficulty": "3/10",
    "playthroughsRequired": 1,
    "missableTrophies": 0,
    "onlineRequired": false
  },
  "journeyIntro": {
    "overview": "Jedi: Survivor is a collectible-heavy game, but almost everything can be cleaned up after completing the story...",
    "recommendedApproach": "Play through the story naturally, enjoying the exploration. After completing the main campaign, use chapter select to clean up any remaining collectibles.",
    "warnings": [
      "No missable trophies - everything can be obtained after story completion",
      "Some areas only unlock after story progression"
    ]
  },
  "trophies": [
    {
      "id": "platinum-001",
      "name": "A New Star Wars Story",
      "description": "Collect all trophies",
      "type": "platinum",
      "isMissable": false,
      "missableContext": null,
      "guide": "Obtain all other trophies to unlock the platinum.",
      "checklist": null
    },
    {
      "id": "gold-001",
      "name": "Explore the Galaxy",
      "description": "Visit all planets",
      "type": "gold",
      "isMissable": false,
      "missableContext": null,
      "guide": "Progress through the story to unlock all planets, then visit each one.",
      "checklist": [
        {
          "id": "planet-coruscant",
          "label": "Coruscant",
          "location": "Available from start",
          "notes": "Opening level"
        },
        {
          "id": "planet-koboh",
          "label": "Koboh",
          "location": "Story progression",
          "notes": "Main hub planet"
        },
        {
          "id": "planet-jedha",
          "label": "Jedha",
          "location": "Story progression",
          "notes": null
        }
      ]
    },
    {
      "id": "bronze-001",
      "name": "Collector",
      "description": "Find 50 collectibles",
      "type": "bronze",
      "isMissable": false,
      "missableContext": null,
      "guide": "Collectibles are scattered across all planets. Use the holomap to track undiscovered items in each area.",
      "checklist": [
        {
          "id": "collectible-datadisc-1",
          "label": "Data Disc - Koboh Cave",
          "location": "Koboh - Derelict Dam",
          "notes": "Behind breakable wall"
        }
      ]
    }
  ],
  "suggestedOrder": [
    {
      "phase": "First Playthrough",
      "description": "Enjoy the story, explore naturally",
      "trophyIds": ["gold-001", "bronze-001"]
    },
    {
      "phase": "Cleanup",
      "description": "Return to each planet to find remaining collectibles",
      "trophyIds": ["bronze-001"]
    }
  ]
}
```

### User Progress Structure (localStorage)

```json
{
  "version": 1,
  "games": {
    "jedi-survivor": {
      "startedAt": "2024-01-15T10:30:00Z",
      "lastUpdatedAt": "2024-01-20T18:45:00Z",
      "trophies": {
        "gold-001": {
          "completed": false,
          "checklist": {
            "planet-coruscant": true,
            "planet-koboh": true,
            "planet-jedha": false
          }
        },
        "bronze-001": {
          "completed": false,
          "checklist": {
            "collectible-datadisc-1": true
          }
        }
      }
    }
  }
}
```

## User Flows

### Flow 1: New User Discovers a Game

1. User lands on home page
2. Browses available games or searches
3. Selects a game they're playing
4. Sees journey introduction with recommended approach
5. Reviews trophy list and complexity
6. Starts tracking their journey

### Flow 2: Active Tracking Session

1. User opens app on phone while gaming
2. Navigates to their active game
3. Views current trophy they're working on
4. Checks off items as they complete them
5. Progress saves automatically to localStorage
6. Can quickly switch between trophies

### Flow 3: Cleanup Phase

1. User has completed main story
2. Views remaining uncompleted trophies
3. Selects a trophy to focus on
4. Works through remaining checklist items
5. Marks trophy as complete when done

## Admin Pipeline (Adding New Games)

### Phase 1: Manual Process

1. **Find Trophy Guide**: Locate comprehensive guide on PSNProfiles, PowerPyx, or similar
2. **Prepare for LLM**: Copy guide content
3. **LLM Processing**: Use prompt to convert guide into JSON schema format
4. **Review & Edit**: Manually verify and fix any issues in generated JSON
5. **Add to Repository**: Place JSON file in `/data/games/` directory
6. **Add Cover Image**: Source and add game cover image
7. **Test**: Verify game displays correctly in app
8. **Commit & Deploy**: Push changes, Vercel auto-deploys

### LLM Prompt Template (for adding games)

```
I need you to convert this PlayStation trophy guide into a structured JSON format.

Here is the schema to follow:
[Include schema from above]

Here is the trophy guide:
[Paste guide content]

Please:
1. Extract all trophies with their descriptions and types
2. Break down each trophy into checklist items where applicable
3. Identify any missable trophies and explain when/why
4. Write a journey introduction with recommended playthrough approach
5. Suggest a logical order for tackling trophies

Output valid JSON only.
```

## Project Structure

```
trophy-journey/
├── app/                      # Next.js app directory
│   ├── page.tsx              # Home/landing page
│   ├── games/
│   │   ├── page.tsx          # Game library
│   │   └── [slug]/
│   │       └── page.tsx      # Individual game journey
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── ui/                   # Generic UI components
│   ├── game/                 # Game-specific components
│   │   ├── TrophyCard.tsx
│   │   ├── ChecklistItem.tsx
│   │   ├── JourneyIntro.tsx
│   │   └── ProgressBar.tsx
│   └── layout/               # Layout components
│       ├── Header.tsx
│       ├── Navigation.tsx
│       └── MobileNav.tsx
├── data/
│   └── games/                # Static game JSON files
│       ├── jedi-survivor.json
│       └── ...
├── lib/                      # Utility functions
│   ├── games.ts              # Game data loading utilities
│   ├── progress.ts           # localStorage progress management
│   └── types.ts              # TypeScript type definitions
├── hooks/                    # Custom React hooks
│   ├── useProgress.ts        # Hook for managing user progress
│   └── useGame.ts            # Hook for loading game data
├── public/
│   └── images/
│       └── games/            # Game cover images
├── docs/                     # Additional documentation
├── README.md
├── package.json
└── tsconfig.json
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Getting Started

```bash
# Clone the repository
git clone https://github.com/[username]/trophy-journey.git
cd trophy-journey

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Roadmap

### Phase 1 (Current)

- [x] Define project scope and architecture
- [ ] Set up Next.js project with TypeScript
- [ ] Implement game data schema and loading
- [ ] Build localStorage progress management
- [ ] Create core UI components (mobile-first)
- [ ] Add first game (Jedi Survivor)
- [ ] Deploy to Vercel

### Phase 2

- [ ] Add more games (5-10)
- [ ] Improve UI/UX based on usage
- [ ] Add search and filtering
- [ ] PWA support for home screen installation

### Phase 3

- [ ] User authentication
- [ ] Cloud sync for progress
- [ ] User-submitted games (moderated)

### Future Ideas

- Community features (shared tips, completion times)
- Integration with PSN API for automatic trophy detection
- Premium features
- Native mobile apps

## Contributing

This is currently a personal project. Once it matures, contribution guidelines will be added.

## License

TBD

## Acknowledgments

- Trophy guide sources: PSNProfiles, PowerPyx, and the trophy hunting community
- Inspired by the joy (and pain) of platinum hunting
