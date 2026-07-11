import { motion } from "framer-motion";
import {
  Activity,
  GitBranch,
  Globe,
  Layers,
  RefreshCw,
} from "lucide-react";
import { formatRelativeDate } from "@/lib/utils";
import type { ProjectStats } from "@/types/project";

interface ProjectStatsProps {
  stats: ProjectStats;
}

const cards = [
  { key: "totalProjects", label: "Total Projects", icon: Layers },
  { key: "liveProjects", label: "Live Projects", icon: Globe },
  { key: "githubRepos", label: "GitHub Repositories", icon: GitBranch },
  { key: "deployments", label: "Deployments", icon: Activity },
] as const;

export function ProjectStats({ stats }: ProjectStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {cards.map(({ key, label, icon: Icon }, i) => (
        <motion.div
          key={key}
          initial={false}
          whileHover={{ y: -2 }}
          className="glass-card rounded-2xl p-5 transition-shadow hover:glow-amber"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <Icon className="h-4 w-4 text-[#FFB800]/70" />
          <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className="mt-1 text-2xl font-bold text-white">{stats[key]}</p>
        </motion.div>
      ))}

      <motion.div
        initial={false}
        whileHover={{ y: -2 }}
        className="glass-card col-span-2 rounded-2xl p-5 transition-shadow hover:glow-amber lg:col-span-1"
      >
        <RefreshCw className="h-4 w-4 text-[#FFB800]/70" />
        <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
          Latest Update
        </p>
        <p className="mt-1 text-sm font-semibold text-white">
          {stats.latestUpdate ? formatRelativeDate(stats.latestUpdate) : "—"}
        </p>
      </motion.div>
    </div>
  );
}
