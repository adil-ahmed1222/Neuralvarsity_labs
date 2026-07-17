"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { CategoryFilters } from "./CategoryFilters";
import { ToolCard } from "./ToolCard";
import { tools } from "@/data/tools";
import { searchTools } from "@/lib/toolMeta";
import type { FilterCategory, Tool } from "@/types/tool";

const SUGGESTIONS = ["ChatGPT", "Cursor", "HeyGen", "n8n"];

function Section({
  id,
  title,
  subtitle,
  items,
  startIndex = 0,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  items: Tool[];
  startIndex?: number;
}) {
  if (!items.length) return null;
  return (
    <div id={id} className="scroll-mt-36 space-y-4">
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((tool, index) => (
          <ToolCard key={tool.id} tool={tool} index={startIndex + index} />
        ))}
      </div>
    </div>
  );
}

export function ToolGrid() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [category, setCategory] = useState<FilterCategory>("All");
  const isSearching = query !== deferredQuery;
  const hasFilters = Boolean(deferredQuery.trim()) || category !== "All";

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<FilterCategory>).detail;
      if (detail) setCategory(detail);
    };
    window.addEventListener("labs:set-category", handler);
    return () => window.removeEventListener("labs:set-category", handler);
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  const filtered = useMemo(() => {
    const bySearch = searchTools(tools, deferredQuery);
    return bySearch.filter((tool) => category === "All" || tool.category === category);
  }, [deferredQuery, category]);

  const featured = filtered.filter((t) => t.featured);
  const popular = filtered.filter((t) => t.popular && !t.featured);
  const newest = [...filtered].sort((a, b) => b.id - a.id).slice(0, 8);
  const showSections = !deferredQuery.trim() && category === "All";

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <section id="tools" className="scroll-mt-28 px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            AI Tools Marketplace
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
            Browse {tools.length}+ essential AI platforms organized by category.
          </p>
        </div>

        <div className="sticky top-[5.5rem] z-40 -mx-2 space-y-4 rounded-2xl border border-[rgba(255,184,0,0.1)] bg-[rgba(3,7,18,0.85)] px-2 py-4 backdrop-blur-xl sm:mx-0 sm:px-4">
          <SearchBar value={query} onChange={setQuery} />
          <CategoryFilters active={category} onChange={setCategory} />
        </div>

        <p className="text-center text-sm text-slate-500">
          {isSearching
            ? "Searching…"
            : `Showing ${filtered.length} tool${filtered.length !== 1 ? "s" : ""}`}
        </p>

        {filtered.length === 0 && !isSearching ? (
          <div className="glass-card mx-auto max-w-lg rounded-2xl px-8 py-12 text-center">
            <p className="text-lg font-semibold text-white">No tools found.</p>
            <p className="mt-2 text-sm text-slate-400">Try searching for:</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setQuery(s);
                    setCategory("All");
                  }}
                  className="rounded-full border border-[rgba(255,184,0,0.2)] px-3 py-1.5 text-xs font-medium text-[#FFB800] transition-colors hover:bg-[rgba(255,184,0,0.1)]"
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FFB800] px-5 py-2 text-sm font-semibold text-[#030712]"
            >
              Clear Filters
            </button>
          </div>
        ) : showSections ? (
          <div className="space-y-14">
            <Section id="featured" title="Featured Tools" subtitle="Editor’s picks for students" items={featured} />
            <Section id="popular" title="Popular" subtitle="Most used across labs" items={popular.slice(0, 8)} startIndex={8} />
            <Section id="newest" title="Newest" subtitle="Recently added to the catalog" items={newest} startIndex={16} />
            <Section title="All Tools" items={filtered} startIndex={24} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>
        )}

        {hasFilters && filtered.length > 0 && (
          <div className="text-center">
            <Link
              href="/labs/suggest"
              className="text-sm text-slate-500 transition-colors hover:text-[#FFB800]"
            >
              Can’t find a tool? Suggest one →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
