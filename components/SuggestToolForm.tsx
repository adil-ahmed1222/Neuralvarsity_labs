"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { SUGGEST_TOOL_EMAIL } from "@/lib/constants";

export function SuggestToolForm() {
  const [toolName, setToolName] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = [
      `Tool Name: ${toolName}`,
      `Website: ${website}`,
      category ? `Category: ${category}` : "",
      notes ? `Notes: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${SUGGEST_TOOL_EMAIL}?subject=${encodeURIComponent("Tool Suggestion")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="tool-name" className="mb-1.5 block text-sm font-medium text-slate-300">
          Tool name
        </label>
        <input
          id="tool-name"
          type="text"
          required
          value={toolName}
          onChange={(e) => setToolName(e.target.value)}
          placeholder="e.g. Cursor"
          className="w-full rounded-xl border border-[rgba(255,184,0,0.15)] bg-[#0F172A]/80 px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[rgba(255,184,0,0.4)]"
        />
      </div>

      <div>
        <label htmlFor="tool-website" className="mb-1.5 block text-sm font-medium text-slate-300">
          Website URL
        </label>
        <input
          id="tool-website"
          type="url"
          required
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://"
          className="w-full rounded-xl border border-[rgba(255,184,0,0.15)] bg-[#0F172A]/80 px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[rgba(255,184,0,0.4)]"
        />
      </div>

      <div>
        <label htmlFor="tool-category" className="mb-1.5 block text-sm font-medium text-slate-300">
          Category
        </label>
        <input
          id="tool-category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Coding Assistants"
          className="w-full rounded-xl border border-[rgba(255,184,0,0.15)] bg-[#0F172A]/80 px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[rgba(255,184,0,0.4)]"
        />
      </div>

      <div>
        <label htmlFor="tool-notes" className="mb-1.5 block text-sm font-medium text-slate-300">
          Why should we add it?
        </label>
        <textarea
          id="tool-notes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tell us what makes this tool useful for students..."
          className="w-full resize-none rounded-xl border border-[rgba(255,184,0,0.15)] bg-[#0F172A]/80 px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[rgba(255,184,0,0.4)]"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FFB800] px-6 py-3 text-sm font-semibold text-[#030712] transition-opacity hover:opacity-90"
      >
        Send Suggestion
      </button>

      <p className="text-center text-xs text-slate-500">
        Or email{" "}
        <a
          href={`mailto:${SUGGEST_TOOL_EMAIL}?subject=${encodeURIComponent("Tool Suggestion")}`}
          className="text-[#FFB800] hover:underline"
        >
          {SUGGEST_TOOL_EMAIL}
        </a>{" "}
        directly.{" "}
        <Link href="/labs#tools" className="text-[#FFB800] hover:underline">
          Back to tools
        </Link>
      </p>
    </form>
  );
}
