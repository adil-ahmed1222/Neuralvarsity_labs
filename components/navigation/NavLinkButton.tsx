"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Magnetic } from "./Magnetic";

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
  delay = 0,
  activeLayoutId = "nav-active-underline",
}: NavLinkButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Magnetic strength={0.15}>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.div
          whileHover={
            prefersReducedMotion ? undefined : { y: -2 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Link
          href={href}
          onClick={onClick}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "group relative inline-flex cursor-pointer items-center overflow-hidden rounded-full border px-5 py-2.5 text-sm font-medium outline-none transition-colors duration-300",
            "focus-visible:ring-2 focus-visible:ring-[#FFB400]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
            isActive
              ? "border-[rgba(255,180,0,0.45)] bg-[rgba(255,180,0,0.12)] text-white shadow-[0_0_20px_rgba(255,180,0,0.15)]"
              : "border-[rgba(255,180,0,0.2)] text-slate-300 hover:border-[rgba(255,180,0,0.4)] hover:text-white",
            className
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-0 rounded-full bg-gradient-to-r from-[rgba(255,180,0,0.08)] to-[rgba(245,158,11,0.04)] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
              isActive && "opacity-100"
            )}
          />

          <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-px">
            {label}
          </span>

          {isActive && (
            <motion.span
              layoutId={activeLayoutId}
              className="absolute bottom-1.5 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-[#FFB400] to-transparent"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_4px_20px_rgba(255,180,0,0.2)] transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_6px_24px_rgba(255,180,0,0.25)]"
          />
        </Link>
        </motion.div>
      </motion.div>
    </Magnetic>
  );
}
