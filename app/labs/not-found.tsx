import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function LabsNotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[60vh] items-center justify-center px-6 py-20">
        <div className="glass-card max-w-md rounded-2xl p-10 text-center">
          <h1 className="text-5xl font-bold text-[#FFB800]">404</h1>
          <p className="mt-4 text-lg font-semibold text-white">Tool not found</p>
          <p className="mt-2 text-sm text-slate-400">
            This AI tool doesn&apos;t exist or may have been moved.
          </p>
          <Link
            href="/labs#tools"
            className="mt-6 inline-block rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#FFB800] px-6 py-2.5 text-sm font-semibold text-[#030712] transition-opacity hover:opacity-90"
          >
            Browse All Tools
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
