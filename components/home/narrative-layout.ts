export const narrativeProse =
  "text-base leading-[1.8] text-ink-secondary md:text-[1.0625rem] md:leading-[1.85]";

export const narrativeProseTight =
  "text-base leading-[1.75] text-ink-secondary md:text-[1.0625rem] md:leading-[1.8]";

export const narrativeChapterMarker =
  "font-serif text-[0.8125rem] tracking-[0.12em] text-[#9a8668]";

export const narrativeChapterTitle =
  "text-[0.8125rem] font-medium tracking-[0.08em] text-[#6b7355] uppercase";

export const narrativeHeadline =
  "font-serif text-[1.875rem] font-normal leading-[1.2] tracking-[-0.01em] text-ink-primary md:text-[2.375rem] md:leading-[1.15]";

export const narrativeBridge =
  "font-serif text-base italic leading-relaxed text-[#b5694a]/90 md:text-lg";

export const narrativeFragmentMargin =
  "border-l border-[#9a8668]/60 pl-5 font-serif text-base leading-relaxed text-ink-primary md:pl-6 md:text-lg";

export const narrativeFragmentInline =
  "text-base leading-relaxed text-ink-secondary/95 md:text-[1.0625rem] md:leading-[1.75]";

export const narrativeHonestLine =
  "text-sm leading-relaxed text-[#5c4f42]/80 md:text-[0.9375rem]";

export const narrativeCaption =
  "mt-2.5 font-serif text-sm italic leading-relaxed text-[#5c4f42]/75";

export const narrativePlaceholderLabel =
  "text-[0.6875rem] font-medium tracking-[0.1em] text-[#9a8668] uppercase";

export const narrativeProtagonist = "text-sm tracking-[0.02em] text-[#6b7355]";

export const narrativeThinkingLabel =
  "text-sm tracking-[0.04em] text-[#6b7355] uppercase";

export const narrativeLink =
  "font-serif text-base text-ink-primary underline decoration-[#c8bfb0] decoration-1 underline-offset-[5px] transition-colors hover:text-[#b5694a] hover:decoration-[#b5694a]/50";

export const aspectClass = {
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "16/9": "aspect-video",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
} as const;
