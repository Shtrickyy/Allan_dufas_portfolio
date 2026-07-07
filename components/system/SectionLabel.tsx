import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "font-mono text-xs font-medium tracking-widest text-ink-secondary uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
