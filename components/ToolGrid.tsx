"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { SearchBar } from "./SearchBar";
import { CategoryFilters } from "./CategoryFilters";
import { ToolCard } from "./ToolCard";
import { tools } from "@/data/tools";
import type { FilterCategory } from "@/types/tool";

export function ToolGrid() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [category, setCategory] = useState<FilterCategory>("All");
  const isSearching = query !== deferredQuery;

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = category === "All" || tool.category === category;
      const q = deferredQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.tags.some((t) => t.toLowerCase().includes(q)) ||
        tool.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [deferredQuery, category]);

  return (
    <section id="tools" className="px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            AI Tools Marketplace
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
            Browse {tools.length}+ essential AI platforms organized by category.
          </p>
        </div>

        <div className="space-y-6">
          <SearchBar value={query} onChange={setQuery} />
          <CategoryFilters active={category} onChange={setCategory} />
        </div>

        <p className="text-center text-sm text-slate-500">
          {isSearching ? "Searching…" : `Showing ${filtered.length} tool${filtered.length !== 1 ? "s" : ""}`}
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>

        {filtered.length === 0 && !isSearching && (
          <div className="py-20 text-center">
            <p className="text-slate-400">
              No tools found. Try a different search or category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
