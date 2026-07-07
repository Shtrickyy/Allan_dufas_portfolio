import Link from "next/link";

import { cn } from "@/lib/utils";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function TextLink({
  href,
  children,
  className,
  external = false,
}: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1 text-base text-ink-primary transition-colors duration-200 hover:text-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      {children}
    </Link>
  );
}

type ViewSystemLinkProps = {
  href: string;
  className?: string;
};

export function ViewSystemLink({ href, className }: ViewSystemLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-1 text-base text-ink-primary transition-colors duration-200 hover:text-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
    >
      <span>View the system</span>
      <span
        aria-hidden
        className="transition-transform duration-200 group-hover/link:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
