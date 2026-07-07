import { HomeSection } from "@/components/sections/HomeSection";
import { SectionLabel } from "@/components/system/SectionLabel";
import { SystemCard } from "@/components/system/SystemCard";
import type { ExperimentSummary } from "@/types/experiment";

type ExperimentGridProps = {
  label: string;
  title: string;
  experiments: ExperimentSummary[];
};

export function ExperimentGrid({
  label,
  title,
  experiments,
}: ExperimentGridProps) {
  return (
    <HomeSection>
      <div className="space-y-8">
        <div className="space-y-4">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="text-2xl leading-snug font-medium tracking-tight text-ink-primary md:text-[2rem] md:leading-[1.2]">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {experiments.map((experiment) => (
            <SystemCard key={experiment.slug} experiment={experiment} />
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
