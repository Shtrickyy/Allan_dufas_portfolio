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
        "grid gap-4 border-b border-border py-8 md:grid-cols-[40px_1fr] md:py-10",
        className,
      )}
    >
      <p className="font-mono text-xs font-medium tracking-widest text-accent uppercase">
        {principle.number}
      </p>
      <div className="space-y-2">
        <h3 className="text-lg font-medium leading-snug text-ink-primary md:text-xl">
          {principle.statement}
        </h3>
        <p className="max-w-[560px] text-sm leading-relaxed text-ink-secondary">
          {principle.support}
        </p>
      </div>
    </div>
  );
}
