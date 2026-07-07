import { cn } from "@/lib/utils";

import type { ProofChip as ProofChipType } from "@/types/system";

type ProofChipProps = {
  label: string;
  className?: string;
};

export function ProofChip({ label, className }: ProofChipProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-xs font-medium tracking-widest text-ink-primary uppercase",
        className,
      )}
    >
      {label}
    </span>
  );
}

type ProofChipRowProps = {
  chips: ProofChipType[];
  className?: string;
};

export function ProofChipRow({ chips, className }: ProofChipRowProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {chips.map((chip) => (
        <ProofChip key={chip.label} label={chip.label} />
      ))}
    </div>
  );
}
