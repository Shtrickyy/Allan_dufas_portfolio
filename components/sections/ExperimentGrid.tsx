import { FadeUpItem, FadeUpStagger } from "@/components/animations/FadeUp";
import { HomeSection } from "@/components/sections/HomeSection";
import { SystemCard } from "@/components/system/SystemCard";
import { SectionLabel } from "@/components/system/SectionLabel";
import type { ExperimentSummary } from "@/types/experiment";

type ExperimentGridProps = {
  label: string;
  title: string;
  experiments: ExperimentSummary[];
  embedded?: boolean;
};

export function ExperimentGrid({
  label,
  title,
  experiments,
  embedded = false,
}: ExperimentGridProps) {
  const content = (
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
      <FadeUpStagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {experiments.map((experiment) => (
          <FadeUpItem key={experiment.slug}>
            <SystemCard experiment={experiment} />
          </FadeUpItem>
        ))}
      </FadeUpStagger>
    </div>
  );

  if (embedded) {
    return (
      <section className="mt-16 border-t border-border pt-16 md:mt-24 md:pt-24">
        {content}
      </section>
    );
  }

  return <HomeSection>{content}</HomeSection>;
}
