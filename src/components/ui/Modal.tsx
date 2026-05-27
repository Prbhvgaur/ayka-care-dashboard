"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export function Modal({
  title,
  description,
  open,
  onOpenChange,
  children,
}: {
  title: string;
  description: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[min(92vw,38rem)] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border bg-[var(--bg-secondary)] p-6 shadow-2xl outline-none",
          )}
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Dialog.Title className="font-display text-2xl font-semibold">
                {title}
              </Dialog.Title>
              <Dialog.Description className="text-sm text-[var(--text-secondary)]">
                {description}
              </Dialog.Description>
            </div>
            <Dialog.Close className="rounded-full p-2 transition hover:bg-[var(--bg-tertiary)]">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
