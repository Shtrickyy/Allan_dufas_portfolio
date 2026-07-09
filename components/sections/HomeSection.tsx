import { cn } from "@/lib/utils";

import { PageContainer } from "@/components/layout/PageContainer";

export type ChapterSpacing = "tight" | "standard" | "airy";
export type ChapterTone = "default" | "warm" | "open";

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
  tight: "py-14 md:py-20 lg:py-24",
  standard: "py-20 md:py-28 lg:py-36",
  airy: "py-24 md:py-32 lg:py-40 xl:py-48",
};

const toneClasses: Record<ChapterTone, string> = {
  default: "bg-background",
  warm: "bg-[#f0ede6]",
  open: "bg-background",
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
        divider && "border-t border-border",
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
