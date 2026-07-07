import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { ScaffoldHeading } from "@/components/layout/ScaffoldHeading";
import { homeCopy } from "@/constants/home";

export const metadata: Metadata = {
  title: "Thinking — Allan Dufas",
  description:
    "Notes on systems, AI, and decisions — published when there is something worth saying.",
};

export default function ThinkingPage() {
  return (
    <PageContainer className="pb-16 md:pb-24 lg:pb-32">
      <ScaffoldHeading
        title="Thinking"
        description="Notes on systems, AI, and decisions."
      />
      <p className="max-w-xl text-base leading-relaxed text-ink-secondary">
        {homeCopy.thinkingEmptyState}
      </p>
    </PageContainer>
  );
}
