import { cn } from "@/lib/utils";

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
    <div className={cn("space-y-4", className)}>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-base leading-relaxed text-ink-secondary md:text-[1.0625rem] md:leading-[1.7]"
        >
          {formatInline(paragraph.replace(/\n/g, " "))}
        </p>
      ))}
    </div>
  );
}
