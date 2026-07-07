export const homeCopy = {
  heroThesis: "I solve the same problem, every time.",
  heroSubhead:
    "Turning fragmented expertise into coherent decision systems — across products, workflows, training and customer operations.",
  patternHeadline: "Same shape, different world.",
  aboutTeaser:
    "A Customer Success operator who taught himself to build the systems he kept wishing existed.",
  thinkingEmptyState: "First notes coming soon",
  sectionTitles: {
    operatingPrinciples: "How I Build",
    experiments: "In Motion",
    aboutTeaser: "The Person Behind It",
    thinkingPreview: "Currently Thinking About",
  },
  sectionLabels: {
    systemOne: "02 — System",
    systemTwo: "03 — System",
    pattern: "04 — Pattern",
    principles: "05 — How I Build",
    experiments: "06 — In Motion",
    about: "07 — The Person Behind It",
    thinking: "08 — Thinking",
  },
} as const;

export const patternFlow = {
  srOnlyDescription:
    "A five-stage decision pattern: fragmented expertise becomes structure, structure becomes a system, the system produces a decision, and the decision leads to a better outcome. Training OS and Handover Engine are two instances of the same shape in different domains.",
  stages: [
    { id: "fragmented", label: "Fragmented" },
    { id: "structure", label: "Structure" },
    { id: "system", label: "System" },
    { id: "decision", label: "Decision" },
    { id: "outcome", label: "Outcome" },
  ],
  systems: [
    { name: "Training OS", stageId: "system" },
    { name: "Handover Engine", stageId: "decision" },
  ],
} as const;
