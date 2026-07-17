"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { PopularCategories } from "@/components/PopularCategories";
import { ToolGrid } from "@/components/ToolGrid";
import { Footer } from "@/components/Footer";

export function PageContent() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <PopularCategories />
      <ToolGrid />
      <Footer />
    </>
  );
}
