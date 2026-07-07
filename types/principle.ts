export type Principle = {
  number: string;
  statement: string;
  support: string;
  source: string;
};

export type PrinciplesDocument = {
  principles: Principle[];
};
