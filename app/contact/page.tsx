import type { Metadata } from "next";
import Link from "next/link";

import { CvDownloadAction } from "@/components/contact/CvDownloadAction";
import { PageContainer } from "@/components/layout/PageContainer";
import { ScaffoldHeading } from "@/components/layout/ScaffoldHeading";
import { contactCopy } from "@/constants/contact";
import { site } from "@/constants/site";
import { cn } from "@/lib/utils";

const linkClassName = cn(
  "text-base text-ink-primary underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
);

export const metadata: Metadata = {
  title: "Contact — Allan Dufas",
  description: contactCopy.description,
};

export default function ContactPage() {
  return (
    <PageContainer className="pb-20 md:pb-28 lg:pb-32">
      <ScaffoldHeading
        title={contactCopy.title}
        description={contactCopy.description}
      />

      <div className="mx-auto flex max-w-md flex-col gap-8">
        <div className="flex flex-col gap-4">
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

        <CvDownloadAction />

        <p className="text-sm leading-relaxed text-ink-secondary">
          {site.quietLabel}
        </p>
      </div>
    </PageContainer>
  );
}
