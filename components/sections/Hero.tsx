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
      containerClassName="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center md:min-h-[calc(100vh-4.5rem)]"
    >
      <HeroIntro />
      <div className="max-w-4xl space-y-6">
        <FadeUp>
          <h1 className="text-[2.5rem] leading-[1.05] font-medium tracking-[-0.02em] text-ink-primary md:text-[4rem]">
            {thesis}
          </h1>
        </FadeUp>
        <FadeUp delay={0.08}>
          <p className="max-w-2xl text-base leading-relaxed text-ink-secondary md:text-lg md:leading-[1.6]">
            {subhead}
          </p>
        </FadeUp>
      </div>
      <FadeUp delay={0.16}>
        <div
          aria-hidden
          className="mt-16 flex justify-center text-ink-secondary md:mt-24"
        >
          <ChevronDown size={20} strokeWidth={1.5} />
        </div>
      </FadeUp>
    </HomeSection>
  );
}
