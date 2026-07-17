export type ToolCategory =
  | "Foundation Models"
  | "Coding Assistants"
  | "Workflow Automation & AI Agent Frameworks"
  | "UGC (AI Video Generation)"
  | "Image Generation"
  | "Music Generation"
  | "AI Voice & Dubbing";

export type ToolBadge =
  | "editors-pick"
  | "most-used"
  | "trending"
  | "best-beginner"
  | "open-source"
  | "enterprise";

export interface Tool {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: ToolCategory;
  logo: string;
  website: string;
  tags: string[];
  featured?: boolean;
  popular?: boolean;
  /** Optional Wikipedia-style detail fields */
  overview?: string;
  bestFor?: string[];
  features?: string[];
  pricing?: string;
  freePlan?: boolean | string;
  apiAvailable?: boolean | string;
  platforms?: string[];
  company?: string;
  badges?: ToolBadge[];
  /** Extra search keywords / aliases */
  aliases?: string[];
  /** Alternative tool slugs */
  alternatives?: string[];
}

export const FILTER_CATEGORIES = [
  "All",
  "Foundation Models",
  "Coding Assistants",
  "Workflow Automation & AI Agent Frameworks",
  "UGC (AI Video Generation)",
  "Image Generation",
  "Music Generation",
  "AI Voice & Dubbing",
] as const;

export type FilterCategory = (typeof FILTER_CATEGORIES)[number];

export const CATEGORY_COLORS: Record<ToolCategory, string> = {
  "Foundation Models": "bg-sky-500/15 text-sky-300 border-sky-500/25",
  "Coding Assistants": "bg-violet-500/15 text-violet-300 border-violet-500/25",
  "Workflow Automation & AI Agent Frameworks":
    "bg-amber-500/15 text-amber-300 border-amber-500/25",
  "UGC (AI Video Generation)": "bg-rose-500/15 text-rose-300 border-rose-500/25",
  "Image Generation": "bg-pink-500/15 text-pink-300 border-pink-500/25",
  "Music Generation": "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
  "AI Voice & Dubbing": "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
};

/** Shorter labels for compact UI surfaces like tool cards */
export const CATEGORY_CARD_LABELS: Record<ToolCategory, string> = {
  "Foundation Models": "Foundation Models",
  "Coding Assistants": "Coding Assistants",
  "Workflow Automation & AI Agent Frameworks": "Automation & Agents",
  "UGC (AI Video Generation)": "UGC Video",
  "Image Generation": "Image Gen",
  "Music Generation": "Music Gen",
  "AI Voice & Dubbing": "Voice & Dubbing",
};

/** Navbar / popular-category short names */
export const CATEGORY_SHORT_LABELS: Record<ToolCategory, string> = {
  "Foundation Models": "Foundation",
  "Coding Assistants": "Coding",
  "Workflow Automation & AI Agent Frameworks": "Automation",
  "UGC (AI Video Generation)": "Video",
  "Image Generation": "Image",
  "Music Generation": "Music",
  "AI Voice & Dubbing": "Voice",
};

export const CATEGORY_SLUGS: Record<ToolCategory, string> = {
  "Foundation Models": "foundation-models",
  "Coding Assistants": "coding-assistants",
  "Workflow Automation & AI Agent Frameworks": "automation-agents",
  "UGC (AI Video Generation)": "ugc-video",
  "Image Generation": "image-generation",
  "Music Generation": "music-generation",
  "AI Voice & Dubbing": "voice-dubbing",
};

export const BADGE_LABELS: Record<ToolBadge, string> = {
  "editors-pick": "Editor's Pick",
  "most-used": "Most Used",
  trending: "Trending",
  "best-beginner": "Best Beginner Tool",
  "open-source": "Open Source",
  enterprise: "Enterprise",
};

export const BADGE_STYLES: Record<ToolBadge, string> = {
  "editors-pick": "text-[#FFB800] border-[rgba(255,184,0,0.35)] bg-[rgba(255,184,0,0.08)]",
  "most-used": "text-orange-300 border-orange-400/30 bg-orange-500/10",
  trending: "text-rose-300 border-rose-400/30 bg-rose-500/10",
  "best-beginner": "text-emerald-300 border-emerald-400/30 bg-emerald-500/10",
  "open-source": "text-sky-300 border-sky-400/30 bg-sky-500/10",
  enterprise: "text-violet-300 border-violet-400/30 bg-violet-500/10",
};

export const CATEGORY_COUNT = FILTER_CATEGORIES.length - 1;

export function categoryFromSlug(slug: string): ToolCategory | undefined {
  return (Object.entries(CATEGORY_SLUGS) as [ToolCategory, string][]).find(
    ([, s]) => s === slug
  )?.[0];
}
