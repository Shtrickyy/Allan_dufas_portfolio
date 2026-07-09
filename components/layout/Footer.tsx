import Link from "next/link";

import { CvDownloadAction } from "@/components/contact/CvDownloadAction";
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
    <footer className="mt-auto border-t border-border bg-background">
      <PageContainer className="py-16 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <p className="text-base leading-relaxed text-ink-secondary">
              {site.signOff}
            </p>
            <p className="font-mono text-xs font-medium tracking-[0.08em] text-ink-secondary uppercase">
              {site.quietLabel}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
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
            <CvDownloadAction compact />
          </div>
        </div>

        <p className="mt-10 border-t border-border pt-8 font-mono text-xs font-medium tracking-[0.08em] text-ink-secondary uppercase">
          © {year} {site.name}
        </p>
      </PageContainer>
    </footer>
  );
}
