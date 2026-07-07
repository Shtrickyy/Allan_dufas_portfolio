import {
  FadeUp,
  FadeUpItem,
  FadeUpStagger,
} from "@/components/animations/FadeUp";
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
        <FadeUpStagger className="space-y-4">
          <FadeUpItem>
            <SectionLabel>{label}</SectionLabel>
          </FadeUpItem>
          <FadeUpItem>
            <h2 className="text-2xl leading-snug font-medium tracking-tight text-ink-primary md:text-[2rem] md:leading-[1.2]">
              {title}
            </h2>
          </FadeUpItem>
        </FadeUpStagger>

        {entries.length > 0 ? (
          <FadeUpStagger>
            <div>
              {entries.slice(0, 3).map((entry) => (
                <FadeUpItem key={entry.slug}>
                  <ThinkingCard entry={entry} />
                </FadeUpItem>
              ))}
            </div>
          </FadeUpStagger>
        ) : (
          <FadeUp>
            <p className="max-w-xl text-base leading-relaxed text-ink-secondary">
              {emptyState}
            </p>
          </FadeUp>
        )}
      </div>
    </HomeSection>
  );
}
