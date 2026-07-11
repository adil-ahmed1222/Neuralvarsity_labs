export const APP_NAME = "NeuralVarsity CMS";
export const SUGGEST_TOOL_PATH = "/labs/suggest";
export const SUGGEST_TOOL_EMAIL = "labs@neuralvarsity.ai";
export const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "adil-ahmed1222";
export const GITHUB_API = "https://api.github.com";

export const SIDEBAR_NAV = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Projects", href: "/projects", icon: "FolderKanban" },
  { label: "Deployments", href: "/deployments", icon: "Rocket" },
  { label: "Repositories", href: "/repositories", icon: "GitBranch" },
  { label: "Analytics", href: "/analytics", icon: "BarChart3" },
  { label: "Categories", href: "/categories", icon: "Layers" },
  { label: "Tags", href: "/tags", icon: "Tags" },
  { label: "Technology Stack", href: "/technologies", icon: "Cpu" },
  { label: "Releases", href: "/releases", icon: "Package" },
  { label: "Resources", href: "/resources", icon: "BookOpen" },
  { label: "Settings", href: "/settings", icon: "Settings" },
] as const;

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  Java: "#ED8B00",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Ruby: "#CC342D",
  PHP: "#777BB4",
  CSS: "#1572B6",
  HTML: "#E34F26",
  Shell: "#89E051",
  Vue: "#4FC08D",
  Dart: "#0175C2",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
};

export const TECH_PATTERNS: Record<string, RegExp[]> = {
  "Next.js": [/next\.config/i, /"next":/],
  React: [/react/i, /jsx/i],
  Vue: [/vue/i],
  Angular: [/angular/i],
  Python: [/\.py$/i, /requirements\.txt/i],
  FastAPI: [/fastapi/i],
  Node: [/node/i, /express/i],
  Supabase: [/supabase/i],
  Firebase: [/firebase/i],
  PostgreSQL: [/postgres/i, /postgresql/i],
  MongoDB: [/mongodb/i, /mongoose/i],
  Tailwind: [/tailwind/i],
  OpenAI: [/openai/i, /gpt/i],
  Docker: [/dockerfile/i, /docker-compose/i],
  Redis: [/redis/i],
  LangChain: [/langchain/i],
  CrewAI: [/crewai/i],
  Flowise: [/flowise/i],
  Dify: [/dify/i],
  LangGraph: [/langgraph/i],
  n8n: [/n8n/i],
  Pinecone: [/pinecone/i],
  Qdrant: [/qdrant/i],
  Milvus: [/milvus/i],
};
