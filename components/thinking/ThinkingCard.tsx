import { TextLink } from "@/components/system/TextLink";
import type { ThinkingSummary } from "@/types/thinking";

type ThinkingCardProps = {
  entry: ThinkingSummary;
};

export function ThinkingCard({ entry }: ThinkingCardProps) {
  return (
    <article className="space-y-3 border-b border-border py-6 last:border-b-0">
      <TextLink href={entry.href}>
        <span>{entry.title}</span>
        <span aria-hidden>→</span>
      </TextLink>
      <p className="font-mono text-xs font-medium tracking-widest text-ink-secondary uppercase">
        {entry.date}
      </p>
      <p className="text-sm leading-relaxed text-ink-secondary">
        {entry.excerpt}
      </p>
    </article>
  );
}
