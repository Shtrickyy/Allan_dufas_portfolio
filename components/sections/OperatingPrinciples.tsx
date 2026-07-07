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
        <div className="space-y-4">
          <SectionLabel>{label}</SectionLabel>
          <h2 className="text-2xl leading-snug font-medium tracking-tight text-ink-primary md:text-[2rem] md:leading-[1.2]">
            {title}
          </h2>
        </div>
        <div>
          {principles.map((principle) => (
            <PrincipleRow key={principle.number} principle={principle} />
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
