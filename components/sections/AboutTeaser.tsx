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
      <div className="max-w-2xl space-y-4">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="text-2xl leading-snug font-medium tracking-tight text-ink-primary md:text-[2rem] md:leading-[1.2]">
          {title}
        </h2>
        <p className="text-base leading-relaxed text-ink-secondary md:text-lg md:leading-[1.6]">
          {teaserLine}
        </p>
        <TextLink href="/about">Read the full story →</TextLink>
      </div>
      {photo ? (
        <div className="mt-8 aspect-[4/3] max-w-md rounded-md border border-border bg-surface" />
      ) : null}
    </HomeSection>
  );
}
