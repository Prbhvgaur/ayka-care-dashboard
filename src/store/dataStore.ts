"use client";

import { create } from "zustand";

interface DataState {
  offline: boolean;
  setOffline: (offline: boolean) => void;
}

export const useDataStore = create<DataState>((set) => ({
  offline: false,
  setOffline: (offline) => set({ offline }),
}));
