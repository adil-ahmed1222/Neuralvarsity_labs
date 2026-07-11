import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const OUT = join(process.cwd(), "public", "logos");
mkdirSync(OUT, { recursive: true });

const LOBE_COLOR =
  "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-svg/color";
const LOBE_ICON =
  "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-svg/icons";
const SIMPLE_ICONS = "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons";
const DD_LOBE = "https://www.developersdigest.tech/icons/lobehub";
const DD_ICON = "https://www.developersdigest.tech/icons";

/** @type {{ file: string; sources: string[] }[]} */
const LOGOS = [
  // Foundation Models
  {
    file: "chatgpt.svg",
    sources: [
      `${LOBE_COLOR}/openai.svg`,
      `${DD_ICON}/chatgpt.svg`,
      `${SIMPLE_ICONS}/openai.svg`,
    ],
  },
  {
    file: "gemini.svg",
    sources: [
      `${LOBE_COLOR}/gemini.svg`,
      `${DD_ICON}/gemini.svg`,
      `${SIMPLE_ICONS}/googlegemini.svg`,
    ],
  },
  {
    file: "claude.svg",
    sources: [
      `${DD_LOBE}/claude-color.svg`,
      `${LOBE_COLOR}/claude.svg`,
      `${DD_ICON}/claude.svg`,
    ],
  },
  {
    file: "copilot.svg",
    sources: [
      `${LOBE_COLOR}/copilot.svg`,
      `${DD_LOBE}/copilot-color.svg`,
      `${SIMPLE_ICONS}/microsoft.svg`,
    ],
  },
  {
    file: "deepseek.svg",
    sources: [
      `${LOBE_COLOR}/deepseek.svg`,
      `${DD_ICON}/deepseek.svg`,
      `${SIMPLE_ICONS}/deepseek.svg`,
    ],
  },
  {
    file: "grok.svg",
    sources: [
      `${LOBE_COLOR}/grok.svg`,
      `${DD_LOBE}/grok.svg`,
      `${SIMPLE_ICONS}/x.svg`,
    ],
  },
  {
    file: "llama.svg",
    sources: [
      `${DD_LOBE}/meta-color.svg`,
      `${LOBE_COLOR}/meta.svg`,
      `${SIMPLE_ICONS}/meta.svg`,
    ],
  },
  {
    file: "perplexity.svg",
    sources: [
      `${LOBE_COLOR}/perplexity.svg`,
      `${DD_ICON}/perplexity.svg`,
      `${SIMPLE_ICONS}/perplexity.svg`,
    ],
  },

  // Coding Assistants
  {
    file: "cursor.svg",
    sources: [
      `${LOBE_ICON}/cursor.svg`,
      `${DD_LOBE}/cursor.svg`,
      `${DD_ICON}/cursor.svg`,
      "https://cdn.jsdelivr.net/npm/@dev.icons/core@latest/export-files/icons/cursor-icon.svg",
    ],
  },
  {
    file: "antigravity.svg",
    sources: [
      `${LOBE_COLOR}/antigravity.svg`,
      `${DD_LOBE}/antigravity-color.svg`,
      `${DD_LOBE}/antigravity.svg`,
    ],
  },
  {
    file: "vscode-copilot.svg",
    sources: [
      `${LOBE_COLOR}/githubcopilot.svg`,
      `${DD_LOBE}/githubcopilot.svg`,
      `${DD_ICON}/copilot.svg`,
      `${SIMPLE_ICONS}/githubcopilot.svg`,
    ],
  },
  {
    file: "claude-code.svg",
    sources: [
      `${LOBE_COLOR}/claudecode.svg`,
      `${DD_ICON}/claude-code.svg`,
      `${DD_LOBE}/claudecode-color.svg`,
    ],
  },
  {
    file: "windsurf.svg",
    sources: [
      `${LOBE_ICON}/windsurf.svg`,
      `${DD_ICON}/windsurf.svg`,
      "https://cdn.jsdelivr.net/npm/@dev.icons/core@latest/export-files/icons/windsurf-icon.svg",
    ],
  },
  {
    file: "replit.svg",
    sources: [
      `${LOBE_COLOR}/replit.svg`,
      `${DD_ICON}/replit.svg`,
      `${SIMPLE_ICONS}/replit.svg`,
    ],
  },
  {
    file: "bolt.svg",
    sources: [
      `${LOBE_COLOR}/bolt.svg`,
      `${DD_ICON}/bolt.svg`,
      `${SIMPLE_ICONS}/stackblitz.svg`,
    ],
  },
  {
    file: "emergent.svg",
    sources: [
      `${LOBE_COLOR}/emergent.svg`,
      "https://emergent.sh/favicon.svg",
      "https://www.google.com/s2/favicons?domain=emergent.sh&sz=128",
    ],
  },
  {
    file: "lovable.svg",
    sources: [
      `${LOBE_COLOR}/lovable.svg`,
      `${DD_ICON}/lovable.svg`,
      "https://lovable.dev/favicon.svg",
    ],
  },
  {
    file: "trae.svg",
    sources: [
      `${LOBE_COLOR}/trae.svg`,
      "https://www.trae.ai/favicon.ico",
      "https://www.google.com/s2/favicons?domain=trae.ai&sz=128",
    ],
  },

  // Automation & Agents
  {
    file: "n8n.svg",
    sources: [
      `${LOBE_COLOR}/n8n.svg`,
      `${DD_ICON}/n8n.svg`,
      `${SIMPLE_ICONS}/n8n.svg`,
    ],
  },
  {
    file: "make.svg",
    sources: [
      `${LOBE_COLOR}/make.svg`,
      `${DD_LOBE}/make-color.svg`,
      `${SIMPLE_ICONS}/make.svg`,
    ],
  },
  {
    file: "zapier.svg",
    sources: [
      `${LOBE_COLOR}/zapier.svg`,
      `${SIMPLE_ICONS}/zapier.svg`,
    ],
  },
  {
    file: "dify.svg",
    sources: [
      `${LOBE_COLOR}/dify.svg`,
      `${DD_LOBE}/dify-color.svg`,
      `${SIMPLE_ICONS}/dify.svg`,
    ],
  },
  {
    file: "buildmyagent.svg",
    sources: [
      `${LOBE_COLOR}/buildmyagent.svg`,
      "https://buildmyagent.io/favicon.ico",
      "https://www.google.com/s2/favicons?domain=buildmyagent.io&sz=128",
    ],
  },
  {
    file: "crewai.svg",
    sources: [
      `${LOBE_COLOR}/crewai.svg`,
      `${DD_LOBE}/crewai-brand-color.svg`,
      `${DD_ICON}/crewai.svg`,
    ],
  },

  // Workflow Automation (remaining)
  {
    file: "autogen-studio.svg",
    sources: [
      `${DD_ICON}/autogen.svg`,
      `${LOBE_COLOR}/autogen.svg`,
      `${SIMPLE_ICONS}/microsoft.svg`,
    ],
  },
  {
    file: "vertex-ai-agent-builder.svg",
    sources: [
      `${DD_LOBE}/vertexai-color.svg`,
      `${LOBE_COLOR}/vertexai.svg`,
      `${SIMPLE_ICONS}/googlecloud.svg`,
    ],
  },
  {
    file: "anythingllm.svg",
    sources: [
      `${LOBE_COLOR}/anythingllm.svg`,
      `${DD_ICON}/anythingllm.svg`,
      "https://anythingllm.com/favicon.svg",
      "https://www.google.com/s2/favicons?domain=anythingllm.com&sz=128",
    ],
  },
  {
    file: "ai-agent-framework.svg",
    sources: [
      `${DD_LOBE}/langgraph-color.svg`,
      `${LOBE_COLOR}/langgraph.svg`,
      `${DD_LOBE}/langgraph.svg`,
    ],
  },

  // UGC Video
  {
    file: "arcads.svg",
    sources: [
      `${LOBE_COLOR}/arcads.svg`,
      "https://www.google.com/s2/favicons?domain=arcads.ai&sz=128",
    ],
  },
  {
    file: "heygen.svg",
    sources: [
      `${LOBE_COLOR}/heygen.svg`,
      `${SIMPLE_ICONS}/heygen.svg`,
      "https://www.google.com/s2/favicons?domain=heygen.com&sz=128",
    ],
  },
  {
    file: "synthesia.svg",
    sources: [
      `${LOBE_COLOR}/synthesia.svg`,
      `${SIMPLE_ICONS}/synthesia.svg`,
      "https://www.google.com/s2/favicons?domain=synthesia.io&sz=128",
    ],
  },
  {
    file: "captions.svg",
    sources: [
      `${LOBE_COLOR}/captions.svg`,
      "https://www.google.com/s2/favicons?domain=captions.ai&sz=128",
    ],
  },
  {
    file: "virbo.svg",
    sources: [
      `${LOBE_COLOR}/virbo.svg`,
      `${SIMPLE_ICONS}/wondershare.svg`,
      "https://www.google.com/s2/favicons?domain=virbo.wondershare.com&sz=128",
    ],
  },
  {
    file: "akool.svg",
    sources: [
      `${LOBE_COLOR}/akool.svg`,
      "https://www.google.com/s2/favicons?domain=akool.com&sz=128",
    ],
  },
  {
    file: "creatify.svg",
    sources: [
      `${LOBE_COLOR}/creatify.svg`,
      "https://www.google.com/s2/favicons?domain=creatify.ai&sz=128",
    ],
  },
  {
    file: "kling-ai.svg",
    sources: [
      `${DD_LOBE}/kling-color.svg`,
      `${LOBE_COLOR}/kling.svg`,
      `${DD_LOBE}/kling.svg`,
    ],
  },
  {
    file: "veo.svg",
    sources: [
      `${DD_LOBE}/veo-color.svg`,
      `${LOBE_COLOR}/veo.svg`,
      `${DD_LOBE}/veo.svg`,
      `${SIMPLE_ICONS}/google.svg`,
    ],
  },
  {
    file: "flow.svg",
    sources: [
      `${LOBE_COLOR}/flow.svg`,
      `${LOBE_COLOR}/googlelabs.svg`,
      "https://www.google.com/s2/favicons?domain=labs.google&sz=128",
    ],
  },
  {
    file: "higgsfield-ai.svg",
    sources: [
      `${LOBE_COLOR}/higgsfield.svg`,
      "https://www.google.com/s2/favicons?domain=higgsfield.ai&sz=128",
    ],
  },
  {
    file: "pika.svg",
    sources: [
      `${DD_LOBE}/pika.svg`,
      `${LOBE_COLOR}/pika.svg`,
      `${SIMPLE_ICONS}/pika.svg`,
    ],
  },

  // Image Generation
  {
    file: "dalle.svg",
    sources: [
      `${DD_LOBE}/dalle-color.svg`,
      `${LOBE_COLOR}/dalle.svg`,
      `${LOBE_COLOR}/openai.svg`,
    ],
  },
  {
    file: "stable-diffusion.svg",
    sources: [
      `${DD_LOBE}/stability-color.svg`,
      `${LOBE_COLOR}/stability.svg`,
      `${SIMPLE_ICONS}/stability.svg`,
    ],
  },
  {
    file: "flux.svg",
    sources: [
      `${DD_LOBE}/flux.svg`,
      `${LOBE_COLOR}/flux.svg`,
      "https://www.google.com/s2/favicons?domain=blackforestlabs.ai&sz=128",
    ],
  },
  {
    file: "imagen.svg",
    sources: [
      `${DD_LOBE}/imagen-color.svg`,
      `${LOBE_COLOR}/imagen.svg`,
      `${DD_LOBE}/imagen.svg`,
      `${SIMPLE_ICONS}/google.svg`,
    ],
  },
  {
    file: "midjourney.svg",
    sources: [
      `${DD_LOBE}/midjourney.svg`,
      `${LOBE_COLOR}/midjourney.svg`,
      `${SIMPLE_ICONS}/midjourney.svg`,
    ],
  },

  // Music Generation
  {
    file: "suno.svg",
    sources: [
      `${DD_LOBE}/suno.svg`,
      `${LOBE_COLOR}/suno.svg`,
      `${SIMPLE_ICONS}/suno.svg`,
    ],
  },
  {
    file: "udio.svg",
    sources: [
      `${DD_LOBE}/udio-color.svg`,
      `${LOBE_COLOR}/udio.svg`,
      `${SIMPLE_ICONS}/udio.svg`,
    ],
  },
  {
    file: "musicgen.svg",
    sources: [
      `${LOBE_COLOR}/meta.svg`,
      `${DD_LOBE}/meta-color.svg`,
      `${SIMPLE_ICONS}/meta.svg`,
    ],
  },

  // Voice & Dubbing
  {
    file: "elevenlabs.svg",
    sources: [
      `${DD_LOBE}/elevenlabs.svg`,
      `${LOBE_COLOR}/elevenlabs.svg`,
      `${SIMPLE_ICONS}/elevenlabs.svg`,
    ],
  },
  {
    file: "whisper.svg",
    sources: [
      `${LOBE_COLOR}/openai.svg`,
      `${DD_ICON}/chatgpt.svg`,
      `${SIMPLE_ICONS}/openai.svg`,
    ],
  },
];

