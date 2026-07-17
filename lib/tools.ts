import { tools } from "@/data/tools";
import { enrichTool } from "@/lib/toolMeta";
import type { Tool, ToolCategory } from "@/types/tool";

export function getAllTools(): Tool[] {
  return tools;
}

export function getEnrichedTools(): Tool[] {
  return tools.map(enrichTool);
}

export function getToolBySlug(slug: string): Tool | undefined {
  const tool = tools.find((t) => t.slug === slug);
  return tool ? enrichTool(tool) : undefined;
}

export function getAllToolSlugs(): string[] {
  return tools.map((tool) => tool.slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter((tool) => tool.category === category).map(enrichTool);
}

export function getCategoryCounts(): Record<ToolCategory | "All", number> {
  const counts = { All: tools.length } as Record<ToolCategory | "All", number>;
  for (const tool of tools) {
    counts[tool.category] = (counts[tool.category] ?? 0) + 1;
  }
  return counts;
}

/** Same-category peers (legacy related). */
export function getRelatedTools(tool: Tool, limit = 4): Tool[] {
  return tools
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, limit)
    .map(enrichTool);
}

/**
 * "People Also Use" — mix of alternatives, tag overlap, same category, and popular peers.
 */
export function getPeopleAlsoUse(tool: Tool, limit = 6): Tool[] {
  const enriched = enrichTool(tool);
  const picked = new Map<number, Tool>();

  const add = (t?: Tool) => {
    if (!t || t.id === tool.id || picked.has(t.id)) return;
    picked.set(t.id, enrichTool(t));
  };

  for (const slug of enriched.alternatives ?? []) {
    add(tools.find((t) => t.slug === slug));
  }

  const tagSet = new Set(tool.tags.map((t) => t.toLowerCase()));
  const byTags = tools
    .filter((t) => t.id !== tool.id)
    .map((t) => ({
      t,
      overlap: t.tags.filter((tag) => tagSet.has(tag.toLowerCase())).length,
    }))
    .filter((x) => x.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap);

  for (const { t } of byTags) add(t);

  for (const t of tools.filter((t) => t.category === tool.category && t.id !== tool.id)) {
    add(t);
  }

  for (const t of tools.filter((t) => t.popular || t.featured)) add(t);

  return [...picked.values()].slice(0, limit);
}

export function getAdjacentTools(slug: string): {
  prev?: Tool;
  next?: Tool;
} {
  const index = tools.findIndex((t) => t.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? enrichTool(tools[index - 1]) : undefined,
    next: index < tools.length - 1 ? enrichTool(tools[index + 1]) : undefined,
  };
}

export function getFeaturedTools(limit = 8): Tool[] {
  return tools
    .filter((t) => t.featured)
    .slice(0, limit)
    .map(enrichTool);
}

export function getPopularTools(limit = 8): Tool[] {
  return tools
    .filter((t) => t.popular)
    .slice(0, limit)
    .map(enrichTool);
}

/** Newest = highest ids (most recently added in data). */
export function getNewestTools(limit = 8): Tool[] {
  return [...tools]
    .sort((a, b) => b.id - a.id)
    .slice(0, limit)
    .map(enrichTool);
}
