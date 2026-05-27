"use client";

import { useEffect, useState } from "react";
import { 
  Search, 
  User, 
  Settings, 
  Plus, 
  FileText, 
  LayoutDashboard,
  LogOut,
  Moon,
  Sun
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const actions = [
    {
      id: "go-dashboard",
      label: "Go to Dashboard",
      icon: LayoutDashboard,
      shortcut: "G D",
      perform: () => router.push("/dashboard"),
    },
    {
      id: "go-users",
      label: "View Users",
      icon: User,
      shortcut: "G U",
      perform: () => router.push("/users"),
    },
    {
      id: "new-task",
      label: "Create New Task",
      icon: Plus,
      shortcut: "N",
      perform: () => {},
    },
    {
      id: "theme-dark",
      label: "Switch to Dark Mode",
      icon: Moon,
      perform: () => setTheme("dark"),
    },
    {
      id: "theme-light",
      label: "Switch to Light Mode",
      icon: Sun,
      perform: () => setTheme("light"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      shortcut: "S",
      perform: () => router.push("/settings"),
    },
    {
      id: "logout",
      label: "Logout",
      icon: LogOut,
      perform: () => {},
    },
  ];

  const filteredActions = actions.filter(action => 
    action.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200" />
        <Dialog.Content className="fixed left-1/2 top-[20%] z-50 w-full max-w-[560px] -translate-x-1/2 outline-none animate-in zoom-in-95 duration-200">
          <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] shadow-2xl">
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
              <Search className="h-5 w-5 text-[var(--text-muted)]" />
              <input
                autoFocus
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--text-muted)]"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="rounded border border-[var(--border)] bg-[var(--bg-tertiary)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                ESC
              </div>
            </div>

            <div className="max-h-[360px] overflow-y-auto p-2 scrollbar-thin">
              {filteredActions.length > 0 ? (
                <div className="space-y-1">
                  {filteredActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => {
                        action.perform();
                        setOpen(false);
                      }}
                      className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-[var(--bg-tertiary)]"
                    >
                      <action.icon className="h-4 w-4 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]" />
                      <span className="flex-1 font-medium text-[var(--text-primary)]">{action.label}</span>
                      {action.shortcut && (
                        <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]">
                          {action.shortcut}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-12 text-center">
                  <p className="text-sm text-[var(--text-muted)]">No results for &quot;{search}&quot;</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="rounded border border-[var(--border)] bg-[var(--bg-tertiary)] px-1 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                    ↑↓
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">Navigate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="rounded border border-[var(--border)] bg-[var(--bg-tertiary)] px-1 py-0.5 text-[10px] font-medium text-[var(--text-secondary)]">
                    ENTER
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">Select</span>
                </div>
              </div>
              <p className="text-[10px] text-[var(--text-muted)]">Ayka Command Center</p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
