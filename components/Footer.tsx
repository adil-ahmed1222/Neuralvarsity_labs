import Image from "next/image";
import Link from "next/link";
import {
  CATEGORY_SHORT_LABELS,
  CATEGORY_SLUGS,
  FILTER_CATEGORIES,
  type ToolCategory,
} from "@/types/tool";

const BRAND_LOGO = "/brand/neuralvarsity-logo.png";

const CATEGORIES = FILTER_CATEGORIES.filter((c): c is ToolCategory => c !== "All");

const RESOURCES = [
  { label: "Suggest Tool", href: "/labs/suggest" },
  { label: "GitHub", href: "https://github.com/adil-ahmed1222/Neuralvarsity_labs", external: true },
  { label: "Privacy", href: "/labs#tools" },
  { label: "About", href: "https://neuralvarsity.ai", external: true },
  { label: "Newsletter", href: "/labs/suggest" },
];

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[rgba(255,184,0,0.08)] px-6 py-14 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <Image
              src={BRAND_LOGO}
              alt="NeuralVarsity Logo"
              width={28}
              height={28}
              className="h-7 w-7 object-contain opacity-90"
            />
            <span className="text-sm font-semibold text-white">NeuralVarsity Labs</span>
          </div>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-slate-500">
            Your curated AI tools lab for students — learn, launch, and build.
          </p>
          <p className="mt-4 text-xs text-slate-600">© NeuralVarsity Labs 2026</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFB800]">
            Categories
          </p>
          <ul className="mt-4 space-y-2">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/labs/categories/${CATEGORY_SLUGS[cat]}`}
                  className="text-sm text-slate-400 transition-colors hover:text-[#FFB800]"
                >
                  {CATEGORY_SHORT_LABELS[cat]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFB800]">
            Resources
          </p>
          <ul className="mt-4 space-y-2">
            {RESOURCES.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 transition-colors hover:text-[#FFB800]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-[#FFB800]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFB800]">
            Labs
          </p>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            labs.neuralvarsity.ai — AI Tools Lab for students
          </p>
          <Link
            href="/labs/suggest"
            className="mt-4 inline-flex rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FFB800] px-4 py-2 text-xs font-semibold text-[#030712]"
          >
            Suggest a Tool
          </Link>
        </div>
      </div>
    </footer>
  );
}
