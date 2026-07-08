import {
  FadeUp,
  FadeUpItem,
  FadeUpStagger,
} from "@/components/animations/FadeUp";
import { HomeSection } from "@/components/sections/HomeSection";
import {
  homeSectionHeader,
  homeSectionLead,
  homeSectionStack,
  homeSectionTitle,
} from "@/components/sections/home-layout";
import { SectionLabel } from "@/components/system/SectionLabel";
import { TextLink } from "@/components/system/TextLink";

type AboutTeaserProps = {
  label: string;
  title: string;
  teaserLine: string;
  photo?: string;
};

export function AboutTeaser({
  label,
  title,
  teaserLine,
  photo,
}: AboutTeaserProps) {
  return (
    <HomeSection>
      <FadeUpStagger className={`max-w-2xl md:max-w-3xl ${homeSectionStack}`}>
        <FadeUpItem>
          <div className={homeSectionHeader}>
            <SectionLabel>{label}</SectionLabel>
            <h2 className={homeSectionTitle}>{title}</h2>
          </div>
        </FadeUpItem>
        <FadeUpItem>
          <p className={`${homeSectionLead} md:max-w-2xl`}>{teaserLine}</p>
        </FadeUpItem>
        <FadeUpItem>
          <TextLink href="/about" className="inline-flex pt-1">
            Read the full story →
          </TextLink>
        </FadeUpItem>
      </FadeUpStagger>
      {photo ? (
        <FadeUp className="mt-10 max-w-md md:mt-12">
          <div className="aspect-[4/3] rounded-md border border-border bg-surface" />
        </FadeUp>
      ) : null}
    </HomeSection>
  );
}
