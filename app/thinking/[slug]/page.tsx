import { PageContainer } from "@/components/layout/PageContainer";
import { ScaffoldHeading } from "@/components/layout/ScaffoldHeading";

type ThinkingArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ThinkingArticlePage({
  params,
}: ThinkingArticlePageProps) {
  const { slug } = await params;

  return (
    <PageContainer>
      <ScaffoldHeading
        title="Thinking"
        description={`Article scaffold for “${slug}” — MDX content arrives in Milestone 3.`}
      />
    </PageContainer>
  );
}
