"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { api, getApiErrorMessage } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useUiStore } from "@/store/uiStore";
import type { LoginPayload, LoginResponse } from "@/types/auth";

export function useAuth() {
  const router = useRouter();
  const auth = useAuthStore();
  const pushToast = useUiStore((state) => state.pushToast);

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await api.post<LoginResponse>("/auth/login", payload);
      return response.data;
    },
    onSuccess: (data) => {
      auth.login(data);
      pushToast({
        title: "Welcome back",
        description: "You are now signed in to AYKA Care.",
        tone: "success",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      pushToast({
        title: "Login failed",
        description: getApiErrorMessage(error),
        tone: "error",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      auth.logout();
      router.push("/login");
    },
  });

  return {
    ...auth,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  };
}
