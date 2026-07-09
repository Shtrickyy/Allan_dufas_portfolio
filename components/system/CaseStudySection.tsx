import { ProseBlock } from "@/components/system/ProseBlock";
import {
  caseStudySectionSpacing,
  caseStudySectionTitle,
} from "@/components/system/case-study-layout";

type CaseStudySectionProps = {
  title: string;
  content: string | null;
};

export function CaseStudySection({ title, content }: CaseStudySectionProps) {
  if (!content) {
    return null;
  }

  return (
    <section className={caseStudySectionSpacing}>
      <h2 className={caseStudySectionTitle}>{title}</h2>
      <ProseBlock content={content} />
    </section>
  );
}
