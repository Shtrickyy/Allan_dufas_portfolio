export const narrativeProse =
  "text-base leading-[1.75] text-ink-secondary md:text-[1.0625rem] md:leading-[1.8]";

export const narrativeProseTight =
  "text-base leading-[1.7] text-ink-secondary md:text-[1.0625rem]";

export const narrativeChapterTitle =
  "text-sm font-medium tracking-[0.04em] text-ink-secondary uppercase";

export const narrativeHeadline =
  "text-[1.75rem] font-medium leading-[1.15] tracking-[-0.02em] text-ink-primary md:text-[2.25rem] md:leading-[1.1]";

export const narrativeBridge =
  "text-base italic leading-relaxed text-ink-secondary/90 md:text-lg";

export const narrativeFragmentMargin =
  "border-l-2 border-border pl-4 text-base leading-relaxed text-ink-primary md:pl-5 md:text-lg";

export const narrativeFragmentInline =
  "text-base leading-relaxed text-ink-secondary md:text-[1.0625rem]";

export const narrativeHonestLine =
  "text-sm leading-relaxed text-ink-secondary/90 md:text-base";

export const narrativeCaption =
  "mt-2 text-sm leading-relaxed text-ink-secondary";

export const narrativePlaceholderLabel =
  "text-xs font-medium tracking-[0.06em] text-ink-secondary/70 uppercase";

export const aspectClass = {
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "16/9": "aspect-video",
  "3/2": "aspect-[3/2]",
  "1/1": "aspect-square",
} as const;
