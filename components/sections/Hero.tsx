import { ChevronDown } from "lucide-react";

import { HomeSection } from "@/components/sections/HomeSection";

type HeroProps = {
  thesis: string;
  subhead: string;
};

export function Hero({ thesis, subhead }: HeroProps) {
  return (
    <HomeSection
      fullBleed
      containerClassName="flex min-h-[calc(100vh-4rem)] flex-col justify-center md:min-h-[calc(100vh-4.5rem)]"
    >
      <div className="max-w-4xl space-y-6">
        <h1 className="text-[2.5rem] leading-[1.05] font-medium tracking-[-0.02em] text-ink-primary md:text-[4rem]">
          {thesis}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-ink-secondary md:text-lg md:leading-[1.6]">
          {subhead}
        </p>
      </div>
      <div
        aria-hidden
        className="mt-16 flex justify-center text-ink-secondary md:mt-24"
      >
        <ChevronDown size={20} strokeWidth={1.5} />
      </div>
    </HomeSection>
  );
}
