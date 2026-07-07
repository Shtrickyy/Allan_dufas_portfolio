import { HomeSection } from "@/components/sections/HomeSection";
import { SectionLabel } from "@/components/system/SectionLabel";
import { ThinkingCard } from "@/components/thinking/ThinkingCard";
import type { ThinkingSummary } from "@/types/thinking";

type ThinkingPreviewProps = {
  label: string;
  title: string;
  entries: ThinkingSummary[];
  emptyState: string;
};

export function ThinkingPreview({
  label,
  title,
  entries,
  emptyState,
}: ThinkingPreviewProps) {
  return (
    <HomeSection>
      <div className="space-y-8">
        <div className="space-y-4">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="text-2xl leading-snug font-medium tracking-tight text-ink-primary md:text-[2rem] md:leading-[1.2]">
            {title}
          </h2>
        </div>

        {entries.length > 0 ? (
          <div>
            {entries.slice(0, 3).map((entry) => (
              <ThinkingCard key={entry.slug} entry={entry} />
            ))}
          </div>
        ) : (
          <p className="max-w-xl text-base leading-relaxed text-ink-secondary">
            {emptyState}
          </p>
        )}
      </div>
    </HomeSection>
  );
}
