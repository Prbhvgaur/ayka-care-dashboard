import { format, formatDistanceToNowStrict, isPast } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeText(value: string) {
  return value.replace(/[<>]/g, "").trim();
}

export function sanitizeRecord<T extends Record<string, string | undefined>>(record: T): T {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      key,
      typeof value === "string" ? sanitizeText(value) : value,
    ]),
  ) as T;
}

export function formatShortDate(value: string) {
  return format(new Date(value), "dd MMM yyyy");
}

export function formatActivityDate(value: string) {
  return format(new Date(value), "MMM dd");
}

export function relativeTime(value: string) {
  return formatDistanceToNowStrict(new Date(value), { addSuffix: true });
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function statusTone(status: string) {
  switch (status) {
    case "active":
    case "done":
      return "success";
    case "pending":
    case "review":
      return "warning";
    case "critical":
    case "inactive":
      return "danger";
    default:
      return "neutral";
  }
}

export function priorityTone(priority: string) {
  switch (priority) {
    case "critical":
      return "danger";
    case "high":
      return "warning";
    case "medium":
      return "brand";
    default:
      return "neutral";
  }
}

export function titleFromPath(pathname: string) {
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  if (pathname.startsWith("/users")) return "Users";
  if (pathname.startsWith("/tasks")) return "Tasks";
  if (pathname.startsWith("/products")) return "Products";
  if (pathname.startsWith("/settings")) return "Settings";
  return "AYKA Care";
}

export function taskDueLabel(date: string) {
  return isPast(new Date(date))
    ? `Overdue since ${formatShortDate(date)}`
    : `Due ${formatShortDate(date)}`;
}
