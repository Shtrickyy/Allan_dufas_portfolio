import "server-only";

import fs from "fs";
import path from "path";

import type { HomeNarrative } from "@/types/home-narrative";

const NARRATIVE_PATH = path.join(process.cwd(), "content/home/narrative.json");

export function getHomeNarrative(): HomeNarrative {
  if (!fs.existsSync(NARRATIVE_PATH)) {
    throw new Error("Missing content/home/narrative.json");
  }

  const raw = fs.readFileSync(NARRATIVE_PATH, "utf8");
  const parsed = JSON.parse(raw) as HomeNarrative;

  if (!parsed.chapters?.one || !parsed.chapters?.six) {
    throw new Error(
      'Invalid narrative.json: expected six chapters under "chapters"',
    );
  }

  return parsed;
}
