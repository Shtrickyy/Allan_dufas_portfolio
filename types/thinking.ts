export type ThinkingFrontmatter = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

export type ThinkingArticle = ThinkingFrontmatter & {
  content: string;
};

export type ThinkingSummary = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  href: string;
};

export function toThinkingSummary(article: ThinkingArticle): ThinkingSummary {
  return {
    slug: article.slug,
    title: article.title,
    date: article.date,
    excerpt: article.excerpt,
    href: `/thinking/${article.slug}`,
  };
}
