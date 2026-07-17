"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategoryCounts } from "@/lib/tools";
import {
  CATEGORY_SHORT_LABELS,
  CATEGORY_SLUGS,
  FILTER_CATEGORIES,
  type ToolCategory,
} from "@/types/tool";

const POPULAR: ToolCategory[] = [
  "Foundation Models",
  "Coding Assistants",
  "UGC (AI Video Generation)",
  "Workflow Automation & AI Agent Frameworks",
  "Image Generation",
  "AI Voice & Dubbing",
];

export function PopularCategories() {
  const counts = getCategoryCounts();

  return (
    <section className="px-6 pb-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Popular Categories</h2>
          <p className="mt-2 text-sm text-slate-400">
            Jump straight into a category — or browse the full marketplace below.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {POPULAR.map((category) => (
            <Link
              key={category}
              href={`#tools`}
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(
                  new CustomEvent("labs:set-category", { detail: category })
                );
                document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group glass-card flex flex-col justify-between rounded-2xl p-4 transition-all hover:glow-amber hover:border-[rgba(255,184,0,0.35)]"
            >
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-[#FFB800]">
                  {CATEGORY_SHORT_LABELS[category]}
                </p>
                <p className="mt-1 text-xs text-slate-500">{counts[category]} tools</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-medium text-[#FFB800]">
                Browse
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Link
            href={`/labs/categories/${CATEGORY_SLUGS[FILTER_CATEGORIES[1]]}`}
            className="text-xs text-slate-500 transition-colors hover:text-[#FFB800]"
          >
            Explore educational category pages →
          </Link>
        </div>
      </div>
    </section>
  );
}
