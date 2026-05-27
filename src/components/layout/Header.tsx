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
        <div className="flex flex-wrap items-center gap-3">
          <label className="glass-panel flex min-w-[240px] items-center gap-3 rounded-full px-4 py-3">
            <Search className="h-4 w-4 text-[var(--text-secondary)]" />
            <input
              aria-label="Global search"
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Search patients, users, tasks..."
              ref={inputRef}
            />
            <span className="hidden rounded-full bg-[var(--bg-tertiary)] px-2 py-1 text-xs text-[var(--text-secondary)] sm:inline-flex">
              Cmd K
            </span>
          </label>
          <button
            aria-label="Notifications"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border bg-[var(--bg-secondary)] transition hover:-translate-y-0.5"
            type="button"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-danger)] px-1 text-[10px] font-bold text-white">
              {notificationCount}
            </span>
          </button>
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
