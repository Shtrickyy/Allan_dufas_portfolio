import { patternFlow } from "@/constants/home";

import { HomeSection } from "@/components/sections/HomeSection";
import { SectionLabel } from "@/components/system/SectionLabel";

type PatternSectionProps = {
  label: string;
  headline: string;
};

function PatternDiagramStatic() {
  return (
    <>
      <div className="hidden lg:block">
        <svg
          viewBox="0 0 960 220"
          role="img"
          aria-hidden
          className="h-auto w-full text-border"
        >
          <line x1="80" y1="110" x2="880" y2="110" stroke="currentColor" />
          {patternFlow.stages.map((stage, index) => {
            const x = 80 + index * 200;

            return (
              <g key={stage.id}>
                <rect
                  x={x - 48}
                  y="70"
                  width="96"
                  height="80"
                  rx="8"
                  fill="var(--color-surface)"
                  stroke="var(--color-border)"
                />
                <text
                  x={x}
                  y="118"
                  textAnchor="middle"
                  fill="#17161c"
                  fontSize="12"
                  fontWeight="500"
                >
                  {stage.label}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="mt-6 grid grid-cols-5 gap-4">
          {patternFlow.stages.map((stage) => {
            const mappedSystems = patternFlow.systems.filter(
              (system) => system.stageId === stage.id,
            );

            return (
              <div key={stage.id} className="space-y-2 text-center">
                {mappedSystems.map((system) => (
                  <p
                    key={system.name}
                    className="font-mono text-[10px] font-medium tracking-widest text-accent uppercase"
                  >
                    {system.name}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <ol className="space-y-4 lg:hidden">
        {patternFlow.stages.map((stage) => {
          const mappedSystems = patternFlow.systems.filter(
            (system) => system.stageId === stage.id,
          );

          return (
            <li
              key={stage.id}
              className="rounded-md border border-border bg-surface p-4"
            >
              <p className="font-mono text-xs font-medium tracking-widest text-ink-secondary uppercase">
                {stage.label}
              </p>
              {mappedSystems.length > 0 ? (
                <div className="mt-3 space-y-1">
                  {mappedSystems.map((system) => (
                    <p
                      key={system.name}
                      className="font-mono text-xs font-medium tracking-widest text-accent uppercase"
                    >
                      {system.name}
                    </p>
                  ))}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </>
  );
}

export function PatternSection({ label, headline }: PatternSectionProps) {
  return (
    <HomeSection>
      <div className="space-y-8">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="max-w-3xl text-2xl leading-snug font-medium tracking-tight text-ink-primary md:text-[2rem] md:leading-[1.2]">
          {headline}
        </h2>
        <p className="sr-only">{patternFlow.srOnlyDescription}</p>
        <PatternDiagramStatic />
      </div>
    </HomeSection>
  );
}
