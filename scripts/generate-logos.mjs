import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUT = join(process.cwd(), "public", "logos");
mkdirSync(OUT, { recursive: true });

const logos = [
  // Foundation Models
  { file: "chatgpt.svg", bg: "#10A37F", fg: "#FFFFFF", label: "GPT" },
  { file: "gemini.svg", bg: "#1A73E8", fg: "#FFFFFF", label: "G", accent: "#EA4335" },
  { file: "claude.svg", bg: "#D97757", fg: "#FFFFFF", label: "C" },
  { file: "microsoft-copilot.svg", bg: "#0078D4", fg: "#FFFFFF", label: "Co" },
  { file: "deepseek.svg", bg: "#4D6BFE", fg: "#FFFFFF", label: "DS" },
  { file: "grok.svg", bg: "#0A0A0A", fg: "#FFFFFF", label: "X" },
  { file: "llama.svg", bg: "#0668E1", fg: "#FFFFFF", label: "Ll" },
  { file: "perplexity.svg", bg: "#20808D", fg: "#FFFFFF", label: "P" },

  // Coding Assistants
  { file: "cursor.svg", bg: "#000000", fg: "#FFFFFF", label: "Cu" },
  { file: "antigravity.svg", bg: "#4285F4", fg: "#FFFFFF", label: "AG" },
  { file: "vs-code-copilot.svg", bg: "#007ACC", fg: "#FFFFFF", label: "VS" },
  { file: "claude-code.svg", bg: "#D97757", fg: "#FFFFFF", label: "CC" },
  { file: "windsurf.svg", bg: "#09B6A2", fg: "#FFFFFF", label: "W" },
  { file: "replit-ai.svg", bg: "#F26207", fg: "#FFFFFF", label: "R" },
  { file: "bolt-new.svg", bg: "#F5D547", fg: "#1A1A1A", label: "B" },
  { file: "emergent.svg", bg: "#6366F1", fg: "#FFFFFF", label: "Em" },
  { file: "lovable.svg", bg: "#FF6B9D", fg: "#FFFFFF", label: "L" },
  { file: "trae.svg", bg: "#00D4AA", fg: "#FFFFFF", label: "Tr" },

  // Workflow Automation & AI Agent Frameworks
  { file: "n8n.svg", bg: "#EA4B71", fg: "#FFFFFF", label: "n8n" },
  { file: "make.svg", bg: "#6D00CC", fg: "#FFFFFF", label: "Mk" },
  { file: "zapier.svg", bg: "#FF4A00", fg: "#FFFFFF", label: "Z" },
  { file: "dify.svg", bg: "#155EEF", fg: "#FFFFFF", label: "D" },
  { file: "buildmyagent.svg", bg: "#8B5CF6", fg: "#FFFFFF", label: "BM" },
  { file: "crewai-studio.svg", bg: "#FF6B35", fg: "#FFFFFF", label: "Cr" },
  { file: "autogen-studio.svg", bg: "#0078D4", fg: "#FFFFFF", label: "Au" },
  { file: "vertex-ai-agent-builder.svg", bg: "#4285F4", fg: "#FFFFFF", label: "Vx" },
  { file: "anythingllm.svg", bg: "#2563EB", fg: "#FFFFFF", label: "AL" },
  { file: "ai-agent-framework.svg", bg: "#1C3C3C", fg: "#FFFFFF", label: "AF" },

  // UGC (AI Video Generation)
  { file: "arcads.svg", bg: "#7C3AED", fg: "#FFFFFF", label: "Ar" },
  { file: "heygen.svg", bg: "#6C5CE7", fg: "#FFFFFF", label: "HG" },
  { file: "synthesia.svg", bg: "#5B4FE9", fg: "#FFFFFF", label: "Sy" },
  { file: "captions.svg", bg: "#FF4D6D", fg: "#FFFFFF", label: "Ca" },
  { file: "virbo.svg", bg: "#0066FF", fg: "#FFFFFF", label: "Vi" },
  { file: "akool.svg", bg: "#FF4081", fg: "#FFFFFF", label: "Ak" },
  { file: "creatify.svg", bg: "#FF5722", fg: "#FFFFFF", label: "Cr" },
  { file: "kling-ai.svg", bg: "#FF6600", fg: "#FFFFFF", label: "Kl" },
  { file: "veo.svg", bg: "#4285F4", fg: "#FFFFFF", label: "Ve" },
  { file: "flow.svg", bg: "#34A853", fg: "#FFFFFF", label: "Fl" },
  { file: "higgsfield-ai.svg", bg: "#9333EA", fg: "#FFFFFF", label: "Hi" },
  { file: "pika.svg", bg: "#FF4D6D", fg: "#FFFFFF", label: "Pi" },

  // Image Generation
  { file: "dalle.svg", bg: "#10A37F", fg: "#FFFFFF", label: "DE" },
  { file: "stable-diffusion.svg", bg: "#A855F7", fg: "#FFFFFF", label: "SD" },
  { file: "flux.svg", bg: "#1A1A1A", fg: "#FFFFFF", label: "Fx" },
  { file: "imagen.svg", bg: "#4285F4", fg: "#FFFFFF", label: "Im" },
  { file: "midjourney.svg", bg: "#000000", fg: "#FFFFFF", label: "MJ" },

  // Music Generation
  { file: "suno.svg", bg: "#FF6B35", fg: "#FFFFFF", label: "Su" },
  { file: "udio.svg", bg: "#6366F1", fg: "#FFFFFF", label: "Ud" },
  { file: "musicgen.svg", bg: "#0668E1", fg: "#FFFFFF", label: "MG" },

  // AI Voice & Dubbing
  { file: "elevenlabs.svg", bg: "#000000", fg: "#FFFFFF", label: "11" },
  { file: "whisper.svg", bg: "#10A37F", fg: "#FFFFFF", label: "Wh" },
];

function svg(def) {
  const accent = def.accent
    ? `<circle cx="36" cy="12" r="5" fill="${def.accent}" opacity="0.9"/>`
    : "";
  const fontSize = def.label.length > 2 ? 11 : def.label.length > 1 ? 14 : 18;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-label="${def.file}">
  <defs>
    <linearGradient id="g-${def.file.replace(".", "")}" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${def.bg}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${def.bg}" stop-opacity="0.82"/>
    </linearGradient>
  </defs>
  <rect width="48" height="48" rx="12" fill="url(#g-${def.file.replace(".", "")})"/>
  <rect x="1" y="1" width="46" height="46" rx="11" fill="none" stroke="rgba(255,255,255,0.12)"/>
  ${accent}
  <text x="24" y="29" text-anchor="middle" fill="${def.fg}" font-family="system-ui,-apple-system,Segoe UI,sans-serif" font-size="${fontSize}" font-weight="700">${def.label}</text>
</svg>`;
}

for (const logo of logos) {
  writeFileSync(join(OUT, logo.file), svg(logo), "utf8");
}

console.log(`Generated ${logos.length} logos in public/logos/`);
