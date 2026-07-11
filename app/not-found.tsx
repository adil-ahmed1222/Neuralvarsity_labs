import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030712] p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-amber-400">404</h1>
        <p className="mt-4 text-slate-400">Page not found</p>
        <Link href="/dashboard" className="mt-6 inline-block">
          <Button variant="amber">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
