import { NextResponse } from "next/server";
import { clearGitHubCache, fetchUserRepositories } from "@/lib/github";

export async function GET() {
  try {
    const repos = await fetchUserRepositories();
    return NextResponse.json({ repos, count: repos.length });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "GitHub API failed" },
      { status }
    );
  }
}

export async function POST() {
  clearGitHubCache();
  try {
    const repos = await fetchUserRepositories();
    return NextResponse.json({ synced: true, count: repos.length });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sync failed" },
      { status: 500 }
    );
  }
}