function optimizeSvg(content) {
  return content
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\?xml[\s\S]*?\?>/g, "")
    .replace(/\s+xmlns:xlink="[^"]*"/g, "")
    .replace(/\s+data-[\w-]+="[^"]*"/g, "")
    .replace(/\n\s*\n/g, "\n")
    .trim();
}

async function fetchAsset(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "NeuralVarsity-Labs/1.0 (logo-downloader)" },
    redirect: "follow",
  });
  if (!res.ok) return null;

  const type = res.headers.get("content-type") ?? "";
  const buf = Buffer.from(await res.arrayBuffer());

  if (type.includes("svg") || url.endsWith(".svg")) {
    const text = buf.toString("utf8");
    if (!text.includes("<svg")) return null;
    return { ext: "svg", data: optimizeSvg(text) };
  }

  if (
    type.includes("png") ||
    type.includes("jpeg") ||
    type.includes("webp") ||
    type.includes("octet-stream") ||
    type.includes("icon") ||
    url.includes("favicon")
  ) {
    return { ext: "png", data: buf };
  }

  return null;
}

async function downloadLogo({ file, sources }) {
  const base = file.replace(/\.(svg|png)$/, "");

  for (const url of sources) {
    try {
      const asset = await fetchAsset(url);
      if (!asset) continue;

      const outFile =
        asset.ext === "svg" ? `${base}.svg` : `${base}.png`;
      const outPath = join(OUT, outFile);

      if (asset.ext === "svg") {
        writeFileSync(outPath, asset.data, "utf8");
      } else {
        writeFileSync(outPath, asset.data);
      }

      console.log(`✓ ${outFile} ← ${url}`);
      return outFile;
    } catch (err) {
      console.warn(`  ✗ ${url}: ${err.message}`);
    }
  }

  console.error(`✗ FAILED: ${file}`);
  return null;
}

const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" role="img" aria-label="Default tool logo">
  <rect width="48" height="48" rx="12" fill="none" stroke="#64748B" stroke-width="2"/>
  <circle cx="24" cy="24" r="10" fill="none" stroke="#94A3B8" stroke-width="2"/>
  <path d="M24 14v6M24 28v6M14 24h6M28 24h6" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/>
</svg>`;

writeFileSync(join(OUT, "default.svg"), DEFAULT_SVG, "utf8");
console.log("✓ default.svg (fallback)");

const results = [];
for (const logo of LOGOS) {
  const result = await downloadLogo(logo);
  results.push({ file: logo.file, ok: !!result, saved: result });
}

const failed = results.filter((r) => !r.ok);
console.log(`\nDownloaded ${results.length - failed.length}/${results.length} logos`);
if (failed.length) {
  console.log("Failed:", failed.map((f) => f.file).join(", "));
  process.exitCode = 1;
}
