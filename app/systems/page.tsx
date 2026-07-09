import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { ScaffoldHeading } from "@/components/layout/ScaffoldHeading";
import { ExperimentGrid } from "@/components/sections/ExperimentGrid";
import { SystemsIndexGrid } from "@/components/sections/SystemsIndexGrid";
import { systemsPageCopy } from "@/constants/systems";
import { getAllExperiments, getSystemIndexCards } from "@/lib/mdx";
import { toExperimentSummary } from "@/types/experiment";

export const metadata: Metadata = {
  title: "Systems — Allan Dufas",
  description: systemsPageCopy.description,
};

export default function SystemsPage() {
  const systems = getSystemIndexCards();
  const experiments = getAllExperiments().map(toExperimentSummary);

  return (
    <PageContainer className="pb-20 md:pb-28 lg:pb-32">
      <ScaffoldHeading
        title={systemsPageCopy.title}
        description={systemsPageCopy.description}
      />
      <SystemsIndexGrid systems={systems} />
      <ExperimentGrid
        embedded
        label={systemsPageCopy.experimentsLabel}
        title={systemsPageCopy.experimentsTitle}
        experiments={experiments}
      />
    </PageContainer>
  );
}
