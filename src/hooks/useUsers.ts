"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import type { PaginatedResponse } from "@/types/api";
import type { User } from "@/types/user";

export interface UsersParams {
  search?: string;
  role?: string;
  status?: string;
  department?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

export function useUsers(params: UsersParams) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<User>>("/users", { params });
      return response.data;
    },
    staleTime: 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
