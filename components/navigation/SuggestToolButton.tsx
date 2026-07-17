"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { SUGGEST_TOOL_PATH } from "@/lib/constants";

interface SuggestToolButtonProps {
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export function SuggestToolButton({ className, onClick }: SuggestToolButtonProps) {
  return (
    <Link
      href={SUGGEST_TOOL_PATH}
      onClick={onClick}
      prefetch
      aria-label="Suggest a new AI tool"
      className={cn(
        "inline-flex cursor-pointer items-center rounded-full px-5 py-2.5 text-sm font-semibold text-[#030712] outline-none",
        "nav-cta-gradient focus-visible:ring-2 focus-visible:ring-[#FFB400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]",
        "transition-opacity hover:opacity-90",
        className
      )}
    >
      Suggest Tool
    </Link>
  );
}
