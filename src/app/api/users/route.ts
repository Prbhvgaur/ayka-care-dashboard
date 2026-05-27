import { NextRequest, NextResponse } from "next/server";

import { requireBearerAuth, withSecurityHeaders } from "@/lib/auth";
import { getUsers } from "@/lib/mock-db";
import { sanitizeText } from "@/lib/utils";
import { userQuerySchema } from "@/lib/validations";
import type { User } from "@/types/user";

export async function GET(request: NextRequest) {
  if (!requireBearerAuth(request)) {
    return withSecurityHeaders(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  const query = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsed = userQuerySchema.safeParse(query);

  if (!parsed.success) {
    return withSecurityHeaders(
      NextResponse.json({ message: "Invalid query parameters." }, { status: 400 }),
    );
  }

  const { search, role, status, department, page, limit, sortBy, order } = parsed.data;

  let users = getUsers();
  if (search) {
    const keyword = sanitizeText(search).toLowerCase();
    users = users.filter((user) =>
      [user.name, user.email, user.department].some((value) =>
        value.toLowerCase().includes(keyword),
      ),
    );
  }

  if (role) users = users.filter((user) => user.role === role);
  if (status) users = users.filter((user) => user.status === status);
  if (department) users = users.filter((user) => user.department === department);

  const sortableKeys = new Set<keyof User>([
    "name",
    "email",
    "role",
    "department",
    "status",
    "joinedAt",
    "lastActive",
  ]);
  const sortKey = sortableKeys.has(sortBy as keyof User)
    ? (sortBy as keyof User)
    : "joinedAt";

  users = [...users].sort((left, right) => {
    const leftValue = String(left[sortKey]);
    const rightValue = String(right[sortKey]);
    return order === "asc"
      ? leftValue.localeCompare(rightValue)
      : rightValue.localeCompare(leftValue);
  });

  const total = users.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const data = users.slice(start, start + limit);

  return withSecurityHeaders(
    NextResponse.json(
      { data, total, page, totalPages },
      {
        status: 200,
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
        },
      },
    ),
  );
}
