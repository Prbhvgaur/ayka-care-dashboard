import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { requireBearerAuth, withSecurityHeaders } from "@/lib/auth";
import { appendTask, getTasks } from "@/lib/mock-db";
import { sanitizeText } from "@/lib/utils";
import { taskQuerySchema, taskSchema } from "@/lib/validations";
import type { Task } from "@/types/task";

export async function GET(request: NextRequest) {
  if (!requireBearerAuth(request)) {
    return withSecurityHeaders(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  const query = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsed = taskQuerySchema.safeParse(query);

  if (!parsed.success) {
    return withSecurityHeaders(
      NextResponse.json({ message: "Invalid query parameters." }, { status: 400 }),
    );
  }

  const { search, status, priority, category, assignee, page, limit } = parsed.data;
  let tasks = getTasks();

  if (search) {
    const keyword = sanitizeText(search).toLowerCase();
    tasks = tasks.filter((task) =>
      [task.title, task.description, task.category, ...task.tags].some((value) =>
        value.toLowerCase().includes(keyword),
      ),
    );
  }

  if (status) tasks = tasks.filter((task) => task.status === status);
  if (priority) tasks = tasks.filter((task) => task.priority === priority);
  if (category) tasks = tasks.filter((task) => task.category === category);
  if (assignee) tasks = tasks.filter((task) => task.assignee === assignee);

  tasks = [...tasks].sort((left, right) => left.dueDate.localeCompare(right.dueDate));

  const total = tasks.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const data = tasks.slice(start, start + limit);

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

export async function POST(request: NextRequest) {
  if (!requireBearerAuth(request)) {
    return withSecurityHeaders(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  const body = await request.json();
  const parsed = taskSchema.safeParse({
    ...body,
    title: sanitizeText(body.title ?? ""),
    description: sanitizeText(body.description ?? ""),
    tags: Array.isArray(body.tags)
      ? body.tags.map((tag: string) => sanitizeText(tag)).filter(Boolean)
      : [],
  });

  if (!parsed.success) {
    return withSecurityHeaders(
      NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Invalid task." }, { status: 400 }),
    );
  }

  const task: Task = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...parsed.data,
  };

  appendTask(task);

  return withSecurityHeaders(
    NextResponse.json(task, {
      status: 201,
      headers: {
        "Cache-Control": "no-store",
      },
    }),
  );
}
