import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  hover,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        hover && "transition-all duration-300 hover:border-amber-500/25 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6 pb-0", className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-sm font-semibold text-white", className)}>{children}</h3>;
}
