import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { ScaffoldHeading } from "@/components/layout/ScaffoldHeading";
import { MetaChip } from "@/components/system/MetaChip";
import { aboutCopy } from "@/constants/about";
import { site } from "@/constants/site";

export const metadata: Metadata = {
  title: "About — Allan Dufas",
  description: aboutCopy.description,
};

export default function AboutPage() {
  return (
    <PageContainer className="pb-16 md:pb-24 lg:pb-32">
      <ScaffoldHeading
        title={aboutCopy.title}
        description={aboutCopy.description}
      />

      <div className="mx-auto max-w-[680px] space-y-8">
        <MetaChip>{site.quietLabel}</MetaChip>

        <div className="space-y-6">
          {aboutCopy.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-base leading-relaxed text-ink-secondary md:text-[1.0625rem] md:leading-[1.7]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
