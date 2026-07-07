"use client";

import { CountUp } from "@/components/animations/CountUp";
import { cn } from "@/lib/utils";

import type { ProofChip as ProofChipType } from "@/types/system";

type ProofChipProps = {
  label: string;
  className?: string;
};

export function ProofChip({ label, className }: ProofChipProps) {
  return <CountUp label={label} className={className} />;
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
