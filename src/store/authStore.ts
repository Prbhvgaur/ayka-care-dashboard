"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AuthUser } from "@/types/auth";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: { user: AuthUser; token: string }) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
      login: ({ user, token }) => {
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem("ayka_auth_token", token);
        }
        set({ user, token, isAuthenticated: true, isLoading: false });
      },
      logout: () => {
        if (typeof window !== "undefined") {
          window.sessionStorage.removeItem("ayka_auth_token");
        }
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
      },
      checkAuth: () => {
        const token =
          typeof window !== "undefined"
            ? window.sessionStorage.getItem("ayka_auth_token")
            : null;
        const state = get();
        set({
          token,
          isAuthenticated: Boolean(token && state.user),
          isLoading: false,
        });
      },
    }),
    {
      name: "ayka-auth",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
);
