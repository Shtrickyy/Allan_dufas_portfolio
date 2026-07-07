export const systemsPageCopy = {
  title: "Systems",
  description:
    "Two flagship systems — Training OS and Handover Engine — built with the same decision pattern in different domains.",
  experimentsLabel: "03 — In Motion",
  experimentsTitle: "In Motion",
} as const;

export function formatSystemCardLabel(order: number, title: string): string {
  return `${String(order).padStart(2, "0")} — ${title}`;
}
