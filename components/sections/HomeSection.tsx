import { cn } from "@/lib/utils";

import { PageContainer } from "@/components/layout/PageContainer";
import { chapterToneClasses } from "@/components/home/narrative-tokens";

export type ChapterSpacing = "tight" | "standard" | "airy";
export type ChapterTone = "default" | "warm" | "open" | "stone" | "paper";

type ChapterProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  /** When false, no top border — use between story chapters sparingly. */
  divider?: boolean;
  spacing?: ChapterSpacing;
  tone?: ChapterTone;
  /** Accessible label for the narrative beat (visually hidden). */
  ariaLabel?: string;
};

const spacingClasses: Record<ChapterSpacing, string> = {
  tight: "py-16 md:py-24 lg:py-28",
  standard: "py-20 md:py-28 lg:py-36",
  airy: "py-28 md:py-36 lg:py-44 xl:py-52",
};

const toneClasses: Record<ChapterTone, string> = {
  default: chapterToneClasses.default,
  warm: chapterToneClasses.warm,
  open: chapterToneClasses.open,
  stone: chapterToneClasses.stone,
  paper: chapterToneClasses.paper,
};

export function Chapter({
  children,
  className,
  containerClassName,
  divider = false,
  spacing = "standard",
  tone = "default",
  ariaLabel,
}: ChapterProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={cn(
        spacingClasses[spacing],
        toneClasses[tone],
        divider && "border-t border-[#c8bfb0]/50",
        className,
      )}
    >
      <PageContainer className={cn("w-full", containerClassName)}>
        {children}
      </PageContainer>
    </section>
  );
}

/** @deprecated Use Chapter on the homepage narrative. Kept for legacy section components. */
export function HomeSection({
  children,
  className,
  containerClassName,
  fullBleed = false,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  fullBleed?: boolean;
}) {
  return (
    <Chapter
      divider
      spacing="standard"
      tone={fullBleed ? "default" : "default"}
      className={className}
      containerClassName={containerClassName}
    >
      {children}
    </Chapter>
  );
}
