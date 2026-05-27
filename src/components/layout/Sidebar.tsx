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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";

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
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          {!collapsed ? (
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black">
                <span className="text-xs font-black tracking-tighter">AK</span>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold leading-none tracking-tight">Ayka Care</p>
                <p className="text-[10px] font-medium text-[var(--text-muted)] mt-1">Enterprise Plan</p>
              </div>
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black ml-1.5">
              <span className="text-xs font-black tracking-tighter">AK</span>
            </div>
          )}
          <button
            aria-label="Toggle sidebar"
            className="rounded-md border border-[var(--border)] p-1.5 transition-colors hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
            onClick={toggleSidebar}
            type="button"
          >
            {collapsed ? <PanelLeftOpen className="h-3.5 w-3.5" /> : <PanelLeftClose className="h-3.5 w-3.5" />}
          </button>
        </div>
        <TooltipProvider delayDuration={0}>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Tooltip key={item.href} open={collapsed ? undefined : false}>
                  <TooltipTrigger asChild>
                    <Link
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                        active
                          ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/50 hover:text-[var(--text-primary)]",
                      )}
                      href={item.href}
                    >
                      {active && (
                        <motion.div
                          layoutId="active-nav-indicator"
                          className="absolute left-0 h-4 w-1 rounded-full bg-[var(--color-accent)]"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                        />
                      )}
                      <item.icon className={cn("h-4 w-4 shrink-0 transition-transform duration-200", active && "text-[var(--color-accent)]")} />
                      {!collapsed ? <span className="relative">{item.label}</span> : null}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={12}>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
        </TooltipProvider>
      </div>
      <div className="space-y-4">
        {!collapsed && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 shadow-sm">
            <p className="text-xs font-bold text-[var(--text-primary)]">System Health</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-wider">Storage</span>
                <span className="text-[10px] font-bold">84%</span>
              </div>
              <div className="h-1 w-full bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} className="h-full bg-[var(--color-accent)]" />
              </div>
            </div>
          </div>
        )}
        
        <div className={cn("flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-[var(--bg-tertiary)] cursor-pointer", collapsed && "justify-center")}>
          <Avatar alt={currentUser.name} size={collapsed ? 32 : 36} src={currentUser.avatar} className="border border-[var(--border)]" />
          {!collapsed ? (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-[var(--text-primary)]">{currentUser.name}</p>
              <p className="truncate text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-tight">{currentUser.role}</p>
            </div>
          ) : null}
        </div>
      </div>
    </motion.aside>
  );
}
