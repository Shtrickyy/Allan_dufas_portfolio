import { MetaChip } from "@/components/system/MetaChip";
import { SectionLabel } from "@/components/system/SectionLabel";
import { TextLink } from "@/components/system/TextLink";
import type { System } from "@/types/system";

type SystemHeroProps = {
  system: System;
};

export function SystemHero({ system }: SystemHeroProps) {
  return (
    <header className="space-y-6 border-b border-border pb-12 md:pb-16">
      <SectionLabel>Case study</SectionLabel>
      <div className="space-y-3">
        <h1 className="text-[2rem] font-medium leading-tight tracking-tight text-ink-primary md:text-[3rem]">
          {system.title}
        </h1>
        <p className="font-mono text-xs font-medium tracking-widest text-ink-secondary uppercase">
          {system.subtitle}
        </p>
      </div>
      <p className="text-lg leading-relaxed text-ink-secondary md:text-xl md:leading-[1.6]">
        {system.tagline}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <MetaChip>{system.status}</MetaChip>
        {system.stack.map((item) => (
          <MetaChip key={item}>{item}</MetaChip>
        ))}
      </div>
      {system.liveUrl ? (
        <TextLink href={system.liveUrl} external>
          View live demo
        </TextLink>
      ) : null}
      {system.repositoryUrl ? (
        <TextLink href={system.repositoryUrl} external>
          View repository
        </TextLink>
      ) : null}
    </header>
  );
}
