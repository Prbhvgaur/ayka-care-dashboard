import {
  CheckSquare,
  LayoutDashboard,
  Package2,
  Settings,
  Users,
} from "lucide-react";

import type { AuthUser } from "@/types/auth";
import type { TaskCategory, TaskPriority, TaskStatus } from "@/types/task";
import type { UserDepartment, UserRole, UserStatus } from "@/types/user";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "AYKA Care Dashboard";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
export const AUTH_COOKIE_NAME = "ayka_session";
export const CSRF_COOKIE_NAME = "ayka_csrf";
export const DEMO_PASSWORD_HASH =
  "$2b$10$45YWeUvpCIST9eac62M8aO9gHcxOXbY7gUtWE49.cMpoC5AQxkk3a";
export const DEMO_EMAIL = "admin@aykacare.in";
export const DEMO_PASSWORD = "Admin@123";

export const DEMO_USER: AuthUser = {
  id: "ayka-admin-001",
  name: "Aarohi Gaur",
  email: DEMO_EMAIL,
  role: "Admin",
  department: "Operations",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AYKA%20Admin",
};

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/users", icon: Users },
  { label: "Tasks", href: "/tasks", icon: CheckSquare },
  { label: "Products", href: "/products", icon: Package2 },
  { label: "Settings", href: "/settings", icon: Settings },
] as const;

export const NOTIFICATION_ITEMS = [
  "2 compliance reviews need approval",
  "3 critical tasks are due today",
  "Doctor onboarding packet updated",
  "Weekly care ops summary is ready",
] as const;

export const USER_ROLES: UserRole[] = [
  "Admin",
  "Doctor",
  "Nurse",
  "Patient",
  "Support",
];
export const USER_STATUSES: UserStatus[] = ["active", "inactive", "pending"];
export const USER_DEPARTMENTS: UserDepartment[] = [
  "Cardiology",
  "Neurology",
  "General",
  "Emergency",
  "Admin",
];
export const TASK_PRIORITIES: TaskPriority[] = [
  "low",
  "medium",
  "high",
  "critical",
];
export const TASK_STATUSES: TaskStatus[] = [
  "todo",
  "in-progress",
  "review",
  "done",
];
export const TASK_CATEGORIES: TaskCategory[] = [
  "Patient Care",
  "Admin",
  "Technical",
  "Compliance",
  "Reporting",
];

export const THEME_OPTIONS = ["light", "dark", "system"] as const;
export const ACCENT_OPTIONS = [
  "#0A84FF",
  "#14B8A6",
  "#F97316",
  "#EF4444",
  "#8B5CF6",
  "#22C55E",
] as const;
export const DENSITY_OPTIONS = ["compact", "default", "comfortable"] as const;
