"use client";

import { Bell, Github, RefreshCw, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCMSStore } from "@/hooks/useCMSStore";
import { useQueryClient } from "@tanstack/react-query";

export function TopNav() {
  const { searchQuery, setSearchQuery } = useCMSStore();
  const queryClient = useQueryClient();

  const handleSync = async () => {
    await fetch("/api/github", { method: "POST" });
    queryClient.invalidateQueries();
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-800/80 bg-[#030712]/80 px-6 backdrop-blur-xl">
      <div className="flex flex-1 items-center gap-4 max-w-xl">
        <Input
          icon
          placeholder="Search projects, languages, technologies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleSync}>
          <Github className="h-4 w-4" />
          <span className="hidden sm:inline">GitHub Sync</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 border border-amber-500/30">
          <User className="h-4 w-4 text-amber-400" />
        </div>
      </div>
    </header>
  );
}
