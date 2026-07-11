import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "success" | "warning" | "error" | "info" | "outline";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        variant === "default" && "border-amber-500/30 bg-amber-500/10 text-amber-400",
        variant === "success" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        variant === "warning" && "border-orange-500/30 bg-orange-500/10 text-orange-400",
        variant === "error" && "border-red-500/30 bg-red-500/10 text-red-400",
        variant === "info" && "border-blue-500/30 bg-blue-500/10 text-blue-400",
        variant === "outline" && "border-slate-700 bg-transparent text-slate-400",
        className
      )}
    >
      {children}
    </span>
  );
}
