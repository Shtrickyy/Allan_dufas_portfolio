import { cn } from "@/lib/utils";

import { caseStudySectionBody } from "@/components/system/case-study-layout";

type ProseBlockProps = {
  content: string;
  className?: string;
};

function formatInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-medium text-ink-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}

export function ProseBlock({ content, className }: ProseBlockProps) {
  const paragraphs = content.split(/\n\n+/).filter(Boolean);

  return (
    <div className={cn("space-y-5", className)}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={caseStudySectionBody}>
          {formatInline(paragraph.replace(/\n/g, " "))}
        </p>
      ))}
    </div>
  );
}
