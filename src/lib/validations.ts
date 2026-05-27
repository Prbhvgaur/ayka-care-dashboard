import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid work email."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(64, "Password is too long."),
  rememberMe: z.boolean().optional(),
});

export const taskSchema = z.object({
  title: z.string().min(3, "Title is required.").max(120, "Title is too long."),
  description: z
    .string()
    .min(10, "Description should be more descriptive.")
    .max(240, "Description is too long."),
  priority: z.enum(["low", "medium", "high", "critical"]),
  status: z.enum(["todo", "in-progress", "review", "done"]),
  category: z.enum([
    "Patient Care",
    "Admin",
    "Technical",
    "Compliance",
    "Reporting",
  ]),
  assignee: z.string().uuid("Select a valid assignee."),
  dueDate: z.string().min(1, "Due date is required."),
  tags: z.array(z.string()).min(1, "Add at least one tag."),
});

export const userQuerySchema = z.object({
  search: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  department: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
  sortBy: z.string().default("joinedAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});

export const taskQuerySchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  priority: z.string().optional(),
  category: z.string().optional(),
  assignee: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(12),
});

export const profileSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.email("Enter a valid email."),
  phone: z.string().min(10, "Phone number is required."),
  department: z.string().min(2, "Department is required."),
});
