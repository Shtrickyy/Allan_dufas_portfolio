import Link from "next/link";

import { HomeSection } from "@/components/sections/HomeSection";
import { MediaPlaceholder } from "@/components/system/MediaPlaceholder";
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
      <div className="space-y-6">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="text-2xl leading-snug font-medium tracking-tight text-ink-primary md:text-[2rem] md:leading-[1.2]">
          {system.title}
        </h2>
        <p className="max-w-3xl text-base leading-relaxed text-ink-secondary md:text-lg md:leading-[1.6]">
          {system.tagline}
        </p>

        <Link
          href={system.href}
          className="group/link block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <MediaPlaceholder title={system.title} />
        </Link>

        <ProofChipRow chips={system.proofChips} />
        <ViewSystemLink href={system.href} />
      </div>
    </HomeSection>
  );
}
