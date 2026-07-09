import Link from "next/link";

import { FadeUpItem, FadeUpStagger } from "@/components/animations/FadeUp";
import { InteractiveMediaFrame } from "@/components/animations/InteractiveMediaFrame";
import { HomeSection } from "@/components/sections/HomeSection";
import {
  homeMetaRow,
  homeSectionHeader,
  homeSectionLead,
  homeSectionStack,
  homeSectionTitle,
} from "@/components/sections/home-layout";
import { ProofChipRow } from "@/components/system/ProofChip";
import { SectionLabel } from "@/components/system/SectionLabel";
import { ViewSystemLink } from "@/components/system/TextLink";
import { resolveCoverImage } from "@/lib/public-image";
import type { SystemSummary } from "@/types/system";

type SystemPreviewSectionProps = {
  system: SystemSummary;
  label: string;
  priority?: boolean;
};

export function SystemPreviewSection({
  system,
  label,
  priority = false,
}: SystemPreviewSectionProps) {
  const cover = resolveCoverImage(system.heroImage);

  return (
    <HomeSection>
      <FadeUpStagger className={homeSectionStack}>
        <FadeUpItem>
          <div className={homeSectionHeader}>
            <SectionLabel>{label}</SectionLabel>
            <h2 className={homeSectionTitle}>{system.title}</h2>
            <p className={homeSectionLead}>{system.tagline}</p>
          </div>
        </FadeUpItem>
        <FadeUpItem>
          <Link
            href={system.href}
            className="group/link block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <InteractiveMediaFrame
              title={system.title}
              coverAlt={`${system.title} cover`}
              priority={priority}
              {...cover}
            />
          </Link>
        </FadeUpItem>
        <FadeUpItem>
          <div className={homeMetaRow}>
            <ProofChipRow chips={system.proofChips} />
            <ViewSystemLink href={system.href} className="shrink-0" />
          </div>
        </FadeUpItem>
      </FadeUpStagger>
    </HomeSection>
  );
}
