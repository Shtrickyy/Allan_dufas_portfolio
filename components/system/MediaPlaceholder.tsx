import { cn } from "@/lib/utils";

type MediaPlaceholderProps = {
  title: string;
  className?: string;
};

export function MediaPlaceholder({ title, className }: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${title} preview — visual forthcoming`}
      className={cn(
        "flex aspect-[4/3] w-full items-end rounded-md border border-border bg-surface p-4",
        className,
      )}
    >
      <p className="font-mono text-xs font-medium tracking-widest text-ink-secondary uppercase">
        Visual forthcoming
      </p>
    </div>
  );
}
