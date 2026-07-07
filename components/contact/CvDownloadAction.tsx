import { site } from "@/constants/site";

const cvButtonClassName =
  "inline-flex h-auto rounded-sm bg-accent px-5 py-3 text-base font-medium text-white transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function CvDownloadAction() {
  return (
    <a
      href={encodeURI(site.cvPath)}
      download="Allan-Dufas-CV.pdf"
      className={cvButtonClassName}
    >
      Download CV
    </a>
  );
}
