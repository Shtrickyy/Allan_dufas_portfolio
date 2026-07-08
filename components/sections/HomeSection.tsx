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
        "py-20 md:py-28 lg:py-36 xl:py-44",
        fullBleed ? "bg-background" : "border-t border-border",
        className,
      )}
    >
      <PageContainer className={cn("w-full", containerClassName)}>
        {children}
      </PageContainer>
    </section>
  );
}
