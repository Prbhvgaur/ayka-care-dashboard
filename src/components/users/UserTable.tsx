"use client";

import { memo, useMemo, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { cn, formatShortDate } from "@/lib/utils";
import type { User } from "@/types/user";
import { motion, AnimatePresence } from "framer-motion";

interface UserTableProps {
  users: User[];
  sortBy: string;
  order: "asc" | "desc";
  onSort: (key: string) => void;
}

export const UserTable = memo(function UserTable({
  users,
  sortBy,
  order,
  onSort,
}: UserTableProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const shouldVirtualize = users.length > 100;
  const rowHeight = 72;
  const startIndex = shouldVirtualize ? Math.max(0, Math.floor(scrollTop / rowHeight) - 3) : 0;
  const visibleRows = useMemo(
    () => (shouldVirtualize ? users.slice(startIndex, startIndex + 14) : users),
    [shouldVirtualize, startIndex, users],
  );

  const columns = [
    ["name", "Name"],
    ["email", "Email"],
    ["role", "Role"],
    ["department", "Department"],
    ["status", "Status"],
    ["joinedAt", "Joined"],
  ] as const;

  return (
    <div
      className="scrollbar-thin overflow-auto rounded-3xl border border-slate-200/60 bg-white/50 backdrop-blur-md shadow-sm"
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      style={{ maxHeight: 620 }}
    >
      <table className="min-w-full border-separate border-spacing-0">
        <thead className="sticky top-0 z-10">
          <tr className="bg-slate-50/80 backdrop-blur-xl">
            {columns.map(([key, label]) => (
              <th className="border-b border-slate-200 px-6 py-5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500" key={key}>
                <button
                  className="inline-flex items-center gap-2 group transition-colors hover:text-blue-600"
                  onClick={() => onSort(key)}
                  type="button"
                >
                  {label}
                  <div className="relative">
                    <ArrowUpDown
                      className={cn(
                        "h-3.5 w-3.5 transition-all duration-300",
                        sortBy === key ? "text-blue-600 scale-110" : "text-slate-300 opacity-50 group-hover:opacity-100",
                      )}
                    />
                    {sortBy === key && (
                      <motion.span 
                        layoutId="active-sort"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      />
                    )}
                  </div>
                </button>
              </th>
            ))}
            <th className="border-b border-slate-200 px-6 py-5 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <AnimatePresence mode="popLayout">
            {visibleRows.map((user, index) => (
              <motion.tr
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className={cn(
                  "group transition-all duration-200 hover:bg-blue-50/50 hover:shadow-[inset_4px_0_0_0_rgb(37,99,235)]",
                )}
                key={user.id}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <Avatar alt={user.name} src={user.avatar} className="ring-2 ring-transparent group-hover:ring-blue-100 transition-all" />
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 leading-none">{user.name}</span>
                      <span className="text-[11px] text-slate-400 mt-1 sm:hidden">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-600">{user.email}</td>
                <td className="px-6 py-4">
                  <Badge tone="brand" className="rounded-lg px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider">{user.role}</Badge>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-500">{user.department}</td>
                <td className="px-6 py-4">
                  <Badge tone={user.status === 'active' ? 'success' : 'warning'} className="rounded-lg px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider">{user.status}</Badge>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-400">{formatShortDate(user.joinedAt)}</td>
                <td className="px-6 py-4 text-right">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger className="rounded-xl p-2.5 transition-all hover:bg-slate-100 text-slate-400 hover:text-slate-900">
                      <MoreHorizontal className="h-5 w-5" />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content className="surface-card z-20 min-w-44 rounded-2xl p-2 shadow-xl border border-slate-200 animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2">
                        {["View Profile", "Edit Credentials", "Transfer Dept", "Suspend User"].map((item) => (
                          <DropdownMenu.Item
                            className={cn(
                              "rounded-xl px-4 py-2.5 text-sm font-semibold outline-none transition-colors cursor-pointer",
                              item === 'Suspend User' ? "text-red-500 hover:bg-red-50" : "text-slate-700 hover:bg-slate-50"
                            )}
                            key={item}
                          >
                            {item}
                          </DropdownMenu.Item>
                        ))}
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
});
