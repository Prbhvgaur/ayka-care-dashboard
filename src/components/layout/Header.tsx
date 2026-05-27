"use client";

import { useEffect, useRef } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Bell, ChevronDown, Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { Avatar } from "@/components/ui/Avatar";
import { DEMO_USER, NOTIFICATION_ITEMS } from "@/lib/constants";
import { titleFromPath } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useDataStore } from "@/store/dataStore";
import { useUiStore } from "@/store/uiStore";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const notificationCount = useUiStore((state) => state.notificationCount);
  const offline = useDataStore((state) => state.offline);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentUser = user ?? DEMO_USER;

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 backdrop-blur-xl sm:px-6">
      {offline ? (
        <div className="mb-3 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-3 py-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          Network failure detected. System operating in degraded mode.
        </div>
      ) : null}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            {titleFromPath(pathname)}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
            className="flex h-8 w-full min-w-[200px] items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--bg-secondary)] px-2.5 text-xs text-zinc-400 font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 sm:w-auto"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="flex-1 text-left">Find or run...</span>
            <div className="flex items-center gap-0.5 opacity-40">
              <span className="text-[10px] font-black underline uppercase">K</span>
            </div>
          </button>
          
          <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />

          <button
            aria-label="Notifications"
            className="relative flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            type="button"
          >
            <Bell className="h-3.5 w-3.5 text-zinc-500" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-black text-[8px] font-black text-white dark:bg-white dark:text-black">
                {notificationCount}
              </span>
            )}
          </button>
          
          <ThemeToggle />

          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex items-center gap-2 rounded-md border border-[var(--border)] px-2 py-1 outline-none hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              <Avatar alt={currentUser.name} size={20} src={currentUser.avatar} className="grayscale" />
              <ChevronDown className="h-3 w-3 text-zinc-400" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="z-30 mt-1 min-w-[180px] rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] p-1 shadow-lg">
                {NOTIFICATION_ITEMS.map((item) => (
                  <DropdownMenu.Item
                    className="rounded-md px-2 py-1.5 text-xs font-medium text-zinc-500 outline-none transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white"
                    key={item}
                  >
                    {item}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  );
}
