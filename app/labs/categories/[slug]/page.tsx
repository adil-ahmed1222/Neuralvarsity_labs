import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToolCard } from "@/components/ToolCard";
import { CATEGORY_EDU } from "@/lib/toolMeta";
import { getCategoryCounts, getToolsByCategory } from "@/lib/tools";
import {
  CATEGORY_SLUGS,
  CATEGORY_SHORT_LABELS,
  categoryFromSlug,
  FILTER_CATEGORIES,
  type ToolCategory,
} from "@/types/tool";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return FILTER_CATEGORIES.filter((c): c is ToolCategory => c !== "All").map(
    (category) => ({ slug: CATEGORY_SLUGS[category] })
  );
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) return { title: "Category Not Found | NeuralVarsity" };
  return {
    title: `${category} | NeuralVarsity AI Tools Lab`,
    description: CATEGORY_EDU[category].blurb,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryFromSlug(slug);
  if (!category) notFound();

  const items = getToolsByCategory(category);
  const counts = getCategoryCounts();
  const edu = CATEGORY_EDU[category];
  const topPicks = items.filter((t) => t.featured || t.popular).slice(0, 4);
  const beginner = items.find((t) => t.badges?.includes("best-beginner")) ?? items[0];

  return (
    <>
      <Navbar />
      <main className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/labs" className="hover:text-[#FFB800]">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-300">{CATEGORY_SHORT_LABELS[category]}</span>
          </nav>

          <header className="glass-card rounded-2xl p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FFB800]">
              Educational category
            </p>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{category}</h1>
            <p className="mt-2 text-sm text-slate-500">{counts[category]} tools in this category</p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-400">
              {edu.blurb}
            </p>
          </header>

          <section className="grid gap-4 lg:grid-cols-2">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white">What is {CATEGORY_SHORT_LABELS[category]}?</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{edu.blurb}</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white">Beginner Recommendation</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{edu.beginnerTip}</p>
              {beginner && (
                <Link
                  href={`/labs/${beginner.slug}`}
                  className="mt-4 inline-flex text-sm font-semibold text-[#FFB800] hover:underline"
                >
                  Start with {beginner.name} →
                </Link>
              )}
            </div>
          </section>

          {topPicks.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-white">Top Picks</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {topPicks.map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} index={index} />
                ))}
              </div>
            </section>
          )}

          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">All {CATEGORY_SHORT_LABELS[category]} Tools</h2>
                <p className="mt-1 text-sm text-slate-500">Compare options in this category</p>
              </div>
              <Link href="/labs#tools" className="text-sm text-[#FFB800] hover:underline">
                Full marketplace
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((tool, index) => (
                <ToolCard key={tool.id} tool={tool} index={index} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
