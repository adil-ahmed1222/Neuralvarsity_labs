import { CheckCircle2, Building2, Layers, Sparkles } from "lucide-react";
import { tools } from "@/data/tools";
import { getUniqueCompanies } from "@/lib/toolMeta";
import { CATEGORY_COUNT } from "@/types/tool";

export function StatsBar() {
  const stats = [
    { icon: Sparkles, value: `${tools.length}+`, label: "AI Tools" },
    { icon: Layers, value: `${CATEGORY_COUNT}`, label: "Categories" },
    { icon: Building2, value: `${getUniqueCompanies(tools)}`, label: "Companies" },
    { icon: CheckCircle2, value: "100%", label: "Verified Links" },
  ];

  return (
    <section className="px-6 pb-10 lg:px-8">
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="rounded-2xl border border-[rgba(255,184,0,0.12)] bg-[rgba(15,23,42,0.45)] px-4 py-5 text-center backdrop-blur-sm"
          >
            <Icon className="mx-auto h-4 w-4 text-[#FFB800]" />
            <p className="mt-2 text-2xl font-bold text-gradient">{value}</p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
