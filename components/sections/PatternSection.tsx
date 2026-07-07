"use client";

import { useRef } from "react";

import { PatternDiagram } from "@/components/animations/PatternDiagram";
import { PatternDiagramMobile } from "@/components/animations/PatternDiagramMobile";
import { FadeUp } from "@/components/animations/FadeUp";
import { HomeSection } from "@/components/sections/HomeSection";
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
      <div ref={sectionRef} className="space-y-8">
        <FadeUp>
          <SectionLabel>{label}</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="max-w-3xl text-2xl leading-snug font-medium tracking-tight text-ink-primary md:text-[2rem] md:leading-[1.2]">
            {headline}
          </h2>
        </FadeUp>
        <p className="sr-only">{patternFlow.srOnlyDescription}</p>
        <div className="hidden lg:block">
          <PatternDiagram progress={progress} />
        </div>
        <div className="lg:hidden">
          <PatternDiagramMobile />
        </div>
      </div>
    </HomeSection>
  );
}
