# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trophy Journey is a companion app for PlayStation trophy hunters that transforms complex trophy guides into interactive, trackable journeys. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

**Status**: Early development phase - architecture defined in README.md, implementation starting.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

**Data Flow**: Static JSON game files → React components → localStorage for user progress

- `/app` - Next.js App Router pages
  - `/` - Landing page
  - `/games` - Game library
  - `/games/[slug]` - Individual game journey and tracking
- `/components` - React components organized by type (ui/, game/, layout/)
- `/data/games` - Static JSON files for each game
- `/lib` - Utilities: games.ts (data loading), progress.ts (localStorage), types.ts
- `/hooks` - Custom hooks: useProgress.ts, useGame.ts

**Key Patterns**:
- localStorage for user progress (no auth in v1)
- Mobile-first, thumb-optimized UI
- Game data is static JSON, version-controlled
- No backend database in v1

## Game Data Schema

Each game JSON in `/data/games/` contains:
- `slug`, `title`, `platform`, `coverImage`
- `metadata` - estimatedTime, difficulty, playthroughsRequired, missableTrophies, onlineRequired
- `journeyIntro` - overview, recommendedApproach, warnings[]
- `trophies[]` - id, name, description, type, isMissable, guide, checklist[]
- `suggestedOrder[]` - phases for recommended playthrough

Trophy IDs use format: `{type}-{number}` (e.g., gold-001, bronze-001)

## Adding a New Game

1. Find trophy guide (PSNProfiles, PowerPyx)
2. Use LLM prompt from README.md to convert to JSON schema
3. Place JSON in `/data/games/{slug}.json`
4. Add cover image to `/public/images/games/`
5. Test at localhost:3000/games/{slug}

## Important Notes

- Always quote Next.js file paths in git commands: `git add "app/games/[slug]/page.tsx"`
- Progress stored in localStorage under `games[slug].trophies[id].checklist`
- All game data changes deploy automatically via Vercel on commit
