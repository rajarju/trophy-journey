import { Game } from "./types";
import fs from "fs";
import path from "path";

const GAMES_DIR = path.join(process.cwd(), "data", "games");

export async function getGame(slug: string): Promise<Game | null> {
  try {
    const filePath = path.join(GAMES_DIR, `${slug}.json`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents) as Game;
  } catch {
    return null;
  }
}

export async function getAllGames(): Promise<Game[]> {
  try {
    const files = fs.readdirSync(GAMES_DIR);
    const games: Game[] = [];

    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(GAMES_DIR, file);
        const fileContents = fs.readFileSync(filePath, "utf8");
        games.push(JSON.parse(fileContents) as Game);
      }
    }

    return games;
  } catch {
    return [];
  }
}

export function getGameSlugs(): string[] {
  try {
    const files = fs.readdirSync(GAMES_DIR);
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(".json", ""));
  } catch {
    return [];
  }
}
