import { NextResponse } from "next/server";
import { searchProjects } from "@/services/github.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  try {
    const results = await searchProjects(q);
    return NextResponse.json({ results, total: results.length, query: q });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Search failed" },
      { status: 500 }
    );
  }
}
