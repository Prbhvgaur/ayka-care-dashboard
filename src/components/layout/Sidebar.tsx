"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { motion } from "framer-motion";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { DEMO_USER, NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useUiStore } from "@/store/uiStore";

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, isLoggingOut } = useAuth();
  const collapsed = useUiStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const currentUser = user ?? DEMO_USER;

  return (
    <motion.aside
      animate={{ width: collapsed ? 82 : 260 }}
      className="glass-panel hidden min-h-screen flex-col justify-between border-r px-4 py-5 lg:flex"
      transition={{ duration: 0.24, ease: "easeInOut" }}
    >
      <div className="space-y-7">
        <div className="flex items-center justify-between gap-3">
          <div className="overflow-hidden">
            <p className="font-display text-2xl font-semibold">AYKA Care</p>
            {!collapsed ? (
              <p className="text-sm text-[var(--text-secondary)]">Healthcare, Reimagined</p>
            ) : null}
          </div>
          <button
            aria-label="Toggle sidebar"
            className="rounded-full border p-2 transition hover:bg-[var(--bg-tertiary)]"
            onClick={toggleSidebar}
            type="button"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>
        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                className={cn(
                  "group flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold transition",
                  active
                    ? "bg-[var(--color-brand-light)] text-[var(--color-brand)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]",
                )}
                href={item.href}
                key={item.href}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full transition",
                    active ? "bg-[var(--color-brand)]" : "bg-transparent",
                  )}
                />
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed ? <span>{item.label}</span> : null}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="space-y-4">
        <div className="glass-panel flex items-center gap-3 rounded-[24px] p-3">
          <Avatar alt={currentUser.name} size={46} src={currentUser.avatar} />
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate font-semibold">{currentUser.name}</p>
              <p className="truncate text-sm text-[var(--text-secondary)]">{currentUser.role}</p>
            </div>
          ) : null}
        </div>
        <Button
          className={cn("w-full", collapsed && "px-0")}
          loading={isLoggingOut}
          onClick={() => void logout()}
          variant="secondary"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed ? "Logout" : null}
        </Button>
      </div>
    </motion.aside>
  );
}
