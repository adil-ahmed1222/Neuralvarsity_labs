import type { Tool, ToolBadge, ToolCategory } from "@/types/tool";

const CATEGORY_DEFAULTS: Record<
  ToolCategory,
  {
    bestFor: string[];
    features: string[];
    pricing: string;
    freePlan: string;
    apiAvailable: string;
    platforms: string[];
  }
> = {
  "Foundation Models": {
    bestFor: ["General chat", "Research", "Writing", "Brainstorming"],
    features: ["Conversational AI", "Multimodal input", "Long-context reasoning", "Plugin / tool use"],
    pricing: "Free tier available; paid plans for higher limits",
    freePlan: "Yes — limited daily usage",
    apiAvailable: "Yes — typically via provider API",
    platforms: ["Web", "iOS", "Android", "API"],
  },
  "Coding Assistants": {
    bestFor: ["Software development", "Debugging", "Refactoring", "Learning to code"],
    features: ["Inline completions", "Code chat", "Multi-file edits", "Agent workflows"],
    pricing: "Free trial or student plans; Pro for full features",
    freePlan: "Limited free tier / trial on most tools",
    apiAvailable: "Varies by product",
    platforms: ["Desktop IDE", "Web IDE", "CLI"],
  },
  "Workflow Automation & AI Agent Frameworks": {
    bestFor: ["Automating workflows", "Connecting apps", "Building agents", "Ops teams"],
    features: ["Visual builders", "Integrations", "AI nodes", "Triggers & schedules"],
    pricing: "Free / self-hosted options; cloud paid tiers",
    freePlan: "Often yes (usage caps or self-host)",
    apiAvailable: "Yes — webhooks & REST APIs common",
    platforms: ["Web", "Self-hosted", "Cloud"],
  },
  "UGC (AI Video Generation)": {
    bestFor: ["Marketing videos", "UGC ads", "Training content", "Social clips"],
    features: ["Text-to-video", "Avatars", "Templates", "Voiceover"],
    pricing: "Credit-based subscriptions are common",
    freePlan: "Trial credits or free watermarked exports",
    apiAvailable: "Available on some platforms",
    platforms: ["Web", "Mobile (select apps)"],
  },
  "Image Generation": {
    bestFor: ["Art & design", "Marketing creatives", "Concept art", "Illustrations"],
    features: ["Text-to-image", "Style control", "Upscaling", "Prompt libraries"],
    pricing: "Free tiers or credits; Pro for commercial use",
    freePlan: "Usually limited generations / day",
    apiAvailable: "Yes for most major models",
    platforms: ["Web", "API", "Discord (some)"],
  },
  "Music Generation": {
    bestFor: ["Songwriting", "Background tracks", "Content creators", "Prototyping audio"],
    features: ["Text-to-music", "Vocals", "Genre styles", "Stem export (select)"],
    pricing: "Free credits + paid plans for commercial rights",
    freePlan: "Yes — usage-limited",
    apiAvailable: "Limited / partner APIs",
    platforms: ["Web"],
  },
  "AI Voice & Dubbing": {
    bestFor: ["Voiceovers", "Dubbing", "Transcription", "Podcasts"],
    features: ["Text-to-speech", "Voice cloning", "Multilingual", "Speech-to-text"],
    pricing: "Character or minute-based pricing",
    freePlan: "Yes — starter quotas",
    apiAvailable: "Yes — widely API-first",
    platforms: ["Web", "API"],
  },
};

/** Company inference from tags / name */
function inferCompany(tool: Tool): string {
  const tag = tool.tags.find((t) =>
    ["OpenAI", "Google", "Anthropic", "Microsoft", "Meta", "xAI", "ByteDance", "Codeium", "GitHub"].includes(t)
  );
  if (tag) return tag;
  if (tool.name.includes("Claude")) return "Anthropic";
  if (tool.name.includes("ChatGPT") || tool.name.includes("DALL") || tool.name === "Whisper") return "OpenAI";
  if (tool.name.includes("Gemini") || tool.name.includes("Veo") || tool.name.includes("Imagen") || tool.name.includes("Vertex") || tool.name.includes("AntiGravity") || tool.name === "Flow")
    return "Google";
  if (tool.name.includes("Copilot")) return "Microsoft";
  if (tool.name.includes("Llama") || tool.name === "MusicGen") return "Meta";
  return tool.tags[0] ?? "Independent";
}

function inferBadges(tool: Tool): ToolBadge[] {
  const badges: ToolBadge[] = [];
  if (tool.featured) badges.push("editors-pick");
  if (tool.popular) badges.push("most-used");
  if (tool.tags.some((t) => /open.?source/i.test(t))) badges.push("open-source");
  if (tool.tags.some((t) => /enterprise/i.test(t))) badges.push("enterprise");
  if (
    ["chatgpt", "gemini", "cursor", "heygen", "elevenlabs", "n8n", "lovable"].includes(tool.slug)
  ) {
    badges.push("best-beginner");
  }
  if (["kling-ai", "veo", "flux", "claude-code", "antigravity"].includes(tool.slug)) {
    badges.push("trending");
  }
  return [...new Set(badges)].slice(0, 3);
}

