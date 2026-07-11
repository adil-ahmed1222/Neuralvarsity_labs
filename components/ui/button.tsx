import { cn } from "@/lib/cn";

export function Button({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "amber" | "danger";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all disabled:opacity-50",
        variant === "default" && "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700",
        variant === "outline" && "border border-slate-700 bg-transparent text-slate-300 hover:border-amber-500/40 hover:text-white",
        variant === "ghost" && "text-slate-400 hover:bg-slate-800/50 hover:text-white",
        variant === "amber" && "bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold hover:opacity-90 shadow-lg shadow-amber-500/20",
        variant === "danger" && "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
