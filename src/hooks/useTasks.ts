"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { useUiStore } from "@/store/uiStore";
import type { PaginatedResponse } from "@/types/api";
import type { Task } from "@/types/task";

export interface TasksParams {
  search?: string;
  status?: string;
  priority?: string;
  category?: string;
  assignee?: string;
  page?: number;
  limit?: number;
}

export function useTasks(params: TasksParams) {
  const queryClient = useQueryClient();
  const pushToast = useUiStore((state) => state.pushToast);

  const query = useQuery({
    queryKey: ["tasks", params],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Task>>("/tasks", { params });
      return response.data;
    },
    staleTime: 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const createTask = useMutation({
    mutationFn: async (payload: Omit<Task, "id" | "createdAt">) => {
      const response = await api.post<Task>("/tasks", payload);
      return response.data;
    },
    onSuccess: async () => {
      pushToast({
        title: "Task created",
        description: "The care operations board has been updated.",
        tone: "success",
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      await queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: () => {
      pushToast({
        title: "Task could not be created",
        description: "Please review the task details and try again.",
        tone: "error",
      });
    },
  });

  return { ...query, createTask };
}
