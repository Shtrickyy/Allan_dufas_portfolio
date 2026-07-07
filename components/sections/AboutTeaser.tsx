import {
  FadeUp,
  FadeUpItem,
  FadeUpStagger,
} from "@/components/animations/FadeUp";
import { HomeSection } from "@/components/sections/HomeSection";
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
      <FadeUpStagger className="max-w-2xl space-y-4">
        <FadeUpItem>
          <SectionLabel>{label}</SectionLabel>
        </FadeUpItem>
        <FadeUpItem>
          <h2 className="text-2xl leading-snug font-medium tracking-tight text-ink-primary md:text-[2rem] md:leading-[1.2]">
            {title}
          </h2>
        </FadeUpItem>
        <FadeUpItem>
          <p className="text-base leading-relaxed text-ink-secondary md:text-lg md:leading-[1.6]">
            {teaserLine}
          </p>
        </FadeUpItem>
        <FadeUpItem>
          <TextLink href="/about">Read the full story →</TextLink>
        </FadeUpItem>
      </FadeUpStagger>
      {photo ? (
        <FadeUp className="mt-8 max-w-md">
          <div className="aspect-[4/3] rounded-md border border-border bg-surface" />
        </FadeUp>
      ) : null}
    </HomeSection>
  );
}
