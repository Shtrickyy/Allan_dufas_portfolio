import { site } from "@/constants/site";
import { cn } from "@/lib/utils";

const cvButtonClassName =
  "inline-flex h-auto rounded-sm bg-accent font-medium text-white transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

type CvDownloadActionProps = {
  compact?: boolean;
};

export function CvDownloadAction({ compact = false }: CvDownloadActionProps) {
  return (
    <a
      href={encodeURI(site.cvPath)}
      download="Allan-Dufas-CV.pdf"
      className={cn(
        cvButtonClassName,
        compact ? "px-4 py-2 text-sm" : "px-5 py-3 text-base",
      )}
    >
      Download CV
    </a>
  );
}
