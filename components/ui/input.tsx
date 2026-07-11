import { cn } from "@/lib/cn";
import { Search } from "lucide-react";

export function Input({
  className,
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon?: boolean }) {
  return (
    <div className="relative">
      {icon && <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />}
      <input
        className={cn(
          "w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2.5 text-sm text-white placeholder:text-slate-500",
          "focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20",
          icon && "pl-9",
          className
        )}
        {...props}
      />
    </div>
  );
}
