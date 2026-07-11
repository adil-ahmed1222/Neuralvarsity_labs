import type { ProjectStatus } from "@/types/project";

const STATUS_COLORS: Record<ProjectStatus, string> = {
  Planning: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  Development: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Testing: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  Production: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Archived: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${STATUS_COLORS[status]}`}
    >
      {status}
    </span>
  );
}
