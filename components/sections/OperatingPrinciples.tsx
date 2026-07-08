import { FadeUpItem, FadeUpStagger } from "@/components/animations/FadeUp";
import { HomeSection } from "@/components/sections/HomeSection";
import {
  homeSectionHeader,
  homeSectionStack,
  homeSectionTitle,
} from "@/components/sections/home-layout";
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
      <div className={homeSectionStack}>
        <FadeUpStagger className={homeSectionHeader}>
          <FadeUpItem>
            <SectionLabel>{label}</SectionLabel>
          </FadeUpItem>
          <FadeUpItem>
            <h2 className={homeSectionTitle}>{title}</h2>
          </FadeUpItem>
        </FadeUpStagger>
        <FadeUpStagger>
          <div className="border-t border-border">
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
