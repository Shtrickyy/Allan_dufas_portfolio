import { cn } from "@/lib/utils";

type MetaChipProps = {
  children: React.ReactNode;
  className?: string;
};

export function MetaChip({ children, className }: MetaChipProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-xs font-medium tracking-widest text-ink-secondary uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
