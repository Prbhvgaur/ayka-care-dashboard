"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ToastTone = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  title: string;
  description: string;
  tone: ToastTone;
}

interface UiState {
  isSidebarCollapsed: boolean;
  accentColor: string;
  density: "compact" | "default" | "comfortable";
  sidebarPosition: "left" | "right";
  notificationCount: number;
  toasts: ToastItem[];
  toggleSidebar: () => void;
  setAccentColor: (color: string) => void;
  setDensity: (density: UiState["density"]) => void;
  setSidebarPosition: (position: UiState["sidebarPosition"]) => void;
  pushToast: (toast: Omit<ToastItem, "id">) => void;
  dismissToast: (id: string) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      isSidebarCollapsed: false,
      accentColor: "#0A84FF",
      density: "default",
      sidebarPosition: "left",
      notificationCount: 4,
      toasts: [],
      toggleSidebar: () =>
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
      setAccentColor: (accentColor) => set({ accentColor }),
      setDensity: (density) => set({ density }),
      setSidebarPosition: (sidebarPosition) => set({ sidebarPosition }),
      pushToast: (toast) =>
        set((state) => ({
          toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
        })),
      dismissToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
    }),
    {
      name: "ayka-ui",
      partialize: (state) => ({
        isSidebarCollapsed: state.isSidebarCollapsed,
        accentColor: state.accentColor,
        density: state.density,
        sidebarPosition: state.sidebarPosition,
      }),
    },
  ),
);
