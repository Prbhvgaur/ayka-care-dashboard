"use client";

import * as Toast from "@radix-ui/react-toast";

import { useUiStore } from "@/store/uiStore";

export function ToastViewport() {
  const toasts = useUiStore((state) => state.toasts);
  const dismissToast = useUiStore((state) => state.dismissToast);

  return (
    <Toast.Provider swipeDirection="right">
      {toasts.map((toast) => (
        <Toast.Root
          className="mb-3 w-[min(92vw,22rem)] rounded-[22px] border bg-[var(--bg-secondary)] p-4 shadow-xl"
          duration={3200}
          key={toast.id}
          onOpenChange={(open) => {
            if (!open) dismissToast(toast.id);
          }}
          open
        >
          <Toast.Title className="font-semibold text-[var(--text-primary)]">
            {toast.title}
          </Toast.Title>
          <Toast.Description className="mt-1 text-sm text-[var(--text-secondary)]">
            {toast.description}
          </Toast.Description>
        </Toast.Root>
      ))}
      <Toast.Viewport className="fixed bottom-4 right-4 z-[100] outline-none" />
    </Toast.Provider>
  );
}
