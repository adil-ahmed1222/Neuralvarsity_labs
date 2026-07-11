import type { DeploymentStatus } from "@/types/project";

const DEPLOY_COLORS: Record<DeploymentStatus, string> = {
  Live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Staging: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  "Not Deployed": "bg-slate-500/15 text-slate-400 border-slate-500/30",
  Failed: "bg-red-500/15 text-red-400 border-red-500/30",
};

export function DeploymentBadge({ status }: { status: DeploymentStatus }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${DEPLOY_COLORS[status]}`}
    >
      {status}
    </span>
  );
}