function inferAliases(tool: Tool): string[] {
  const aliases = new Set<string>([
    ...tool.tags.map((t) => t.toLowerCase()),
    tool.category.toLowerCase(),
  ]);

  const slugHints: Record<string, string[]> = {
    chatgpt: ["openai", "gpt", "chat", "gpt-4", "free"],
    gemini: ["google", "bard", "multimodal"],
    claude: ["anthropic", "coding", "writing"],
    "microsoft-copilot": ["microsoft", "bing", "office", "free"],
    deepseek: ["coding", "reasoning", "free", "open source"],
    grok: ["xai", "twitter", "x"],
    llama: ["meta", "open source", "free"],
    perplexity: ["search", "research", "citations"],
    cursor: ["coding", "ide", "agents", "vscode"],
    antigravity: ["google", "coding", "agents"],
    "vs-code-copilot": ["github", "coding", "vscode", "microsoft"],
    "claude-code": ["anthropic", "coding", "terminal", "agents"],
    windsurf: ["coding", "codeium", "ide"],
    "replit-ai": ["coding", "cloud", "deploy"],
    "bolt-new": ["coding", "full-stack", "prompt"],
    emergent: ["coding", "no-code", "apps"],
    lovable: ["coding", "react", "no-code"],
    trae: ["coding", "bytedance", "ide"],
    n8n: ["automation", "workflow", "free", "self-hosted"],
    make: ["automation", "integrations"],
    zapier: ["automation", "no-code"],
    dify: ["llm", "rag", "agents", "open source"],
    buildmyagent: ["agents", "no-code"],
    "crewai-studio": ["agents", "multi-agent"],
    "autogen-studio": ["microsoft", "agents"],
    "vertex-ai-agent-builder": ["google", "enterprise", "agents"],
    anythingllm: ["rag", "local", "documents", "free"],
    "ai-agent-framework": ["langgraph", "agents", "orchestration"],
    arcads: ["video", "ugc", "ads", "marketing"],
    heygen: ["video", "avatar", "voice", "marketing"],
    synthesia: ["video", "avatar", "enterprise", "training"],
    captions: ["video", "social", "editing"],
    virbo: ["video", "avatar", "wondershare"],
    akool: ["video", "faceswap", "avatar"],
    creatify: ["video", "ads", "ugc", "ecommerce"],
    "kling-ai": ["video", "text-to-video", "cinematic"],
    veo: ["video", "google", "text-to-video", "cinematic"],
    flow: ["video", "google", "veo", "filmmaking"],
    "higgsfield-ai": ["video", "creative", "social"],
    pika: ["video", "animation", "creative"],
    dalle: ["openai", "image", "art", "dall-e"],
    "stable-diffusion": ["image", "open source", "free", "diffusion"],
    flux: ["image", "photorealistic", "art"],
    imagen: ["google", "image", "photorealistic"],
    midjourney: ["image", "art", "discord"],
    suno: ["music", "song", "vocals"],
    udio: ["music", "vocals", "song"],
    musicgen: ["meta", "music", "open source"],
    elevenlabs: ["voice", "tts", "dubbing", "speech"],
    whisper: ["openai", "voice", "transcription", "speech-to-text"],
  };

  for (const a of slugHints[tool.slug] ?? []) aliases.add(a);
  return [...aliases];
}

function inferFreePlan(tool: Tool): string {
  const defaults = CATEGORY_DEFAULTS[tool.category].freePlan;
  if (tool.aliases?.includes("free") || tool.tags.some((t) => /free|open.?source/i.test(t))) {
    return "Yes — free tier or open-source option";
  }
  return defaults;
}

/** Enrich a tool with Wikipedia-style detail fields (fill missing only). */
export function enrichTool(tool: Tool): Tool {
  const defaults = CATEGORY_DEFAULTS[tool.category];
  const freePlan = tool.freePlan ?? inferFreePlan(tool);
  const hasFree =
    freePlan === true ||
    (typeof freePlan === "string" && /yes|free|trial|open.?source|limited/i.test(freePlan));

  return {
    ...tool,
    overview: tool.overview ?? tool.description,
    bestFor: tool.bestFor ?? defaults.bestFor,
    features: tool.features ?? defaults.features,
    pricing: tool.pricing ?? defaults.pricing,
    freePlan: tool.freePlan ?? freePlan,
    apiAvailable: tool.apiAvailable ?? defaults.apiAvailable,
    platforms: tool.platforms ?? defaults.platforms,
    company: tool.company ?? inferCompany(tool),
    badges: tool.badges ?? inferBadges(tool),
    aliases: tool.aliases ?? inferAliases(tool),
    // keep a marker alias for free-search matching
    ...(hasFree
      ? {
          aliases: [...new Set([...(tool.aliases ?? inferAliases(tool)), "free"])],
        }
      : {}),
  };
}

