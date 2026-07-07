import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { site } from "@/constants/site";
import { cn } from "@/lib/utils";

const linkClassName = cn(
  "text-base text-ink-secondary transition-colors duration-200 hover:text-accent",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <PageContainer className="flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between">
        <p className="max-w-md text-base text-ink-secondary">{site.signOff}</p>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
          <Link href={site.emailHref} className={linkClassName}>
            {site.email}
          </Link>
          <Link
            href={site.linkedInUrl}
            className={linkClassName}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.linkedInLabel}
          </Link>
        </div>

        <p className="font-mono text-xs font-medium uppercase tracking-widest text-ink-secondary md:text-right">
          © {year} {site.name}
        </p>
      </PageContainer>
    </footer>
  );
}
