"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

interface NavLinkButtonProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  delay?: number;
  activeLayoutId?: string;
}

export function NavLinkButton({
  href,
  label,
  isActive,
  onClick,
  className,
}: NavLinkButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      prefetch
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative inline-flex cursor-pointer items-center rounded-full border px-5 py-2.5 text-sm font-medium outline-none transition-colors duration-200",
        "focus-visible:ring-2 focus-visible:ring-[#FFB400]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        isActive
          ? "border-[rgba(255,180,0,0.45)] bg-[rgba(255,180,0,0.12)] text-white"
          : "border-[rgba(255,180,0,0.2)] text-slate-300 hover:border-[rgba(255,180,0,0.4)] hover:text-white",
        className
      )}
    >
      {label}
      {isActive && (
        <span
          aria-hidden
          className="absolute bottom-1.5 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#FFB400] to-transparent"
        />
      )}
    </Link>
  );
}
