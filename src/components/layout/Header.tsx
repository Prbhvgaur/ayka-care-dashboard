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
    <header className="sticky top-0 z-20 border-b bg-[color-mix(in_srgb,var(--bg-primary)_80%,transparent)] px-4 py-4 backdrop-blur-xl sm:px-6">
      {offline ? (
        <div className="mb-3 rounded-full bg-[rgb(255_159_10_/0.16)] px-4 py-2 text-sm font-semibold text-[var(--color-warning)]">
          You&apos;re offline. Data will refresh when the network returns.
        </div>
      ) : null}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="eyebrow">{titleFromPath(pathname)}</p>
          <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
            {titleFromPath(pathname)}
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
            className="group flex h-9 w-full min-w-[240px] items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 text-sm text-[var(--text-muted)] transition-all hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-secondary)] sm:w-auto"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">Search or type a command...</span>
            <div className="flex items-center gap-1 opacity-60">
              <span className="text-[10px] uppercase font-bold">⌘</span>
              <span className="text-[10px] font-bold">K</span>
            </div>
          </button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Notifications"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-colors hover:bg-slate-50"
            type="button"
          >
            <Bell className="h-5 w-5 text-slate-600" />
            <AnimatePresence>
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={notificationCount}
                className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]"
              >
                {notificationCount}
              </motion.span>
            </AnimatePresence>
          </motion.button>
          <ThemeToggle />
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="glass-panel inline-flex items-center gap-3 rounded-full px-3 py-2 outline-none">
              <Avatar alt={currentUser.name} size={40} src={currentUser.avatar} />
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold">{currentUser.name}</p>
                <p className="text-xs text-[var(--text-secondary)]">{currentUser.role}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-[var(--text-secondary)]" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="glass-panel z-30 mt-2 min-w-56 rounded-[20px] p-2">
                {NOTIFICATION_ITEMS.map((item) => (
                  <DropdownMenu.Item
                    className="rounded-2xl px-3 py-2 text-sm text-[var(--text-secondary)] outline-none transition hover:bg-[var(--bg-tertiary)]"
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
