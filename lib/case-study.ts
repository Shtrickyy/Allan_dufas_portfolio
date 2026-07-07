export function parseCaseStudySections(
  content: string,
): Record<string, string> {
  const sections: Record<string, string> = {};
  const parts = content.split(/^## /m).slice(1);

  for (const part of parts) {
    const newlineIndex = part.indexOf("\n");
    const title = part.slice(0, newlineIndex).trim();
    const body = part.slice(newlineIndex + 1).trim();
    const key = title
      .toLowerCase()
      .replace(/[^\w]+/g, "-")
      .replace(/^-|-$/g, "");

    sections[key] = body;
  }

  return sections;
}

export function combineSections(
  sections: Record<string, string>,
  keys: string[],
): string | null {
  const parts = keys
    .map((key) => sections[key])
    .filter((value): value is string => Boolean(value));

  return parts.length > 0 ? parts.join("\n\n") : null;
}

export function getDesignSectionTitle(
  sections: Record<string, string>,
): string {
  if (sections["design-decisions"]) {
    return "Design decisions";
  }

  if (sections["lessons-learned"]) {
    return "Lessons learned";
  }

  return "Design decisions";
}
