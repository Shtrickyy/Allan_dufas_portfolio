import { cn } from "@/lib/utils";

import { PageContainer } from "@/components/layout/PageContainer";

type HomeSectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  fullBleed?: boolean;
};

export function HomeSection({
  children,
  className,
  containerClassName,
  fullBleed = false,
}: HomeSectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24 lg:py-32 xl:py-40",
        fullBleed ? "bg-background" : undefined,
        className,
      )}
    >
      <PageContainer className={containerClassName}>{children}</PageContainer>
    </section>
  );
}
