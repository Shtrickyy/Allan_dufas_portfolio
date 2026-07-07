"use client";

import { FadeUpItem, FadeUpStagger } from "@/components/animations/FadeUp";
import { SystemCard } from "@/components/system/SystemCard";
import { formatSystemCardLabel } from "@/constants/systems";
import type { SystemIndexCard } from "@/types/system";

type SystemsIndexGridProps = {
  systems: SystemIndexCard[];
};

export function SystemsIndexGrid({ systems }: SystemsIndexGridProps) {
  return (
    <FadeUpStagger className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {systems.map((system) => (
        <FadeUpItem key={system.slug}>
          <SystemCard
            variant="flagship"
            system={system}
            label={formatSystemCardLabel(system.order, system.title)}
          />
        </FadeUpItem>
      ))}
    </FadeUpStagger>
  );
}
