import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { ScaffoldHeading } from "@/components/layout/ScaffoldHeading";
import { site } from "@/constants/site";
import { cn } from "@/lib/utils";

const linkClassName = cn(
  "text-base text-ink-primary underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
);

export default function ContactPage() {
  return (
    <PageContainer>
      <ScaffoldHeading
        title="Contact"
        description="Short note — CV download wires in Milestone 10 once the canonical file is confirmed."
      />
      <div className="flex max-w-md flex-col gap-4 pb-16 md:pb-24">
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
        <p className="text-sm leading-relaxed text-ink-secondary">
          {site.quietLabel}
        </p>
      </div>
    </PageContainer>
  );
}
