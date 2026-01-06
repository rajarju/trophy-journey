/**
 * Script to fetch game images from RAWG API and update game JSON files.
 * Run with: npx tsx scripts/fetch-game-images.ts
 */

import fs from "fs";
import path from "path";

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const RAWG_BASE_URL = "https://api.rawg.io/api";
const GAMES_DIR = path.join(process.cwd(), "data", "games");

interface RawgGame {
  id: number;
  slug: string;
  name: string;
  background_image: string | null;
  rating: number;
  released: string;
  metacritic: number | null;
}

interface RawgSearchResult {
  count: number;
  results: RawgGame[];
}

async function searchGame(query: string): Promise<RawgGame | null> {
  if (!RAWG_API_KEY) {
    console.error("RAWG_API_KEY not set in environment");
    process.exit(1);
  }

  try {
    const response = await fetch(
      `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(query)}&page_size=1`
    );

    if (!response.ok) {
      console.error(`RAWG API error: ${response.status}`);
      return null;
    }

    const data: RawgSearchResult = await response.json();
    return data.results[0] || null;
  } catch (error) {
    console.error("Failed to fetch from RAWG:", error);
    return null;
  }
}

async function updateGameImages() {
  console.log("Fetching game images from RAWG...\n");

  const files = fs.readdirSync(GAMES_DIR).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const filePath = path.join(GAMES_DIR, file);
    const content = fs.readFileSync(filePath, "utf8");
    const game = JSON.parse(content);

    // Skip if already has a RAWG image
    if (game.coverImage && game.coverImage.includes("rawg.io")) {
      console.log(`✓ ${game.title} - already has RAWG image`);
      continue;
    }

    console.log(`Searching for: ${game.title}...`);
    const rawgGame = await searchGame(game.title);

    if (rawgGame?.background_image) {
      game.coverImage = rawgGame.background_image;
      game.rawgId = rawgGame.id;
      game.rawgSlug = rawgGame.slug;

      fs.writeFileSync(filePath, JSON.stringify(game, null, 2) + "\n");
      console.log(`  ✓ Updated with image: ${rawgGame.background_image.substring(0, 60)}...`);
    } else {
      console.log(`  ✗ No image found`);
    }

    // Rate limiting - wait 250ms between requests
    await new Promise((r) => setTimeout(r, 250));
  }

  console.log("\nDone!");
}

updateGameImages();
