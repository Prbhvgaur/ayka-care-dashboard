import { NextRequest, NextResponse } from "next/server";

import { requireBearerAuth, withSecurityHeaders } from "@/lib/auth";
import { buildStats } from "@/lib/mock-db";

export async function GET(request: NextRequest) {
  if (!requireBearerAuth(request)) {
    return withSecurityHeaders(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  return withSecurityHeaders(
    NextResponse.json(buildStats(), {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
      },
    }),
  );
}
