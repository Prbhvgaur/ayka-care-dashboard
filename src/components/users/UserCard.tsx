"use client";

import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatShortDate, relativeTime } from "@/lib/utils";
import type { User } from "@/types/user";

export function UserCard({ user }: { user: User }) {
  return (
    <Card hoverable className="group p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <h3 className="font-display text-4xl font-bold tracking-tighter uppercase whitespace-nowrap rotate-90 translate-x-1/2 translate-y-full">
          {user.role}
        </h3>
      </div>
      
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="relative">
          <Avatar alt={user.name} size={64} src={user.avatar} className="ring-4 ring-[var(--bg-tertiary)] group-hover:ring-[var(--color-brand-light)] transition-all duration-500" />
          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-[var(--color-success)] shadow-sm" />
        </div>
        <Badge tone={user.status === 'active' ? 'success' : 'warning'} className="font-bold text-[10px] uppercase tracking-widest">{user.status}</Badge>
      </div>

      <div className="mt-6 space-y-4 relative z-10">
        <div className="space-y-1">
          <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--color-brand)] transition-colors line-clamp-1">{user.name}</h3>
          <p className="text-sm font-medium text-[var(--text-secondary)] truncate">{user.email}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge tone="brand" className="px-3 py-1 text-[11px] font-bold">{user.role}</Badge>
          <Badge tone="neutral" className="px-3 py-1 text-[11px] font-bold">{user.department}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border)]">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold mb-0.5">Joined</p>
            <p className="text-xs font-bold text-[var(--text-primary)]">{formatShortDate(user.joinedAt)}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold mb-0.5">Activity</p>
            <p className="text-xs font-bold text-[var(--text-primary)]">{relativeTime(user.lastActive)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
