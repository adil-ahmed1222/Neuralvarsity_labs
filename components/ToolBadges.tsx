import { cn } from "@/lib/cn";
import { BADGE_LABELS, BADGE_STYLES, type ToolBadge } from "@/types/tool";

interface ToolBadgesProps {
  badges?: ToolBadge[];
  className?: string;
  size?: "sm" | "md";
}

export function ToolBadges({ badges, className, size = "sm" }: ToolBadgesProps) {
  if (!badges?.length) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {badges.map((badge) => (
        <span
          key={badge}
          className={cn(
            "rounded-full border font-semibold uppercase tracking-wider",
            BADGE_STYLES[badge],
            size === "sm" ? "px-2 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]"
          )}
        >
          {BADGE_LABELS[badge]}
        </span>
      ))}
    </div>
  );
}
