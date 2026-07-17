"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { NavbarLogo } from "./navigation/NavbarLogo";
import { NavLinkButton } from "./navigation/NavLinkButton";
import { SuggestToolButton } from "./navigation/SuggestToolButton";
import { HamburgerButton, MobileNav } from "./navigation/MobileNav";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLabsHome = pathname === "/labs" || pathname === "/";
  const isCategories = pathname.startsWith("/labs/categories");

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  const goToLabsSection = (hash: "tools" | "newest") => {
    if (isLabsHome) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      if (hash === "tools") {
        window.dispatchEvent(new CustomEvent("labs:set-category", { detail: "All" }));
      }
      return;
    }
    router.push(`/labs#${hash}`);
  };

  return (
    <>
      <div className="sticky top-0 z-50 px-3 pt-3 sm:px-4 md:px-6">
        <motion.header
          role="banner"
          initial={prefersReducedMotion ? false : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.35, ease: "easeOut" }
          }
          className={cn(
            "relative mx-auto max-w-7xl overflow-hidden rounded-2xl border transition-[height,box-shadow,backdrop-filter] duration-300 ease-out",
            scrolled
              ? "h-[4.25rem] border-[rgba(255,180,0,0.22)] shadow-[0_8px_40px_rgba(0,0,0,0.55),0_0_30px_rgba(255,180,0,0.08)] backdrop-blur-3xl"
              : "h-20 border-[rgba(255,180,0,0.14)] shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(255,180,0,0.05)] backdrop-blur-xl"
          )}
          style={{
            background: scrolled
              ? "rgba(3, 7, 18, 0.88)"
              : "rgba(3, 7, 18, 0.72)",
          }}
        >
          <div
            aria-hidden="true"
            className="nav-gradient-bg pointer-events-none absolute inset-0 opacity-80"
          />

          <div className="relative flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
            <NavbarLogo />

            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-2 md:flex lg:gap-2.5"
            >
              <NavLinkButton
                href="/labs/categories/foundation-models"
                label="Categories"
                isActive={isCategories}
              />
              <NavLinkButton
                href="/labs#tools"
                label="Popular"
                isActive={false}
                onClick={(event) => {
                  event.preventDefault();
                  goToLabsSection("tools");
                }}
              />
              <NavLinkButton
                href="/labs#newest"
                label="New"
                isActive={false}
                onClick={(event) => {
                  event.preventDefault();
                  goToLabsSection("newest");
                }}
              />
              <SuggestToolButton />
            </nav>

            <div className="md:hidden">
              <HamburgerButton
                isOpen={mobileOpen}
                onClick={() => setMobileOpen((open) => !open)}
              />
            </div>
          </div>
        </motion.header>
      </div>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isLabsHome={isLabsHome}
        onGoToSection={goToLabsSection}
      />
    </>
  );
}
