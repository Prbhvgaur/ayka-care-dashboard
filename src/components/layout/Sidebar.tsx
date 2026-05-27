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
      animate={{ width: collapsed ? 64 : 240 }}
      className="hidden min-h-screen flex-col justify-between border-r border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-5 lg:flex"
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-black text-white dark:bg-white dark:text-black">
                <span className="text-[10px] font-black tracking-tighter">AK</span>
              </div>
              <span className="text-xs font-bold tracking-tight">Ayka Care</span>
            </div>
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded bg-black text-white dark:bg-white dark:text-black mx-auto">
              <span className="text-[10px] font-black tracking-tighter">AK</span>
            </div>
          )}
        </div>
        
        <TooltipProvider delayDuration={0}>
          <nav className="space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Tooltip key={item.href} open={collapsed ? undefined : false}>
                  <TooltipTrigger asChild>
                    <Link
                      className={cn(
                        "group flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] font-medium transition-colors",
                        active
                          ? "bg-zinc-100 text-black dark:bg-zinc-800 dark:text-white"
                          : "text-zinc-500 hover:bg-zinc-50 hover:text-black dark:hover:bg-zinc-900 dark:hover:text-white",
                      )}
                      href={item.href}
                    >
                      <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-blue-500" : "text-zinc-400 group-hover:text-zinc-600")} />
                      {!collapsed ? <span className="truncate">{item.label}</span> : null}
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
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Health</span>
              <span className="text-[10px] font-bold tabular-nums">92%</span>
            </div>
            <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-black dark:bg-white w-[92%]" />
            </div>
          </div>
        )}
        
        <div className={cn("flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer", collapsed && "justify-center")}>
          <Avatar alt={currentUser.name} size={24} src={currentUser.avatar} className="border border-[var(--border)] grayscale" />
          {!collapsed ? (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-black dark:text-white">{currentUser.name}</p>
              <p className="truncate text-[9px] font-bold text-zinc-400 uppercase tracking-tight">{currentUser.role}</p>
            </div>
          ) : null}
        </div>
      </div>
    </motion.aside>
  );
}
