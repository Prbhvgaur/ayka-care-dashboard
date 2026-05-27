"use client";

import { memo, useMemo, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { cn, formatShortDate } from "@/lib/utils";
import type { User } from "@/types/user";

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
      className="scrollbar-thin overflow-auto rounded-[24px] border"
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      style={{ maxHeight: 620 }}
    >
      <table className="min-w-full border-separate border-spacing-0">
        <thead className="sticky top-0 z-10 bg-[var(--bg-secondary)]">
          <tr>
            {columns.map(([key, label]) => (
              <th className="border-b px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]" key={key}>
                <button
                  className="inline-flex items-center gap-2"
                  onClick={() => onSort(key)}
                  type="button"
                >
                  {label}
                  <ArrowUpDown
                    className={cn(
                      "h-4 w-4",
                      sortBy === key ? "text-[var(--color-brand)]" : "text-[var(--text-muted)]",
                    )}
                  />
                  {sortBy === key ? (
                    <span className="text-[10px] text-[var(--color-brand)]">{order}</span>
                  ) : null}
                </button>
              </th>
            ))}
            <th className="border-b px-4 py-4 text-right text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((user, index) => (
            <tr
              className={cn(
                "transition hover:bg-[var(--bg-tertiary)]/70",
                index % 2 === 0 ? "bg-transparent" : "bg-[var(--bg-tertiary)]/30",
              )}
              key={user.id}
            >
              <td className="border-b px-4 py-4">
                <div className="flex items-center gap-3">
                  <Avatar alt={user.name} src={user.avatar} />
                  <span className="font-semibold">{user.name}</span>
                </div>
              </td>
              <td className="border-b px-4 py-4 text-sm text-[var(--text-secondary)]">{user.email}</td>
              <td className="border-b px-4 py-4"><Badge tone="brand">{user.role}</Badge></td>
              <td className="border-b px-4 py-4 text-sm">{user.department}</td>
              <td className="border-b px-4 py-4"><Badge>{user.status}</Badge></td>
              <td className="border-b px-4 py-4 text-sm text-[var(--text-secondary)]">{formatShortDate(user.joinedAt)}</td>
              <td className="border-b px-4 py-4 text-right">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger className="rounded-full p-2 transition hover:bg-[var(--bg-tertiary)]">
                    <MoreHorizontal className="h-4 w-4" />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="glass-panel z-20 min-w-36 rounded-2xl p-2">
                      {["View", "Edit", "Deactivate"].map((item) => (
                        <DropdownMenu.Item
                          className="rounded-xl px-3 py-2 text-sm outline-none transition hover:bg-[var(--bg-tertiary)]"
                          key={item}
                        >
                          {item}
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
