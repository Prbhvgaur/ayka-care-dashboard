"use client";

import { useMemo, useState } from "react";
import { Download, LayoutGrid, TableProperties } from "lucide-react";

import { UserCard } from "@/components/users/UserCard";
import { UserFilters } from "@/components/users/UserFilters";
import { UserTable } from "@/components/users/UserTable";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useSearch } from "@/hooks/useSearch";
import { useUsers } from "@/hooks/useUsers";

export default function UsersPage() {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [view, setView] = useState<"table" | "grid">("table");
  const [sortBy, setSortBy] = useState("joinedAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const { search, setSearch, debouncedSearch } = useSearch();

  const params = useMemo(
    () => ({
      search: debouncedSearch,
      role,
      status,
      department,
      sortBy,
      order,
      page,
      limit: 10,
    }),
    [debouncedSearch, department, order, page, role, sortBy, status],
  );

  const { data, isLoading } = useUsers(params);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-light)] px-3 py-1 text-sm font-semibold text-[var(--color-brand)]">
            Users
            <span>{data?.total ?? 0}</span>
          </div>
          <h2 className="font-display text-4xl font-semibold">User Directory</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setView("table")} variant={view === "table" ? "primary" : "secondary"}>
            <TableProperties className="h-4 w-4" />
            Table
          </Button>
          <Button onClick={() => setView("grid")} variant={view === "grid" ? "primary" : "secondary"}>
            <LayoutGrid className="h-4 w-4" />
            Grid
          </Button>
          <Button variant="secondary">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <UserFilters
          department={department}
          onDepartmentChange={setDepartment}
          onRoleChange={setRole}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          role={role}
          search={search}
          status={status}
        />
      </Card>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div className="surface-card skeleton h-[248px] rounded-[28px]" key={index} />
          ))}
        </div>
      ) : data?.data.length ? (
        view === "table" ? (
          <UserTable
            onSort={(key) => {
              setSortBy(key);
              setOrder((value) => (sortBy === key && value === "desc" ? "asc" : "desc"));
            }}
            order={order}
            sortBy={sortBy}
            users={data.data}
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {data.data.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )
      ) : (
        <Card className="p-10 text-center">
          <svg className="mx-auto h-32 w-32" fill="none" viewBox="0 0 120 120">
            <rect fill="var(--color-brand-light)" height="72" rx="20" width="72" x="24" y="24" />
            <circle cx="60" cy="50" fill="var(--color-brand)" r="12" />
            <rect fill="var(--color-brand)" height="8" opacity="0.35" rx="4" width="40" x="40" y="70" />
          </svg>
          <h3 className="mt-4 font-display text-3xl font-semibold">No users found</h3>
          <p className="mt-2 text-[var(--text-secondary)]">Try loosening the filters or search phrase.</p>
          <Button
            className="mt-4"
            onClick={() => {
              setSearch("");
              setRole("");
              setStatus("");
              setDepartment("");
            }}
          >
            Clear filters
          </Button>
        </Card>
      )}

      {data ? (
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--text-secondary)]">
          <p>
            Showing {data.data.length} of {data.total} users
          </p>
          <div className="flex items-center gap-2">
            <Button disabled={page <= 1} onClick={() => setPage((value) => value - 1)} variant="secondary">
              Previous
            </Button>
            <span className="rounded-full bg-[var(--bg-secondary)] px-4 py-2 font-semibold text-[var(--text-primary)]">
              Page {data.page} / {data.totalPages}
            </span>
            <Button
              disabled={page >= data.totalPages}
              onClick={() => setPage((value) => value + 1)}
              variant="secondary"
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
