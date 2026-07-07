import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { CaseStudySection } from "@/components/system/CaseStudySection";
import { SystemGallery } from "@/components/system/SystemGallery";
import { SystemHero } from "@/components/system/SystemHero";
import {
  combineSections,
  getDesignSectionTitle,
  parseCaseStudySections,
} from "@/lib/case-study";
import type { System } from "@/types/system";

type CaseStudyViewProps = {
  system: System;
};

export function CaseStudyView({ system }: CaseStudyViewProps) {
  const sections = parseCaseStudySections(system.content);
  const problemContext = combineSections(sections, [
    "problem",
    "origin",
    "context",
  ]);
  const architecture = sections.system ?? null;
  const designContent = combineSections(sections, [
    "design-decisions",
    "ai-limitations",
    "lessons-learned",
  ]);
  const designTitle = getDesignSectionTitle(sections);
  const results = sections.results ?? system.resultsSummary;
  const nextSteps = sections["next-steps"] ?? null;

  return (
    <PageContainer className="pb-16 md:pb-24 lg:pb-32">
      <Link
        href="/systems"
        className="mb-8 inline-flex text-sm text-ink-secondary transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        ← All systems
      </Link>

      <div className="mx-auto max-w-[680px] space-y-12 md:space-y-16">
        <SystemHero system={system} />
        <CaseStudySection title="Problem & context" content={problemContext} />
        <CaseStudySection title="Architecture" content={architecture} />
        <CaseStudySection title={designTitle} content={designContent} />
        <CaseStudySection title="Results & value" content={results} />
        <CaseStudySection title="Next steps" content={nextSteps} />
      </div>

      <div className="mt-16 md:mt-24">
        <SystemGallery title={system.title} items={system.gallery} />
      </div>
    </PageContainer>
  );
}
