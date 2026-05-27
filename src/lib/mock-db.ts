import { subDays } from "date-fns";

import tasksJson from "@/data/tasks.json";
import usersJson from "@/data/users.json";
import type { StatsResponse } from "@/types/api";
import type { Task } from "@/types/task";
import type { User } from "@/types/user";

const users = usersJson as User[];
let tasks = tasksJson as Task[];

export function getUsers() {
  return users;
}

export function getTasks() {
  return tasks;
}

export function appendTask(task: Task) {
  tasks = [task, ...tasks];
  return task;
}

export function getUserById(id: string) {
  return users.find((user) => user.id === id);
}

export function buildStats(): StatsResponse {
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "done").length;
  const pendingTasks = tasks.filter((task) => task.status !== "done").length;
  const criticalTasks = tasks.filter((task) => task.priority === "critical").length;

  const usersByRole = users.reduce<Record<string, number>>((acc, user) => {
    acc[user.role] = (acc[user.role] ?? 0) + 1;
    return acc;
  }, {});

  const tasksByStatus = tasks.reduce<Record<string, number>>((acc, task) => {
    acc[task.status] = (acc[task.status] ?? 0) + 1;
    return acc;
  }, {});

  const activityData = Array.from({ length: 7 }, (_, index) => {
    const date = subDays(new Date("2026-05-27T09:00:00.000Z"), 6 - index);
    const isoDate = date.toISOString().slice(0, 10);
    return {
      date: isoDate,
      users: users.filter((user) => user.joinedAt.slice(0, 10) <= isoDate).length,
      tasks: tasks.filter((task) => task.createdAt.slice(0, 10) <= isoDate).length,
    };
  });

  const recentUsers = [...users]
    .sort((left, right) => right.joinedAt.localeCompare(left.joinedAt))
    .slice(0, 5);

  const highPriorityTasks = [...tasks]
    .filter((task) => task.priority === "high" || task.priority === "critical")
    .sort((left, right) => left.dueDate.localeCompare(right.dueDate))
    .slice(0, 5);

  return {
    totalUsers,
    activeUsers,
    totalTasks,
    completedTasks,
    pendingTasks,
    criticalTasks,
    usersByRole,
    tasksByStatus,
    activityData,
    recentUsers,
    highPriorityTasks,
  };
}
