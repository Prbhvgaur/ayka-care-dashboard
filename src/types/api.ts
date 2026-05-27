import type { Task } from "@/types/task";
import type { User } from "@/types/user";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface StatsResponse {
  totalUsers: number;
  activeUsers: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  criticalTasks: number;
  usersByRole: Record<string, number>;
  tasksByStatus: Record<string, number>;
  activityData: Array<{
    date: string;
    users: number;
    tasks: number;
  }>;
  recentUsers: User[];
  highPriorityTasks: Task[];
}

export interface ApiError {
  message: string;
}
