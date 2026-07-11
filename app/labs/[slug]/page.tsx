import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToolDetail } from "@/components/tools/ToolDetail";
import {
  getAllToolSlugs,
  getRelatedTools,
  getToolBySlug,
} from "@/lib/tools";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllToolSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return { title: "Tool Not Found | NeuralVarsity" };
  }

  return {
    title: `${tool.name} | NeuralVarsity AI Tools Lab`,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedTools(tool);

  return (
    <>
      <Navbar />
      <main className="px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ToolDetail tool={tool} relatedTools={relatedTools} />
        </div>
      </main>
      <Footer />
    </>
  );
}
