"use client";

import { patternFlow } from "@/constants/home";

import { FadeUpItem, FadeUpStagger } from "@/components/animations/FadeUp";

export function PatternDiagramMobile() {
  return (
    <FadeUpStagger>
      <ol className="space-y-4">
        {patternFlow.stages.map((stage) => {
          const mappedSystems = patternFlow.systems.filter(
            (system) => system.stageId === stage.id,
          );

          return (
            <FadeUpItem key={stage.id}>
              <li className="rounded-md border border-border bg-surface p-4">
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
            </FadeUpItem>
          );
        })}
      </ol>
    </FadeUpStagger>
  );
}
