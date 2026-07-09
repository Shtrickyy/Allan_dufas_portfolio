export type ProofChip = {
  label: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type SystemFrontmatter = {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  status: string;
  stack: string[];
  liveUrl: string | null;
  repositoryUrl: string | null;
  coverImage: string;
  previewProofChips: ProofChip[];
  gallery: GalleryImage[];
  resultsSummary: string;
  order: number;
};

export type System = SystemFrontmatter & {
  content: string;
};

export type SystemSummary = {
  slug: string;
  title: string;
  tagline: string;
  href: string;
  heroImage: string;
  proofChips: ProofChip[];
};

export type SystemIndexCard = Pick<
  System,
  | "slug"
  | "title"
  | "subtitle"
  | "tagline"
  | "status"
  | "stack"
  | "previewProofChips"
  | "order"
>;

export function toSystemIndexCard(system: System): SystemIndexCard {
  return {
    slug: system.slug,
    title: system.title,
    subtitle: system.subtitle,
    tagline: system.tagline,
    status: system.status,
    stack: system.stack,
    previewProofChips: system.previewProofChips,
    order: system.order,
  };
}

export function toSystemSummary(system: System): SystemSummary {
  return {
    slug: system.slug,
    title: system.title,
    tagline: system.tagline,
    href: `/systems/${system.slug}`,
    heroImage: system.coverImage,
    proofChips: system.previewProofChips,
  };
}
