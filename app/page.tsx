import type { Metadata } from "next";

import { NarrativeHome } from "@/components/home/NarrativeHome";
import { getHomeNarrative } from "@/lib/home-narrative";

export function generateMetadata(): Metadata {
  const { metadata } = getHomeNarrative();

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function Home() {
  const narrative = getHomeNarrative();

  return <NarrativeHome narrative={narrative} />;
}
