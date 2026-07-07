export type ExperimentStage = "Concept" | "Prototype" | "Planned";

export type ExperimentFrontmatter = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  stage: ExperimentStage;
  order: number;
};

export type Experiment = ExperimentFrontmatter & {
  content: string;
};

export type ExperimentSummary = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  stage: ExperimentStage;
};

export function toExperimentSummary(experiment: Experiment): ExperimentSummary {
  return {
    slug: experiment.slug,
    title: experiment.title,
    tagline: experiment.tagline,
    summary: experiment.summary,
    stage: experiment.stage,
  };
}
