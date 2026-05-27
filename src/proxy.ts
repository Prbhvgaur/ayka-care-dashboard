import { NextResponse, type NextRequest } from "next/server";

import { AUTH_COOKIE_NAME } from "@/lib/constants";

const protectedPaths = ["/dashboard", "/users", "/tasks", "/products", "/settings"];

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  const isLoginPath = pathname.startsWith("/login");

  if (isProtectedPath && !token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isLoginPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/users/:path*", "/tasks/:path*", "/products/:path*", "/settings/:path*"],
};
