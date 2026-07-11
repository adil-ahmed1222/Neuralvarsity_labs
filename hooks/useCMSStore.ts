"use client";

import { create } from "zustand";

interface CMSStore {
  sidebarOpen: boolean;
  searchQuery: string;
  toggleSidebar: () => void;
  setSearchQuery: (q: string) => void;
}

export const useCMSStore = create<CMSStore>((set) => ({
  sidebarOpen: true,
  searchQuery: "",
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
