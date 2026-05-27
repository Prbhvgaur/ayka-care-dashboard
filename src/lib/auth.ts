import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import {
  APP_URL,
  AUTH_COOKIE_NAME,
  CSRF_COOKIE_NAME,
  DEMO_PASSWORD_HASH,
  DEMO_USER,
} from "@/lib/constants";
import type { SessionPayload } from "@/types/auth";

const JWT_SECRET = process.env.JWT_SECRET ?? "ayka_care_super_secret_jwt_key_2026_production";

export async function verifyPassword(password: string) {
  return bcrypt.compare(password, DEMO_PASSWORD_HASH);
}

export function signSessionToken() {
  return jwt.sign(DEMO_USER, JWT_SECRET, {
    expiresIn: "7d",
    issuer: APP_URL,
  });
}

export function verifySessionToken(token: string) {
  return jwt.verify(token, JWT_SECRET, { issuer: APP_URL }) as SessionPayload;
}

export async function getSessionFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    return verifySessionToken(token);
  } catch {
    return null;
  }
}

export function withSecurityHeaders(response: NextResponse) {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  return response;
}

export function setAuthCookies(response: NextResponse, token: string) {
  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  response.cookies.set(CSRF_COOKIE_NAME, crypto.randomUUID(), {
    httpOnly: false,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  response.cookies.set(CSRF_COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export function getRequestIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "local"
  );
}

export function readBearerToken(request: NextRequest) {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7);
}

export function requireBearerAuth(request: NextRequest) {
  const token = readBearerToken(request);
  const cookieToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const activeToken = token ?? cookieToken;
  if (!activeToken) return null;

  try {
    return verifySessionToken(activeToken);
  } catch {
    return null;
  }
}
