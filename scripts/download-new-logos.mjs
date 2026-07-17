import { writeFileSync, readFileSync, existsSync, unlinkSync } from "fs";
import { join } from "path";

const OUT = join(process.cwd(), "public", "logos");

// 1. Recolor monochrome currentColor brand marks to white for dark theme visibility
for (const f of ["notebooklm.svg", "runway.svg", "v0.svg"]) {
  const p = join(OUT, f);
  if (!existsSync(p)) continue;
  const svg = readFileSync(p, "utf8").replace(/currentColor/g, "#ffffff");
  writeFileSync(p, svg, "utf8");
  console.log(`recolored ${f}`);
}

async function fetchBuf(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 NeuralVarsity-Labs" },
    redirect: "follow",
  });
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}

// 2. Figma official color SVG
const figma = await fetchBuf("https://www.developersdigest.tech/icons/lobehub/figma-color.svg");
if (figma && figma.toString("utf8").includes("<svg")) {
  writeFileSync(join(OUT, "figma.svg"), figma.toString("utf8").trim(), "utf8");
  console.log("OK figma.svg (color)");
}

// 3. Colored official favicons (remove stale monochrome svg where switching to png)
const FAVICONS = [
  { base: "canva", domain: "canva.com", dropSvg: true },
  { base: "gamma", domain: "gamma.app" },
  { base: "leonardo", domain: "leonardo.ai" },
  { base: "langflow", domain: "langflow.org" },
];

for (const { base, domain, dropSvg } of FAVICONS) {
  const buf = await fetchBuf(`https://www.google.com/s2/favicons?domain=${domain}&sz=256`);
  if (buf && buf.length > 100) {
    writeFileSync(join(OUT, `${base}.png`), buf);
    console.log(`OK ${base}.png (${buf.length}b)`);
    if (dropSvg && existsSync(join(OUT, `${base}.svg`))) {
      unlinkSync(join(OUT, `${base}.svg`));
      console.log(`removed ${base}.svg`);
    }
  } else {
    console.error(`FAIL ${base}`);
  }
}

console.log("done");
