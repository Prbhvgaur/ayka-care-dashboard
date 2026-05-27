import { NextResponse } from "next/server";

import { clearAuthCookies, withSecurityHeaders } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json(
    { success: true },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
  clearAuthCookies(response);
  return withSecurityHeaders(response);
}
