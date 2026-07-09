import type { Metadata } from "next";

import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ExperimentGrid } from "@/components/sections/ExperimentGrid";
import { Hero } from "@/components/sections/Hero";
import { OperatingPrinciples } from "@/components/sections/OperatingPrinciples";
import { PatternSection } from "@/components/sections/PatternSection";
import { SystemPreviewSection } from "@/components/sections/SystemPreviewSection";
import { ThinkingPreview } from "@/components/sections/ThinkingPreview";
import { homeCopy } from "@/constants/home";
import {
  getAllExperiments,
  getAllSystems,
  getAllThinking,
  getPrinciples,
} from "@/lib/mdx";
import { toExperimentSummary } from "@/types/experiment";
import { toSystemSummary } from "@/types/system";
import { toThinkingSummary } from "@/types/thinking";

export const metadata: Metadata = {
  title: "Allan Dufas — I solve the same problem, every time.",
  description:
    "Turning fragmented expertise into coherent decision systems — across products, workflows, training and customer operations.",
};

export default function Home() {
  const systems = getAllSystems().map(toSystemSummary);
  const experiments = getAllExperiments().map(toExperimentSummary);
  const principles = getPrinciples();
  const thinkingEntries = getAllThinking().map(toThinkingSummary).slice(0, 3);

  const [systemOne, systemTwo] = systems;

  return (
    <>
      <Hero thesis={homeCopy.heroThesis} subhead={homeCopy.heroSubhead} />
      {systemOne ? (
        <SystemPreviewSection
          system={systemOne}
          label={homeCopy.sectionLabels.systemOne}
          priority
        />
      ) : null}
      {systemTwo ? (
        <SystemPreviewSection
          system={systemTwo}
          label={homeCopy.sectionLabels.systemTwo}
        />
      ) : null}
      <PatternSection
        label={homeCopy.sectionLabels.pattern}
        headline={homeCopy.patternHeadline}
      />
      <OperatingPrinciples
        label={homeCopy.sectionLabels.principles}
        title={homeCopy.sectionTitles.operatingPrinciples}
        principles={principles}
      />
      <ExperimentGrid
        label={homeCopy.sectionLabels.experiments}
        title={homeCopy.sectionTitles.experiments}
        experiments={experiments}
      />
      <AboutTeaser
        label={homeCopy.sectionLabels.about}
        title={homeCopy.sectionTitles.aboutTeaser}
        teaserLine={homeCopy.aboutTeaser}
      />
      <ThinkingPreview
        label={homeCopy.sectionLabels.thinking}
        title={homeCopy.sectionTitles.thinkingPreview}
        entries={thinkingEntries}
        emptyState={homeCopy.thinkingEmptyState}
      />
    </>
  );
}
