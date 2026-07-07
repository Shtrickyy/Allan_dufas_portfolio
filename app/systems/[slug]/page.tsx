import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyView } from "@/components/system/CaseStudyView";
import { getAllSystems, getSystemBySlug } from "@/lib/mdx";

type SystemCaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSystems().map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({
  params,
}: SystemCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const system = getSystemBySlug(slug);

  if (!system) {
    return {
      title: "System not found — Allan Dufas",
    };
  }

  return {
    title: `${system.title} — Allan Dufas`,
    description: system.tagline,
  };
}

export default async function SystemCaseStudyPage({
  params,
}: SystemCaseStudyPageProps) {
  const { slug } = await params;
  const system = getSystemBySlug(slug);

  if (!system) {
    notFound();
  }

  return <CaseStudyView system={system} />;
}
