"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { InteractiveMediaFrame } from "@/components/animations/InteractiveMediaFrame";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { MetaChip } from "@/components/system/MetaChip";
import { ProofChipRow } from "@/components/system/ProofChip";
import { SectionLabel } from "@/components/system/SectionLabel";
import { StageTag } from "@/components/system/StageTag";
import type { ExperimentSummary } from "@/types/experiment";
import type { SystemIndexCard } from "@/types/system";
import { cn } from "@/lib/utils";

type SystemCardExperimentProps = {
  variant?: "experiment";
  experiment: ExperimentSummary;
  className?: string;
};

type SystemCardFlagshipProps = {
  variant: "flagship";
  system: SystemIndexCard;
  label: string;
  className?: string;
};

type SystemCardProps = SystemCardExperimentProps | SystemCardFlagshipProps;

function CardHoverMotion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotionSafe();

  return (
    <motion.article
      className={className}
      whileHover={
        reducedMotion
          ? {
              borderColor: "var(--color-border-accent-20)",
            }
          : {
              y: -2,
              borderColor: "var(--color-border-accent-20)",
              boxShadow: "var(--shadow-elevation-1)",
            }
      }
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.article>
  );
}

export function SystemCard(props: SystemCardProps) {
  if (props.variant === "flagship") {
    const { system, label, className } = props;
    const href = `/systems/${system.slug}`;

    return (
      <Link
        href={href}
        className={cn(
          "group block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
          className,
        )}
      >
        <CardHoverMotion className="overflow-hidden rounded-md border border-border bg-surface">
          <InteractiveMediaFrame
            title={system.title}
            className="rounded-none border-0"
          />
          <div className="space-y-4 p-6">
            <SectionLabel>{label}</SectionLabel>
            <h3 className="text-lg font-medium leading-snug text-ink-primary md:text-xl">
              {system.title}
            </h3>
            <p className="font-mono text-xs font-medium tracking-widest text-ink-secondary uppercase">
              {system.subtitle}
            </p>
            <p className="text-sm leading-relaxed text-ink-secondary">
              {system.tagline}
            </p>
            <ProofChipRow chips={system.previewProofChips} />
            <MetaChip>{system.status}</MetaChip>
            <div className="flex flex-wrap gap-2">
              {system.stack.map((item) => (
                <MetaChip key={item}>{item}</MetaChip>
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-base text-ink-primary transition-colors duration-200 group-hover:text-accent">
              <span>View the system</span>
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </div>
        </CardHoverMotion>
      </Link>
    );
  }

  const { experiment, className } = props;

  return (
    <CardHoverMotion
      className={cn(
        "overflow-hidden rounded-md border border-border bg-surface",
        className,
      )}
    >
      <InteractiveMediaFrame
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
    </CardHoverMotion>
  );
}
