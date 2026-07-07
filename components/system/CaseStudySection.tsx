import { ProseBlock } from "@/components/system/ProseBlock";

type CaseStudySectionProps = {
  title: string;
  content: string | null;
};

export function CaseStudySection({ title, content }: CaseStudySectionProps) {
  if (!content) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-medium leading-snug tracking-tight text-ink-primary md:text-[2rem] md:leading-[1.2]">
        {title}
      </h2>
      <ProseBlock content={content} />
    </section>
  );
}
