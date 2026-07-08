import { cn } from "@/lib/utils";

import type { Principle } from "@/types/principle";

type PrincipleRowProps = {
  principle: Principle;
  className?: string;
};

export function PrincipleRow({ principle, className }: PrincipleRowProps) {
  return (
    <div
      className={cn(
        "grid gap-5 border-b border-border py-9 md:grid-cols-[40px_1fr] md:gap-6 md:py-10",
        className,
      )}
    >
      <p className="font-mono text-xs font-medium tracking-[0.08em] text-accent uppercase">
        {principle.number}
      </p>
      <div className="space-y-3">
        <h3 className="text-lg font-medium leading-[1.3] text-ink-primary md:text-xl">
          {principle.statement}
        </h3>
        <p className="max-w-[560px] text-sm leading-[1.6] text-ink-secondary">
          {principle.support}
        </p>
      </div>
    </div>
  );
}
