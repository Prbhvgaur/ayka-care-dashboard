"use client";

import axios from "axios";

import type { ApiError } from "@/types/api";

export const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.sessionStorage.getItem("ayka_auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError<ApiError>(error)) {
    return error.response?.data?.message ?? "Something went wrong.";
  }
  return "Something went wrong.";
}
