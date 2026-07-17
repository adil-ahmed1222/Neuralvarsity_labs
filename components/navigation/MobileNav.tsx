"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { NavLinkButton } from "./NavLinkButton";
import { SuggestToolButton } from "./SuggestToolButton";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  isLabsHome: boolean;
  onGoToSection: (hash: "tools" | "newest") => void;
}

export function MobileNav({
  isOpen,
  onClose,
  onGoToSection,
}: MobileNavProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={onClose}
          />

          <motion.aside
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={cn(
              "fixed right-0 top-0 z-[70] flex h-full w-[min(320px,88vw)] flex-col md:hidden",
              "border-l border-[rgba(255,180,0,0.15)] bg-[rgba(3,7,18,0.92)] backdrop-blur-2xl",
              "shadow-[-8px_0_40px_rgba(0,0,0,0.5),0_0_40px_rgba(255,180,0,0.06)]"
            )}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: "tween", duration: 0.25 }
            }
          >
            <div className="nav-gradient-bg pointer-events-none absolute inset-0 opacity-60" />

            <div className="relative flex items-center justify-between border-b border-[rgba(255,180,0,0.1)] px-5 py-4">
              <p className="text-sm font-semibold text-white">Menu</p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full border border-[rgba(255,180,0,0.2)] p-2 text-slate-300 outline-none transition-colors hover:border-[rgba(255,180,0,0.4)] hover:text-white focus-visible:ring-2 focus-visible:ring-[#FFB400]/50"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav className="relative flex flex-1 flex-col gap-3 px-5 py-6">
              <NavLinkButton
                href="/labs/categories/foundation-models"
                label="Categories"
                isActive={false}
                onClick={onClose}
                className="w-full justify-center"
              />
              <NavLinkButton
                href="/labs#tools"
                label="Popular"
                isActive={false}
                onClick={(event) => {
                  event.preventDefault();
                  onClose();
                  onGoToSection("tools");
                }}
                className="w-full justify-center"
              />
              <NavLinkButton
                href="/labs#newest"
                label="New"
                isActive={false}
                onClick={(event) => {
                  event.preventDefault();
                  onClose();
                  onGoToSection("newest");
                }}
                className="w-full justify-center"
              />
              <SuggestToolButton className="w-full justify-center" onClick={onClose} />
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="mobile-nav-drawer"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(255,180,0,0.2)] bg-[rgba(255,180,0,0.04)] outline-none transition-colors hover:border-[rgba(255,180,0,0.35)] focus-visible:ring-2 focus-visible:ring-[#FFB400]/50 md:hidden"
    >
      <span className="sr-only">Toggle menu</span>
      <span className="flex w-5 flex-col items-center justify-center gap-1.5" aria-hidden="true">
        <motion.span
          className="block h-0.5 w-5 rounded-full bg-[#FFB400]"
          animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-0.5 w-5 rounded-full bg-[#FFB400]"
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.15 }}
        />
        <motion.span
          className="block h-0.5 w-5 rounded-full bg-[#FFB400]"
          animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
      </span>
    </button>
  );
}
