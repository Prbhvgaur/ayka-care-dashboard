export type TaskPriority = "low" | "medium" | "high" | "critical";
export type TaskStatus = "todo" | "in-progress" | "review" | "done";
export type TaskCategory =
  | "Patient Care"
  | "Admin"
  | "Technical"
  | "Compliance"
  | "Reporting";

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
  category: TaskCategory;
  dueDate: string;
  createdAt: string;
  tags: string[];
}
