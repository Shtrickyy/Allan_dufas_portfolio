import Link from "next/link";

import { FadeUpItem, FadeUpStagger } from "@/components/animations/FadeUp";
import { InteractiveMediaFrame } from "@/components/animations/InteractiveMediaFrame";
import { HomeSection } from "@/components/sections/HomeSection";
import { ProofChipRow } from "@/components/system/ProofChip";
import { SectionLabel } from "@/components/system/SectionLabel";
import { ViewSystemLink } from "@/components/system/TextLink";
import type { SystemSummary } from "@/types/system";

type SystemPreviewSectionProps = {
  system: SystemSummary;
  label: string;
};

export function SystemPreviewSection({
  system,
  label,
}: SystemPreviewSectionProps) {
  return (
    <HomeSection>
      <FadeUpStagger className="space-y-6">
        <FadeUpItem>
          <SectionLabel>{label}</SectionLabel>
        </FadeUpItem>
        <FadeUpItem>
          <h2 className="text-2xl leading-snug font-medium tracking-tight text-ink-primary md:text-[2rem] md:leading-[1.2]">
            {system.title}
          </h2>
        </FadeUpItem>
        <FadeUpItem>
          <p className="max-w-3xl text-base leading-relaxed text-ink-secondary md:text-lg md:leading-[1.6]">
            {system.tagline}
          </p>
        </FadeUpItem>
        <FadeUpItem>
          <Link
            href={system.href}
            className="group/link block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <InteractiveMediaFrame title={system.title} />
          </Link>
        </FadeUpItem>
        <FadeUpItem>
          <ProofChipRow chips={system.proofChips} />
        </FadeUpItem>
        <FadeUpItem>
          <ViewSystemLink href={system.href} />
        </FadeUpItem>
      </FadeUpStagger>
    </HomeSection>
  );
}
