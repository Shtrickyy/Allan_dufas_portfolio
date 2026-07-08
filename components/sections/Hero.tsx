"use client";

import { ChevronDown } from "lucide-react";

import { HeroIntro } from "@/components/animations/HeroIntro";
import { FadeUp } from "@/components/animations/FadeUp";
import { HomeSection } from "@/components/sections/HomeSection";

type HeroProps = {
  thesis: string;
  subhead: string;
};

export function Hero({ thesis, subhead }: HeroProps) {
  return (
    <HomeSection
      fullBleed
      containerClassName="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center pb-16 md:min-h-[calc(100svh-4.5rem)] md:pb-20"
    >
      <HeroIntro />
      <div className="max-w-4xl space-y-8 md:space-y-10">
        <FadeUp>
          <h1 className="text-[2.5rem] leading-[1.05] font-medium tracking-[-0.02em] text-balance text-ink-primary md:text-[4rem] md:leading-[1.02]">
            {thesis}
          </h1>
        </FadeUp>
        <FadeUp delay={0.08}>
          <p className="max-w-xl text-base leading-[1.65] text-ink-secondary md:max-w-2xl md:text-lg md:leading-[1.7]">
            {subhead}
          </p>
        </FadeUp>
      </div>
      <FadeUp
        delay={0.16}
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center text-ink-secondary/80 md:bottom-12"
      >
        <ChevronDown aria-hidden size={20} strokeWidth={1.5} />
      </FadeUp>
    </HomeSection>
  );
}
