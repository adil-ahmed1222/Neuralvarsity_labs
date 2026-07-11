"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Cpu,
  FolderKanban,
  GitBranch,
  Hexagon,
  Layers,
  LayoutDashboard,
  Package,
  Rocket,
  Settings,
  Tags,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { SIDEBAR_NAV } from "@/lib/constants";

const icons: Record<string, LucideIcon> = {
  LayoutDashboard,
  FolderKanban,
  Rocket,
  GitBranch,
  BarChart3,
  Layers,
  Tags,
  Cpu,
  Package,
  BookOpen,
  Settings,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-800/80 bg-[#030712]/95 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 border-b border-slate-800/80 px-5">
        <Hexagon className="h-7 w-7 text-amber-400 fill-amber-400/10" />
        <div>
          <p className="text-sm font-bold text-white">NeuralVarsity</p>
          <p className="text-[10px] uppercase tracking-widest text-slate-500">CMS Portal</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {SIDEBAR_NAV.map((item) => {
          const Icon = icons[item.icon] ?? LayoutDashboard;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                active
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800/80 p-4">
        <Link
          href="/labs"
          className="flex items-center justify-center rounded-xl border border-slate-800 px-3 py-2 text-xs text-slate-400 hover:border-amber-500/30 hover:text-amber-400 transition-colors"
        >
          AI Tools Lab →
        </Link>
      </div>
    </aside>
  );
}
