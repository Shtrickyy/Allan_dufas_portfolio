export type NarrativeFragment = {
  text: string;
  placement?: "inline" | "margin";
};

export type NarrativeImage = {
  id: string;
  alt: string;
  caption: string;
  aspect: "4/3" | "3/4" | "16/9" | "3/2" | "1/1";
  src?: string | null;
  width?: number;
  height?: number;
};

export type NarrativeStory = {
  slug: string;
  href: string;
  title: string;
  protagonist: string;
  paragraphs: string[];
  honestLine: string;
  linkLabel: string;
  evidence: NarrativeImage;
  evidencePosition: "left" | "right";
};

export type NarrativeLink = {
  href: string;
  label: string;
};

export type HomeNarrative = {
  metadata: {
    title: string;
    description: string;
  };
  chapters: {
    one: {
      title: string;
      paragraphs: string[];
      image: NarrativeImage;
    };
    two: {
      title: string;
      paragraphs: string[];
      fragments: NarrativeFragment[];
      image: NarrativeImage;
    };
    three: {
      title: string;
      bridge: string;
      story: NarrativeStory;
    };
    four: {
      title: string;
      bridge: string;
      story: NarrativeStory;
    };
    five: {
      title: string;
      bridge: string;
      photos: NarrativeImage[];
      fragments: string[];
    };
    six: {
      title: string;
      bridge: string;
      thinkingPrompt: string;
      thinkingEmptyLabel: string;
      links: NarrativeLink[];
    };
  };
};

export type HomeNarrativeDocument = HomeNarrative;
