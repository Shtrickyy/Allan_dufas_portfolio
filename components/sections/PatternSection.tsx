"use client";

import { useRef } from "react";

import { PatternDiagram } from "@/components/animations/PatternDiagram";
import { PatternDiagramMobile } from "@/components/animations/PatternDiagramMobile";
import { FadeUp } from "@/components/animations/FadeUp";
import { HomeSection } from "@/components/sections/HomeSection";
import {
  homeSectionHeader,
  homeSectionStack,
  homeSectionTitle,
} from "@/components/sections/home-layout";
import { SectionLabel } from "@/components/system/SectionLabel";
import { patternFlow } from "@/constants/home";
import { useScrollProgress } from "@/hooks/useScrollProgress";

type PatternSectionProps = {
  label: string;
  headline: string;
};

export function PatternSection({ label, headline }: PatternSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(sectionRef);

  return (
    <HomeSection>
      <div ref={sectionRef} className={homeSectionStack}>
        <div className={homeSectionHeader}>
          <FadeUp>
            <SectionLabel>{label}</SectionLabel>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2 className={`max-w-3xl ${homeSectionTitle}`}>{headline}</h2>
          </FadeUp>
        </div>
        <p className="sr-only">{patternFlow.srOnlyDescription}</p>
        <div className="hidden pt-4 lg:block">
          <PatternDiagram progress={progress} />
        </div>
        <div className="pt-2 lg:hidden">
          <PatternDiagramMobile />
        </div>
      </div>
    </HomeSection>
  );
}
