export type ToolCategory =
  | "Foundation Models"
  | "Coding Assistants"
  | "Workflow Automation & AI Agent Frameworks"
  | "UGC (AI Video Generation)"
  | "Image Generation"
  | "Music Generation"
  | "AI Voice & Dubbing";

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

export const CATEGORY_COUNT = FILTER_CATEGORIES.length - 1;
