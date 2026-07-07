import { FadeUpItem, FadeUpStagger } from "@/components/animations/FadeUp";
import { HomeSection } from "@/components/sections/HomeSection";
import { PrincipleRow } from "@/components/system/PrincipleRow";
import { SectionLabel } from "@/components/system/SectionLabel";
import type { Principle } from "@/types/principle";

type OperatingPrinciplesProps = {
  label: string;
  title: string;
  principles: Principle[];
};

export function OperatingPrinciples({
  label,
  title,
  principles,
}: OperatingPrinciplesProps) {
  return (
    <HomeSection>
      <div className="space-y-8">
        <FadeUpStagger className="space-y-4">
          <FadeUpItem>
            <SectionLabel>{label}</SectionLabel>
          </FadeUpItem>
          <FadeUpItem>
            <h2 className="text-2xl leading-snug font-medium tracking-tight text-ink-primary md:text-[2rem] md:leading-[1.2]">
              {title}
            </h2>
          </FadeUpItem>
        </FadeUpStagger>
        <FadeUpStagger>
          <div>
            {principles.map((principle) => (
              <FadeUpItem key={principle.number}>
                <PrincipleRow principle={principle} />
              </FadeUpItem>
            ))}
          </div>
        </FadeUpStagger>
      </div>
    </HomeSection>
  );
}