/** Intent-aware search scoring */
export function searchTools(tools: Tool[], query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return tools;

  const intentKeywords: Record<string, string[]> = {
    video: ["video", "ugc", "avatar", "text-to-video", "cinematic", "animation", "filmmaking"],
    coding: ["coding", "ide", "code", "developer", "agents", "vscode"],
    code: ["coding", "ide", "code", "developer"],
    free: ["free"],
    openai: ["openai"],
    voice: ["voice", "tts", "speech", "dubbing", "transcription"],
    image: ["image", "art", "text-to-image"],
    music: ["music", "song", "vocals"],
    automation: ["automation", "workflow", "integrations", "agents"],
    agent: ["agents", "multi-agent", "orchestration"],
    search: ["search", "research", "citations"],
  };

  const scored = tools.map((raw) => {
    const tool = enrichTool(raw);
    let score = 0;
    const haystack = [
      tool.name,
      tool.slug,
      tool.description,
      tool.category,
      tool.company ?? "",
      ...tool.tags,
      ...(tool.aliases ?? []),
      ...(tool.bestFor ?? []),
      ...(tool.features ?? []),
    ]
      .join(" ")
      .toLowerCase();

    if (tool.name.toLowerCase() === q) score += 100;
    if (tool.name.toLowerCase().startsWith(q)) score += 60;
    if (tool.name.toLowerCase().includes(q)) score += 40;
    if (tool.slug.includes(q)) score += 35;
    if ((tool.company ?? "").toLowerCase().includes(q)) score += 45;
    if (tool.tags.some((t) => t.toLowerCase() === q)) score += 50;
    if (tool.tags.some((t) => t.toLowerCase().includes(q))) score += 25;
    if ((tool.aliases ?? []).some((a) => a === q || a.includes(q))) score += 55;
    if (tool.category.toLowerCase().includes(q)) score += 20;
    if (tool.description.toLowerCase().includes(q)) score += 10;

    for (const [intent, keys] of Object.entries(intentKeywords)) {
      if (q === intent || q.includes(intent)) {
        if (keys.some((k) => haystack.includes(k))) score += 70;
        // Free intent: require freePlan truthiness
        if (intent === "free") {
          const fp = tool.freePlan;
          const ok =
            fp === true ||
            (typeof fp === "string" && /yes|free|trial|open.?source|limited/i.test(fp));
          if (ok) score += 80;
          else score -= 40;
        }
      }
    }

    // Priority boosts for classic intent examples
    if ((q === "coding" || q === "code") && tool.slug === "cursor") score += 40;
    if (q === "voice" && tool.slug === "elevenlabs") score += 40;
    if (q === "openai" && ["chatgpt", "dalle", "whisper"].includes(tool.slug)) score += 30;
    if (
      q === "video" &&
      ["heygen", "kling-ai", "veo", "pika", "higgsfield-ai"].includes(tool.slug)
    ) {
      score += 25;
    }

    return { tool: raw, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.tool);
}

export function getUniqueCompanies(tools: Tool[]): number {
  return new Set(tools.map((t) => enrichTool(t).company)).size;
}

export const CATEGORY_EDU: Record<
  ToolCategory,
  { blurb: string; beginnerTip: string }
> = {
  "Foundation Models": {
    blurb:
      "Foundation models are general-purpose AI systems trained on massive datasets. They power chat, reasoning, writing, and multimodal apps.",
    beginnerTip: "Start with ChatGPT or Gemini — both have generous free access and great learning docs.",
  },
  "Coding Assistants": {
    blurb:
      "Coding assistants help you write, edit, and ship software faster with AI completions, chat, and autonomous agents inside your IDE.",
    beginnerTip: "Cursor is the best beginner-friendly coding IDE if you already know VS Code basics.",
  },
  "Workflow Automation & AI Agent Frameworks": {
    blurb:
      "These tools connect apps and orchestrate multi-step AI agents—so repetitive work runs automatically.",
    beginnerTip: "Try n8n if you want free / self-hosted automation with AI nodes.",
  },
  "UGC (AI Video Generation)": {
    blurb:
      "AI video tools create marketing clips, avatars, and cinematic scenes from text or images—ideal for creators and marketers.",
    beginnerTip: "HeyGen is a great first stop for talking-avatar videos; Kling/Veo for cinematic clips.",
  },
  "Image Generation": {
    blurb:
      "Image models turn prompts into art, product shots, and concept designs with different levels of control and openness.",
    beginnerTip: "DALL·E is easy via ChatGPT; Stable Diffusion is best if you want open-source control.",
  },
  "Music Generation": {
    blurb:
      "Music generators create full songs with vocals, beats, and styles from simple text prompts.",
    beginnerTip: "Suno is the friendliest place to make your first AI song in minutes.",
  },
  "AI Voice & Dubbing": {
    blurb:
      "Voice AI covers realistic text-to-speech, cloning, dubbing, and speech recognition for content and products.",
    beginnerTip: "ElevenLabs for voice; Whisper for transcription—both are industry standards.",
  },
};
