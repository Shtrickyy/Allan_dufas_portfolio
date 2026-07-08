import {
  FadeUp,
  FadeUpItem,
  FadeUpStagger,
} from "@/components/animations/FadeUp";
import { HomeSection } from "@/components/sections/HomeSection";
import {
  homeSectionHeader,
  homeSectionLead,
  homeSectionStack,
  homeSectionTitle,
} from "@/components/sections/home-layout";
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
      <div className={homeSectionStack}>
        <FadeUpStagger className={homeSectionHeader}>
          <FadeUpItem>
            <SectionLabel>{label}</SectionLabel>
          </FadeUpItem>
          <FadeUpItem>
            <h2 className={homeSectionTitle}>{title}</h2>
          </FadeUpItem>
        </FadeUpStagger>

        {entries.length > 0 ? (
          <FadeUpStagger>
            <div className="border-t border-border">
              {entries.slice(0, 3).map((entry) => (
                <FadeUpItem key={entry.slug}>
                  <ThinkingCard entry={entry} />
                </FadeUpItem>
              ))}
            </div>
          </FadeUpStagger>
        ) : (
          <FadeUp>
            <p className={`max-w-xl ${homeSectionLead}`}>{emptyState}</p>
          </FadeUp>
        )}
      </div>
    </HomeSection>
  );
}
