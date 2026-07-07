import { cn } from "@/lib/utils";

import { MediaPlaceholder } from "@/components/system/MediaPlaceholder";
import { StageTag } from "@/components/system/StageTag";
import type { ExperimentSummary } from "@/types/experiment";

type SystemCardProps = {
  experiment: ExperimentSummary;
  className?: string;
};

export function SystemCard({ experiment, className }: SystemCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-md border border-border bg-surface",
        className,
      )}
    >
      <MediaPlaceholder
        title={experiment.title}
        className="rounded-none border-0"
      />
      <div className="space-y-4 p-6">
        <h3 className="text-lg font-medium leading-snug text-ink-primary md:text-xl">
          {experiment.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink-secondary">
          {experiment.tagline}
        </p>
        <StageTag stage={experiment.stage} />
      </div>
    </article>
  );
}
