import { cn } from "@/lib/utils";

import type { ExperimentStage } from "@/types/experiment";

type StageTagProps = {
  stage: ExperimentStage;
  className?: string;
};

export function StageTag({ stage, className }: StageTagProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-xs font-medium tracking-widest text-ink-secondary uppercase",
        className,
      )}
    >
      {stage}
    </span>
  );
}
