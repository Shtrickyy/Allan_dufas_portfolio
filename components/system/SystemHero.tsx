import { CoverImage } from "@/components/system/CoverImage";
import { MetaChip } from "@/components/system/MetaChip";
import { ProofChipRow } from "@/components/system/ProofChip";
import { SectionLabel } from "@/components/system/SectionLabel";
import {
  caseStudyHeroLead,
  caseStudyHeroTitle,
  caseStudyMetaBlock,
} from "@/components/system/case-study-layout";
import { TextLink } from "@/components/system/TextLink";
import type { System } from "@/types/system";

type SystemHeroProps = {
  system: System;
};

export function SystemHero({ system }: SystemHeroProps) {
  const hasLinks = Boolean(system.liveUrl || system.repositoryUrl);

  return (
    <header className="space-y-8 md:space-y-10">
      <div className="space-y-3">
        <SectionLabel>Case study</SectionLabel>
        <div className="space-y-2">
          <h1 className={caseStudyHeroTitle}>{system.title}</h1>
          <p className="font-mono text-xs font-medium tracking-[0.08em] text-ink-secondary uppercase">
            {system.subtitle}
          </p>
        </div>
      </div>

      <p className={caseStudyHeroLead}>{system.tagline}</p>

      <div className="overflow-hidden rounded-md border border-border bg-surface">
        <CoverImage
          src={system.coverImage}
          alt={`${system.title} cover`}
          title={system.title}
          className="rounded-none border-0"
          priority
        />
      </div>

      <div className={caseStudyMetaBlock}>
        <ProofChipRow chips={system.previewProofChips} />

        <div className="flex flex-wrap gap-2">
          <MetaChip>{system.status}</MetaChip>
          {system.stack.map((item) => (
            <MetaChip key={item}>{item}</MetaChip>
          ))}
        </div>

        {hasLinks ? (
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {system.liveUrl ? (
              <TextLink href={system.liveUrl} external>
                View live demo
              </TextLink>
            ) : null}
            {system.repositoryUrl ? (
              <TextLink href={system.repositoryUrl} external>
                View repository
              </TextLink>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
