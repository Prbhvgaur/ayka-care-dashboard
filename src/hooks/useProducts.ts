"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import type { PaginatedResponse } from "@/types/api";
import type { Product } from "@/types/product";

export interface ProductsParams {
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export function useProducts(params: ProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Product>>("/products", { params });
      return response.data;
    },
    staleTime: 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
