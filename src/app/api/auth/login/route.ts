import { NextRequest, NextResponse } from "next/server";

import { DEMO_EMAIL, DEMO_USER } from "@/lib/constants";
import {
  getRequestIp,
  setAuthCookies,
  signSessionToken,
  verifyPassword,
  withSecurityHeaders,
} from "@/lib/auth";
import { sanitizeRecord } from "@/lib/utils";
import { loginSchema } from "@/lib/validations";

const attempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }

  if (entry.count >= 5) {
    return true;
  }

  attempts.set(ip, { ...entry, count: entry.count + 1 });
  return false;
}

export async function POST(request: NextRequest) {
  const ip = getRequestIp(request);
  if (isRateLimited(ip)) {
    return withSecurityHeaders(
      NextResponse.json(
        { message: "Too many login attempts. Please wait a minute." },
        { status: 429 },
      ),
    );
  }

  const body = await request.json();
  const sanitized = sanitizeRecord({
    email: body.email,
    password: body.password,
  });

  const parsed = loginSchema.safeParse({
    ...sanitized,
    rememberMe: Boolean(body.rememberMe),
  });

  if (!parsed.success) {
    return withSecurityHeaders(
      NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 }),
    );
  }

  const isEmailValid = parsed.data.email.toLowerCase() === DEMO_EMAIL;
  const isPasswordValid = await verifyPassword(parsed.data.password);

  if (!isEmailValid || !isPasswordValid) {
    return withSecurityHeaders(
      NextResponse.json({ message: "Invalid email or password." }, { status: 401 }),
    );
  }

  const token = signSessionToken();
  const response = NextResponse.json(
    { token, user: DEMO_USER },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );

  setAuthCookies(response, token);
  return withSecurityHeaders(response);
}
